import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import pg from "pg";
import { PrismaClient } from "@prisma/client";

const { Pool } = pg;
const admin = new Pool({ connectionString: process.env.ADMIN_DATABASE_URL, max: 2 });
const runtime = new Pool({ connectionString: process.env.DATABASE_URL, max: 4 });
const prisma = new PrismaClient();

const A = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const B = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const P1 = "11111111-1111-4111-8111-111111111111";
const P2 = "22222222-2222-4222-8222-222222222222";
const P3 = "33333333-3333-4333-8333-333333333333";
const FP1 = "a1111111-1111-4111-8111-111111111111";
const FP2 = "a2222222-2222-4222-8222-222222222222";
const FP3 = "b3333333-3333-4333-8333-333333333333";

async function withTenant(client, familyId, fn) {
  return client.query("BEGIN").then(async () => {
    try {
      await client.query("SELECT set_config('app.family_id', $1, true)", [familyId]);
      const result = await fn();
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  });
}

try {
  const schema = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
  await admin.query(schema);
  await admin.query("INSERT INTO family_spaces(id,name) VALUES ($1,'Family A'),($2,'Family B')", [A, B]);
  await admin.query("INSERT INTO persons(id) VALUES ($1),($2),($3)", [P1, P2, P3]);
  await admin.query(
    "INSERT INTO family_people(id,family_id,person_id,display_name) VALUES ($1,$2,$3,'A Parent'),($4,$2,$5,'A Child'),($6,$7,$8,'B Person')",
    [FP1, A, P1, FP2, P2, FP3, B, P3]
  );

  // Database identity isolation: one opaque Person anchor cannot be attached to a second family.
  await assert.rejects(
    admin.query("INSERT INTO family_people(id,family_id,person_id,display_name) VALUES ($1,$2,$3,'Cross-family reuse')", ["c4444444-4444-4444-8444-444444444444", B, P1]),
    /unique constraint|duplicate key/i
  );

  // RLS is enforced for a non-owner, non-BYPASSRLS application role.
  const client = await runtime.connect();
  try {
    await client.query("SET ROLE app_runtime");
    const aRows = await withTenant(client, A, async () => (await client.query("SELECT id FROM family_people ORDER BY id")).rows);
    assert.deepEqual(aRows.map(x => x.id), [FP1, FP2].sort());
    const bRows = await withTenant(client, B, async () => (await client.query("SELECT id FROM family_people")).rows);
    assert.deepEqual(bRows.map(x => x.id), [FP3]);
    await client.query("BEGIN");
    const noContext = await client.query("SELECT id FROM family_people");
    await client.query("COMMIT");
    assert.equal(noContext.rowCount, 0, "missing tenant context must fail closed");
    await assert.rejects(
      withTenant(client, A, () => client.query("INSERT INTO relationships(id,family_id,from_family_person_id,to_family_person_id) VALUES (gen_random_uuid(),$1,$2,$3)", [B, FP1, FP3])),
      /row-level security|violates row-level security/i
    );

    // Same-family composite FKs reject a relationship whose endpoint belongs to another family.
    await assert.rejects(
      admin.query("INSERT INTO relationships(id,family_id,from_family_person_id,to_family_person_id,relationship_type) VALUES (gen_random_uuid(),$1,$2,$3,'parent_of')", [A, FP1, FP3]),
      /foreign key/i
    );

    // Two concurrent opposite parentage edges serialize; exactly one may commit.
    const attempt = async (parentId, childId) => {
      const c = await runtime.connect();
      try {
        return await withTenant(c, A, () => c.query("SELECT add_parent_edge($1,$2,$3)", [A, parentId, childId]));
      } finally {
        c.release();
      }
    };
    const concurrent = await Promise.allSettled([
      attempt(FP1, FP2),
      attempt(FP2, FP1)
    ]);
    assert.equal(concurrent.filter(x => x.status === "fulfilled").length, 1, "exactly one concurrent opposite edge should commit");
    assert.equal(concurrent.filter(x => x.status === "rejected").length, 1, "the second concurrent edge should be rejected as a cycle");

    // Transactional outbox: a domain transaction rollback must also roll back its event.
    await client.query("BEGIN");
    await client.query("SELECT set_config('app.family_id', $1, true)", [A]);
    await client.query("INSERT INTO job_outbox(family_id,event_type,aggregate_id,payload,dedupe_key) VALUES ($1,'person.created',$2,'{}','rollback-event')", [A, FP1]);
    await client.query("ROLLBACK");
    const rolledBack = await withTenant(client, A, async () => client.query("SELECT id FROM job_outbox WHERE dedupe_key='rollback-event'"));
    assert.equal(rolledBack.rowCount, 0, "outbox event must roll back with the domain transaction");

    await withTenant(client, A, async () => client.query(
      "INSERT INTO job_outbox(family_id,event_type,aggregate_id,payload,dedupe_key) VALUES ($1,'person.created',$2,'{}','person-created-once')",
      [A, FP1]
    ));
    const duplicateEvent = await withTenant(client, A, async () => client.query(
      "INSERT INTO job_outbox(family_id,event_type,aggregate_id,payload,dedupe_key) VALUES ($1,'person.created',$2,'{}','person-created-once') ON CONFLICT (dedupe_key) DO NOTHING",
      [A, FP1]
    ));
    assert.equal(duplicateEvent.rowCount, 0, "outbox dedupe key must prevent duplicate event creation");

    // Competing workers use SKIP LOCKED: one owns the pending event while another skips it.
    const workerA = await runtime.connect();
    const workerB = await runtime.connect();
    try {
      await workerA.query("BEGIN");
      await workerA.query("SELECT set_config('app.family_id', $1, true)", [A]);
      const claimed = await workerA.query("SELECT id FROM job_outbox WHERE delivered_at IS NULL ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1");
      assert.equal(claimed.rowCount, 1, "first worker should claim the pending outbox row");

      await workerB.query("BEGIN");
      await workerB.query("SELECT set_config('app.family_id', $1, true)", [A]);
      const skipped = await workerB.query("SELECT id FROM job_outbox WHERE delivered_at IS NULL ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1");
      assert.equal(skipped.rowCount, 0, "second worker should skip the row locked by the first worker");

      await workerA.query("UPDATE job_outbox SET attempts = attempts + 1, delivered_at = now() WHERE id = $1", [claimed.rows[0].id]);
      await workerA.query("COMMIT");
      await workerB.query("COMMIT");
    } finally {
      await workerA.release();
      await workerB.release();
    }
  } finally {
    client.release();
  }

  // Prisma transaction-local context must apply to queries in the same transaction.
  const prismaRows = await prisma.$transaction(async tx => {
    await tx.$queryRaw`SELECT set_config('app.family_id', ${A}, true)`;
    return tx.$queryRaw`SELECT id FROM family_people ORDER BY id`;
  });
  assert.equal(prismaRows.length, 2, "Prisma transaction must see only its tenant rows");

  console.log("PASS: Person identity isolation, composite family FKs, RLS fail-closed and tenant isolation, Prisma transaction-local context, concurrent graph-cycle prevention, transactional outbox rollback/deduplication, and SKIP LOCKED worker claiming.");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
  await runtime.end();
  await admin.end();
}
