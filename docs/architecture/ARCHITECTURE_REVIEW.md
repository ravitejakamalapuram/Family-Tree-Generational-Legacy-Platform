# Architecture Review — ARCH-001 to ARCH-005

**Status:** Internal review pass completed; architecture remains draft pending explicit product/engineering decisions.
**Date:** 2026-10-30
**Scope:** Module boundaries, relational schema, OpenAPI v1, threat model and runtime operations.

## 1. Review outcome

The modular-monolith direction, PostgreSQL system of record, family-scoped relationship graph, explicit publication projection and private-by-default posture are coherent with the product charter and accepted ADRs. The draft is a useful foundation, but it is not implementation-ready yet.

The review found contract gaps between API_DESIGN.md and OpenAPI, an underspecified cookie-CSRF mechanism, incomplete P0 endpoints, and several schema/runtime decisions that must be made explicit before implementation. The OpenAPI contract and API design document have been updated on this branch; structural checks found 27 unique paths and 34 operations, each with a responses block, and no duplicate path keys. This is not a full OpenAPI 3.1 parser/validator run; CI validation remains required.

## 2. Changes made during this review

- Added CSRF bootstrap endpoint and required synchronizer-token header to cookie-authenticated state-changing operations, including login, logout, refresh and family/person/relationship writes.
- Added exact-origin validation, strict credentialed CORS guidance and in-memory CSRF token handling to API_DESIGN.md.
- Added invitation acceptance, member listing/invitation/role management, person fact/profile/relationship/memory reads and relationship correction operations to OpenAPI.
- Added idempotency-key contracts for retryable create operations.
- Unified temporal date assertion shape around start/end date, precision, qualifier, calendar system and original text so a range/unknown/approximate date is representable.
- Reconciled the API design document with the implemented P0 contract surface and clearly separated later-milestone API domains.

## 3. Important remaining architecture decisions

| Decision | Recommended starting position | Why it matters |
|---|---|---|
| Cross-family identity linking | Disable in v1. Create opaque identity anchors per family representation; do not match/reuse a global Person across families. Revisit only with explicit consent and privacy review. | Prevents covert family-to-family correlation and identity leakage. |
| ORM and migrations | Keep migrations SQL-first and reviewed. Evaluate Prisma and Drizzle against composite FKs, PostgreSQL RLS, recursive CTEs and transaction-local tenant context before selection. | The graph and tenant invariants are too important to let ORM ergonomics decide them accidentally. |
| RLS | Use application authorization plus PostgreSQL RLS for family-owned tables where the selected connection pool supports safe transaction-local context. App role must not own tables or BYPASSRLS. | Adds defense in depth against missed family predicates. |
| Parentage concurrency | Serialize parentage graph mutations per family (or use serializable transactions with bounded retry) and validate cycles inside the same transaction. | Two individually valid concurrent edges can jointly create a cycle. |
| Branch permissions | Normalize membership-to-branch scopes into a join table before query-critical use; do not leave authorization semantics hidden in unvalidated JSONB. | Enables referential integrity and auditable role scope. |
| Background jobs | Start with a PostgreSQL-backed durable queue if expected volume is modest; benchmark and document lock/lease/retry behavior before implementation. | Keeps transactional enqueue simple without adding an operational dependency prematurely. |
| Contribution approval | Make approval and domain mutation atomic within one module boundary, or use an explicit outbox/saga with idempotent application and visible recovery state. | Avoids approved proposals that never apply or apply twice. |

These are recommendations, not accepted ADRs. Record final choices in ADRs before implementation.

## 4. Schema questions to close

1. Specify composite same-family foreign keys for every family-owned association, including fact/source, story/person, event/place, branch/membership, media uploader and audit actor references.
2. Add normalized membership branch-scope rows and explicit constraints for active membership/invitation uniqueness.
3. Define deletion semantics for relationships and facts: preserve revision/audit history; prefer ended/rejected/superseded states over destructive deletion.
4. Define temporal invariants: start <= end, allowed precision/value combinations, calendar conversion policy and all-day event local-date semantics.
5. Decide whether citext is an accepted PostgreSQL extension or use normalized text columns for portable uniqueness.
6. Define publication projection table keys, source-version tracking and cache/media revocation behavior.
7. Confirm whether a family can contain multiple contextual FamilyPerson representations for one identity; current unique constraint prohibits it.

## 5. Security and operations gates

- Threat model must be translated into test cases: cross-family IDOR, role matrix, branch scope, CSRF, invitation replay, publication revocation, media URL expiry, AI retrieval authorization and deletion collateral.
- RLS policy SQL and pooler transaction-context behavior must be demonstrated in integration tests, not assumed.
- Upload scanning, object versioning, signed URL TTL, metadata stripping and deletion retention need selected provider capabilities.
- Backup RPO/RTO, media manifest restore and recovery drill ownership must be agreed before production.
- AI provider retention/training terms and data minimization need explicit approval before sending real family data.

## 6. Implementation gate

Do not start FL-002 backend implementation until:
- OpenAPI 3.1 parser/validator runs in CI and contract tests cover P0 flows.
- ERD composite constraints and migration strategy are reviewed.
- ORM, RLS, job queue and graph concurrency choices are recorded as ADRs.
- Security controls and role matrix have owners and executable negative tests.
- Product/engineering explicitly approve Phase 0.

No production code or infrastructure has been created as part of this review.