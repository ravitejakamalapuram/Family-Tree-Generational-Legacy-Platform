import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import pg from "pg";
import { PrismaClient } from "@prisma/client";

const { Pool } = pg;
const admin = new Pool({ connectionString: process.env.ADMIN_DATABASE_URL, max: 2 });
const runtime = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
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
  await admin.query(
    "INSERT INTO family_spaces(id,name) VALUES ($1,'Family A'),($2,'Family B'); INSERT INTO persons(id) VALUES ($3),($4),($5); INSERT INTO family_people(id,family_id,person_id,display_name) VALUES ($6,$1,$3,'A Parent'),($7,$1,$4,'A Child'),($8,$2,$5,'B Person')",
    [A, B, P1, P2, P3, FP1, FP2, FP3]
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
      withTenant(client, A, () => client.query("INSERT INTO relationships(id,family_id,parent_id,child_id) VALUES (gen_random_uuid(),$1,$2,$3)", [B, FP1, FP3])),
      /row-level security|violates row-level security/i
    );

    // Same-family composite FKs reject a relationship whose endpoint belongs to another family.
    await assert.rejects(
      admin.query("INSERT INTO relationships(id,family_id,parent_id,child_id) VALUES (gen_random_uuid(),$1,$2,$3)", [A, FP1, FP3]),
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
  } finally {
    client.release();
  }

  // Prisma transaction-local context must apply to queries in the same transaction.
  const prismaRows = await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT set_config('app.family_id', ${A}, true)`;
    return tx.$queryRaw`SELECT id FROM family_people ORDER BY id`;
  });
  assert.equal(prismaRows.length, 2, "Prisma transaction must see only its tenant rows");

  console.log("PASS: Person identity isolation, composite family FKs, RLS fail-closed and tenant isolation, Prisma transaction-local context, and concurrent graph-cycle prevention.");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
  await runtime.end();
  await admin.end();
}
