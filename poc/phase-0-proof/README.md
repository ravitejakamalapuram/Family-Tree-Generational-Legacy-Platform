# Phase 0 Architecture Proof of Concept

This isolated spike tests the highest-risk accepted architecture choices against real PostgreSQL. It is not production application code and must not be copied wholesale into the product.

## What it proves

- Prisma Client can run parameterized SQL and transaction-local tenant context in an interactive transaction.
- PostgreSQL RLS fails closed without `app.family_id` and isolates two families when using a non-owner, non-superuser, non-BYPASSRLS role.
- A globally unique opaque `person_id` prevents a Person anchor from being attached to multiple FamilyPerson rows.
- Composite same-family foreign keys prevent relationship endpoints from crossing family boundaries.
- Parentage graph writes can be serialized with a transaction-scoped advisory lock and checked for cycles in the same transaction (concurrent test is part of the CI harness).

## Deliberate limitations

- This POC uses raw SQL migrations as the authority; Prisma schema generation/validation is checked separately.
- It does not yet prove compatibility with a production connection pooler or serverless transaction mode.
- It does not yet validate pg-boss behavior. Durable enqueue should use a transactional outbox; pg-boss integration, retry/lease behavior, singleton/idempotency and load/lock testing remain a separate gate.
- RLS here demonstrates tenant isolation only, not membership/role/branch/record-level authorization. Application policy checks remain mandatory.
- No real family data, credentials or external provider is used.

## Run locally

Start PostgreSQL 16, then:

```sh
cd poc/phase-0-proof
npm install
export ADMIN_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/family_poc
export DATABASE_URL=postgresql://app_runtime:poc-runtime-password@localhost:5432/family_poc
npm test
```

The test harness creates an ephemeral schema and synthetic families. Never point this script at a non-disposable database.

## Readiness interpretation

A green CI run is evidence for the narrow properties above, not overall security sign-off. Review the SQL and tests before accepting the spike.
