# API Design

Base: /api/v1. REST/JSON, UUIDs, cursor pagination, request IDs and standardized errors. Use ETags/If-Match for concurrent edits and Idempotency-Key for retryable creates. Every family endpoint authorizes membership, status, role, branch scope, target record and access channel on the server. UUIDs are identifiers, never authorization.

## Authentication and browser security
- Session cookie: Secure, HttpOnly, SameSite=Lax or stricter, Path=/, __Host- prefix; never expose session tokens to JavaScript.
- GET /auth/csrf issues a session-bound synchronizer token. Keep it in memory and send X-CSRF-Token on every cookie-authenticated state-changing request, including login/logout/refresh. Rotate after authentication and privilege changes.
- Enforce Origin/Referer allowlisting and reject unexpected cross-site requests. CORS allowlists exact trusted origins; no wildcard credentialed CORS.
- POST /auth/register, /login, /logout, /refresh, /verify-email, /forgot-password; GET /auth/csrf and /auth/me.
- Login and recovery responses avoid account enumeration. Passwords are memory-hard hashed; refresh/session credentials rotate and support revocation/reuse detection.

## Families and memberships
- POST/GET /families; GET/PATCH /families/{familyId}; GET /families/{familyId}/dashboard.
- GET /families/{familyId}/members; POST /families/{familyId}/invitations.
- PATCH/DELETE /families/{familyId}/members/{membershipId}.
- POST /invitations/{token}/accept.
- Family creation and owner membership are one transaction. Invitations are random, hashed at rest, expiring, single-use, revocable and bound to intended email/role.

## People and facts
- POST/GET /families/{familyId}/people; GET/PATCH /families/{familyId}/people/{familyPersonId}.
- GET /families/{familyId}/people/{familyPersonId}/profile.
- GET/POST /families/{familyId}/people/{familyPersonId}/facts.
- GET /families/{familyId}/people/{familyPersonId}/relationships and /memories.
- Duplicate suggestions are advisory and family-scoped; never auto-merge identities.
- Date assertions preserve start/end, precision, qualifier, calendar system and original text. Unknown and approximate values are first-class.

## Relationships and tree
- POST /families/{familyId}/relationships; PATCH/DELETE /families/{familyId}/relationships/{relationshipId}.
- GET /families/{familyId}/tree?focusPersonId=&mode=&generations=&cursor=.
- GET /families/{familyId}/relationship-path?from=&to=.
- Return bounded nodes/edges/hasMore/nextCursor/generation metadata. Both endpoints of every relationship must be FamilyPerson records in the same family. Parentage cycle validation must be transactionally protected against concurrent writes.

## Remaining product API domains (later milestones)
- Media/memories: POST upload intent, POST completion, authorized GET/PATCH/DELETE media, memory CRUD and typed tags.
- Stories: CRUD, versioned transcripts/translations and AI-assisted draft transcription.
- Events/places: family-scoped CRUD, participants, historical place names and location precision.
- Collaboration: contribution proposals, review decisions, activity and notifications.
- AI Historian: permission-aware query/biography/transcription/translation/tag suggestions; outputs are drafts with claim-level provenance.
- Publication: explicit create/review/publish/revoke workflow; public endpoints read allowlisted versioned projections only.
- Archives: import/export jobs, manifests, checksums and policy-aware deletion.

## Response envelopes
Success: {"data":{},"meta":{"requestId":"uuid"}}
Error: {"error":{"code":"RELATIONSHIP_CONFLICT","message":"Relationship conflicts with existing record","details":{},"requestId":"uuid"}}
Use stable error codes such as AUTH_REQUIRED, ACCESS_DENIED, RESOURCE_NOT_FOUND, VALIDATION_ERROR, RELATIONSHIP_CONFLICT, DUPLICATE_PERSON_SUGGESTED, CONTRIBUTION_PENDING, MEDIA_UPLOAD_INVALID and PUBLICATION_RESTRICTED.

## Contract and security rules
- Cookie-authenticated mutations require X-CSRF-Token and strict Origin validation.
- Retryable create commands require an Idempotency-Key scoped to actor, family and operation.
- Stale writes return 412 with current version/ETag metadata; domain conflicts return 409.
- Return a consistent not-found response where needed to avoid cross-family existence leaks.
- Public APIs read published projection tables only, never private domain tables.
- OpenAPI is the executable contract; validate it in CI and add request/response contract tests before implementation.
