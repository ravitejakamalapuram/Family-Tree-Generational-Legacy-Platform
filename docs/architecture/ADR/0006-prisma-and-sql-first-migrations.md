# ADR-0006: Prisma with reviewed SQL-first migrations

**Status:** Accepted — engineering direction approved 2026-10-31
**Date:** 2026-10-30

## Context
The backend is a TypeScript/NestJS modular monolith on PostgreSQL. The data model relies on composite same-family foreign keys, check constraints, recursive CTEs, transaction-local tenant context and possibly row-level security. The ORM must not become the authority for domain boundaries or hide PostgreSQL capabilities.

## Decision

**Approval note:** Product owner approved this proposed engineering default on 2026-10-31. Validate Prisma's composite-key, transaction-context and migration behavior in a focused proof of concept before production schema work; revisit if required capabilities need unsafe workarounds.
Use Prisma as the initial application ORM/client, with SQL migrations as the reviewed source of truth. Prisma may generate a starting migration, but every migration is inspected and amended as SQL before merge. Use parameterized raw SQL for recursive CTEs, specialized indexes, RLS policies and database features not represented cleanly in the Prisma schema.

Prohibit production schema push/sync. Keep migration ownership in the database infrastructure module; domain/application modules must not import Prisma model types.

## Consequences
- Familiar TypeScript client, typed CRUD and transaction API.
- Advanced PostgreSQL constraints and policies remain explicit SQL and require migration tests.
- Recursive graph queries use tested SQL repositories rather than ORM relation expansion.
- Prisma client and generated types remain infrastructure details.
- Composite-key and transaction-local RLS behavior must be proven in integration tests before implementation is considered ready.

## Alternatives considered
- Drizzle: stronger SQL-first feel and lighter abstraction; re-evaluate if Prisma friction around tenant context/composite relations outweighs its productivity benefits.
- TypeORM: rejected as default due to weaker alignment with the desired SQL-first migration and explicit query discipline.
- No ORM: viable but increases repetitive mapping and transaction plumbing for the initial team.

## Revisit trigger
A proof-of-concept demonstrates that Prisma cannot reliably support required composite foreign keys, RLS transaction context or graph query patterns without unsafe workarounds.
