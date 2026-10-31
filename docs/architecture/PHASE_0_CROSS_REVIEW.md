# Phase 0 Cross-Workstream Review

**Date:** 2026-10-31  
**Status:** Review in progress; not a Phase 0 sign-off  
**Scope:** UX-001–UX-004, ARCH-001–ARCH-005, accepted UX decisions and ADR-0005–0008.

## Decisions now accepted
- UX-DEC-002–UX-DEC-006: flexible first-person onboarding; last-focused/configured/empty tree focus order; private-by-default publication with consent and second-review safeguards; authenticated Viewer/public visitor separation; semantic design-token implementation defaults.
- ADR-0005: distinct opaque Person identity anchor per FamilyPerson in v1; no cross-family identity linking.
- ADR-0006: Prisma client with reviewed SQL-first migrations.
- ADR-0007: PostgreSQL RLS as defense in depth.
- ADR-0008: maintained PostgreSQL-backed durable jobs initially.

Acceptance selects direction. It does not prove implementation, replace legal review, or authorize production data use.

## Cross-workstream findings and repairs

1. **Person identity isolation must be enforceable in the schema.** The earlier ERD uniqueness rule (family_id, person_id) still allowed the same Person anchor to be reused by two families. Updated the v1 constraint to UNIQUE(person_id) and documented the one-to-one opaque anchor invariant. Verify with migration and two-family negative tests.
2. **Tree-focus behavior needed persistence.** UX-DEC-003 specifies personal last focus, family-configured fallback, then guided empty state. Added family_tree_preferences and family-configured focus to the ERD, plus PUT /families/{familyId}/tree/focus to persist the member's personal focus. Family-configured focus updates must remain Owner/delegated Admin only.
3. **Duplicate relationship-path contract removed.** The OpenAPI contract exposed both /tree/relationship-path and /relationship-path for the same operation. Removed the duplicate /tree/relationship-path; /families/{familyId}/relationship-path remains canonical and matches API_DESIGN.md.
4. **Publication API is intentionally not in the P0 contract.** Publication is a later milestone. The API design must retain an explicit publication workflow and public reads from allowlisted projections only; implementation must include consent evidence, second review, revocation/cache/media handling, and living/minor exclusions before public launch.
5. **UX prototype remains a design artifact.** It is static and uses fictional data. It has no real persistence, auth, server authorization, upload pipeline or production genealogy layout. Its syntax check is not browser/accessibility acceptance.

## P0 journey-to-contract mapping (current)

| Journey | Contract surface | Remaining validation |
|---|---|---|
| Register/authenticate | /auth/* | Session rotation, CSRF, recovery, enumeration and rate-limit tests |
| Create family | /families | Owner membership atomicity; optional first person/defer path |
| Join family | /invitations/{token}/accept | Expiry, replay, revocation, email binding and role scope |
| Add person/facts | /families/{familyId}/people*, /facts | Same-family source references, visibility and date precision |
| Add/correct relationship | /relationships* | Concurrent cycle prevention, temporal constraints and audit history |
| Explore tree | /tree, /tree/search, /ancestors, /descendants, /branches, /relationship-path, /tree/focus | Bounded queries, focus persistence, branch filtering and non-disclosure |
| Dashboard | /dashboard | Role/branch-filtered projection and no hidden-record existence leaks |
| Invite/manage members | /members, /invitations | Role transition policy, branch scope and audit |
| Memories/stories | Later milestones | Upload, visibility, provenance, moderation and authorization contracts remain to be specified |

## Blocking validation before Phase 0 sign-off

### UX
- Browser/device review of all nine P0 screens, not only the dashboard.
- Keyboard-only and screen-reader walkthrough, including SVG tree and semantic-list parity.
- WCAG 2.2 AA contrast measurements for actual text/control pairs.
- Telugu, Tamil, Kannada, Hindi and mixed-script rendering; long-name and five-generation tree cases.
- Validate multiple partners, biological/adoptive/step/guardian parents, half-siblings, blended families, unknown and disputed relationships.
- Complete loading, empty, error, conflict, permission-denied and retry states.
- Product/frontend handoff sign-off on issue #57.

### Architecture/security
- Prisma proof of concept for composite foreign keys, reviewed SQL migrations, transaction boundaries and RLS context propagation.
- RLS integration tests using a non-owner/non-BYPASSRLS application role; prove tenant context does not leak through pooled connections.
- Two-family IDOR tests across every family-scoped route and background job.
- Parentage graph mutation serialization/serializable retry strategy and concurrent cycle tests.
- Contribution approval/application atomicity or outbox recovery semantics.
- Durable job idempotency, retry, lease expiry, authorization recheck and queue load/lock tests.
- Full OpenAPI contract tests and negative role/branch/visibility tests.
- Resolve retention/deletion, storage provider, AI provider, backup/RPO/RTO and operational ownership.

## Current validation evidence
- Prototype inline-JavaScript syntax check: passing (run #41179691052). This does not validate browser behavior or accessibility.
- OpenAPI Redocly 3.1 bundle check: passing (run #41179705774 before the latest route/focus contract edits). A fresh run is required after those edits.
- OpenAPI contract currently targets 32 paths and 39 operations after consolidating the duplicate route and adding personal tree-focus persistence. Reconfirm counts in the next validation pass.

## Gate
Keep PRs #63 and #64 draft/unmerged. Keep FL-001/FL-002 implementation branches parked. Phase 0 can close only after the UX QA evidence, architecture proof, security/contract tests and joint product/design/engineering sign-off are recorded.
