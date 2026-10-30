# ADR-0007: PostgreSQL RLS as defense in depth for family tenants

**Status:** Proposed — requires security/engineering approval
**Date:** 2026-10-30

## Context
The platform stores highly sensitive family relationships, living-person information, minors' data, memories and private stories. Every family-owned row carries family_id. Application authorization and scoped repositories are mandatory, but one missed predicate can create a cross-family disclosure.

## Decision
Enable PostgreSQL row-level security for family-owned tables as a second authorization barrier, in addition to application-level membership, role, branch and record-level policies.

- Set tenant context transaction-locally, e.g. set_config('app.family_id', family_id, true), inside the same database transaction as protected queries.
- Apply RLS policies using the transaction-local tenant context; use FORCE ROW LEVEL SECURITY where appropriate.
- The runtime application role must not own protected tables and must not have BYPASSRLS.
- Migrations use a separate privileged role.
- Background jobs establish and verify family context at execution time.
- Public publication projections use a separate, explicit read policy/role and never bypass private source-table policies.
- Queries without a valid tenant context fail closed.

## Consequences
- Defense in depth against accidental unscoped queries.
- All tenant-scoped repository work must run in an explicit transaction; transaction propagation and pooler compatibility become critical.
- Integration tests must verify tenant context cannot leak between pooled connections and that cross-family reads/writes fail.
- RLS is not a replacement for application authorization, audit, or negative API tests.

## Alternatives considered
- Application predicates only: simpler, but a missed predicate can disclose another family's data.
- Separate database/schema per family: stronger isolation but operationally disproportionate for v1.
- RLS without application authorization: rejected; database policy cannot express the full product permission model alone.

## Revisit trigger
A deployment/pooler constraint makes transaction-local context unsafe or unworkable; any alternative must preserve equivalent defense-in-depth isolation.
