# Security, Privacy and Data Governance

## Threats
Cross-family leakage; accidental living/minor publication; media access; account takeover/invitation abuse; malicious upload; AI retrieval across permissions; destructive edits/merges/admin loss; data loss/provider lock-in.

## Authorization
Verify authentication, active membership (except public routes), role/action, record visibility and access channel on every request. Frontend checks are UX only.

## Tenant isolation
Scope repositories by family_id; composite FKs; consider PostgreSQL RLS with transaction-local tenant context, safe pooling, non-owner DB role. Test cross-tenant IDOR. UUIDs are not authorization.

## Living people/minors
Private by default; exclude from public pages; sensitive fields require stricter controls. No contact info, precise address, or exact birth date by default. Provide correction/removal request; consider sensitive deceased records too.

## Publication
Explicit per-person/field/media/story snapshot; approval, audit and revocation/cache purge. Never expose private tables and filter in frontend.

## Media
Private bucket; short-lived signed URLs; verify family/uploader; size/type/signature checks; malware scan where feasible; EXIF handling for public derivatives; preserve originals; lifecycle-aware deletion.

## AI
Authorized retrieval only; inaccessible data must not enter prompts, logs, cache, embeddings or telemetry. No model training on private records without opt-in. Suggestions separate from accepted facts; claim sources; human confirmation; sensitive-log redaction.

## Application security
Secure sessions/OIDC; CSRF where needed; rate limiting; one-time expiring/revocable invitations; CSP/security headers; validation/output encoding; audit admin/publication/export/deletion; secrets manager/env injection.

## Retention and rights
Define account deletion vs shared archive lifecycle, access revocation, shared Person memberships, correction requests, retention exceptions, owner succession, export-before-delete, backup retention and eventual purge.
