# P0 API Contract and Authorization Test Matrix

**Status:** Test design; no application handlers or automated API tests exist yet  
**Date:** 2026-10-31  
**Contract:** docs/architecture/openapi-v1.yaml (32 paths, 39 operations)

## Test fixtures

Create synthetic Family A and Family B with:
- Owner A, delegated Admin A, Branch Manager A scoped to Branch A1, Contributor A, Reviewer A and Viewer A.
- Owner B and Viewer B.
- FamilyPerson records in both families; one private, one family-visible, one restricted; multiple parent/partner edges and an unknown-parent placeholder represented outside the person table.
- A revoked member, expired/revoked invitation and a pending contribution.
- No production or real family data.

## Cross-cutting assertions for every family-scoped operation

1. A Family A member cannot read or mutate Family B records by substituting family, membership, person, relationship, fact, source, branch, memory or invitation identifiers.
2. Foreign-family and nonexistent targets return the same non-disclosing not-found behavior where appropriate.
3. Role, membership status, branch scope, record visibility and operation policy are checked server-side.
4. UUID knowledge alone never grants access.
5. Responses omit hidden fields and inaccessible record existence; list/search/tree/dashboard counts do not leak restricted records.
6. Cookie-authenticated mutations require a valid session-bound CSRF token and trusted Origin.
7. Retryable creates are idempotent for the same actor/family/operation/key; a different scope cannot replay another actor's result.
8. Stale If-Match returns 412; domain conflicts return 409; audit/provenance is retained.

## Operation-level matrix

| Contract operation | Positive cases | Required negative / edge cases |
|---|---|---|
| GET /auth/csrf | Issues session-bound token | Token from another session rejected; rotate after auth/privilege changes |
| POST /auth/register | Valid registration | Enumeration, malformed input, rate limits, duplicate normalized email |
| POST /auth/login | Valid credentials and session cookie | Wrong credentials, throttling, CSRF/Origin policy, secure cookie flags |
| POST /auth/refresh | Rotates session/refresh credential | Reuse detection, revoked session, cross-session replay |
| POST /auth/verify-email | Valid one-time token | Expired, reused, altered token |
| POST /auth/forgot-password | Generic non-enumerating response | Unknown email indistinguishable; rate limit; token expiry/replay |
| POST /auth/logout; GET /auth/me | Revoke session; current user projection | Revoked session rejected; no sensitive token/user fields |
| POST/GET /families | Create family + Owner membership atomically; list only memberships | Failure rolls back both; never list other family; private family metadata not exposed |
| GET/PATCH /families/{familyId} | Authorized family summary/settings | Cross-family IDOR; Viewer cannot mutate settings; family focus setting Owner/delegated Admin only |
| GET /families/{familyId}/dashboard | Role/branch-filtered dashboard | Hidden people, events, approvals and counts do not leak |
| GET /families/{familyId}/members | Authorized member directory | Nonmember cannot enumerate; branch-scoped role fields minimized |
| POST /families/{familyId}/invitations | Authorized invite with role and branch scopes | Viewer/Contributor denied; invalid role escalation; duplicate active invite policy; rate limit |
| PATCH/DELETE /families/{familyId}/members/{membershipId} | Authorized role/status transition | Self-escalation, owner lockout, last-owner removal, cross-family target, branch escalation |
| POST /invitations/{token}/accept | Intended invitee accepts once | Expired/revoked/replayed token; wrong email; already accepted; role/branch tampering |
| GET/POST /families/{familyId}/people | Search/list and create family-scoped person | Cross-family IDs; Viewer create denied; duplicate suggestion advisory only; opaque Person anchor cannot be reused across families |
| GET/PATCH /families/{familyId}/people/{familyPersonId} | Authorized profile read/update | Private/restricted visibility, Viewer write denied, cross-family IDOR, stale ETag |
| GET/POST /families/{familyId}/people/{familyPersonId}/facts | Create/list facts with precision and source | Source from another family, invalid date ranges/precision, conflicting assertion overwrite, Viewer write denied |
| GET /families/{familyId}/people/{familyPersonId}/profile | Profile projection | No private fact/media/member leakage; consistent not-found for foreign person |
| GET /families/{familyId}/people/{familyPersonId}/relationships | Authorized relationships | No edge to hidden/foreign people; branch scope and disputed status respected |
| GET /families/{familyId}/people/{familyPersonId}/memories | Authorized linked memories | Hidden memory/media metadata and foreign-family tags omitted |
| POST /families/{familyId}/relationships | Create valid family-scoped edge | Cross-family endpoint IDs, self-edge, invalid parentage, cycle, concurrent cycle, duplicate/temporal conflict, missing source |
| PATCH/DELETE /families/{familyId}/relationships/{relationshipId} | Correct/end edge with revision | Cross-family IDOR, stale ETag, delete must preserve audit/revision, invalid cycle after correction |
| GET /families/{familyId}/tree | Bounded graph projection | Node/edge/depth caps, branch visibility, no private profile fields, cursor tampering |
| GET /families/{familyId}/tree/search | Family-scoped search | No foreign/private results, query length/limit, rate limit, no count leakage |
| GET /families/{familyId}/tree/ancestors/{familyPersonId}; descendants | Bounded projections | Max generation, cycles/corrupt graph safe handling, hidden branch filtering |
| GET /families/{familyId}/tree/branches | Visible branch metadata | No unauthorized branch names or member mappings |
| PUT /families/{familyId}/tree/focus | Persist/clear personal focus | Target must be visible and same-family; no cross-family focus; membership revocation clears/revalidates |
| GET /families/{familyId}/relationship-path | Explainable path within authorized graph | Hidden nodes/edges not disclosed; bounded search; no cross-family traversal |
| GET /health/live; /health/ready | Liveness/readiness semantics | No secrets, topology or dependency credentials in response |

## Publication and later-milestone requirements

Before R3 public pages:
- Public visitor reads only an allowlisted published projection; no private source-table reads.
- Living people/minors excluded by default; applicable subject/guardian consent and second authorized review required for sensitive publication.
- Unpublished/revoked projections, hidden branches, private membership and internal IDs never leak.
- Revocation invalidates caches, public media derivatives and signed URLs within a defined bound.
- Consent evidence, reviewer identity, projection version and publication audit are immutable/retrievable.

## Execution order

1. Implement test fixtures and cross-family IDOR harness before endpoint handlers.
2. Add auth/session/CSRF and membership-role tests.
3. Add people/facts/relationship invariants and concurrent graph tests against real PostgreSQL.
4. Add tree/dashboard visibility and bounded-query tests.
5. Add worker authorization/idempotency tests when job handlers exist.
6. Add publication projection/consent/revocation tests before public routes are enabled.

This matrix is an acceptance plan, not evidence that tests have passed.