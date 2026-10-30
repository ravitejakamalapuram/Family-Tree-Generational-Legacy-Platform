# Architecture Decision Records
ADRs are append-only durable technical/product decisions. Use sequential IDs ADR-0005 onward. Include status (Proposed/Accepted/Superseded/Rejected), context, decision, consequences, alternatives, revisit trigger. Supersede rather than rewrite accepted decisions.


## Proposed ADRs — backend architecture review

| ADR | Proposal | Status |
|---|---|---|
| [0005](0005-v1-cross-family-identity-isolation.md) | Disable cross-family identity linking in v1 | Proposed; privacy/product approval required |
| [0006](0006-prisma-and-sql-first-migrations.md) | Prisma client with reviewed SQL-first migrations | Proposed; engineering approval required |
| [0007](0007-postgresql-row-level-security.md) | PostgreSQL RLS as defense in depth | Proposed; security/engineering approval required |
| [0008](0008-postgres-backed-durable-jobs.md) | PostgreSQL-backed durable jobs initially | Proposed; engineering approval required |
