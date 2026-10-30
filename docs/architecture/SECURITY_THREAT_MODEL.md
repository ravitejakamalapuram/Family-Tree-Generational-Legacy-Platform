# Security, Privacy and Threat Model

**Workstream:** ARCH-004  
**Status:** Draft v0.1 — pending security review  
**Related:** SECURITY_PRIVACY.md, MODULE_BOUNDARIES.md, ERD_AND_SCHEMA.md, openapi-v1.yaml

## 1. Security objectives

1. No user can read or mutate another family's private records without explicit authorized membership.
2. Public visitors can read only explicitly published projections.
3. Living people, minors and sensitive facts remain private by default.
4. Background jobs, search, exports and AI retrieval enforce the same authorization rules as API requests.
5. Invitations, sessions, uploads and privileged actions resist abuse and replay.
6. Family history changes retain provenance, attribution and recoverable revision history.
7. Data can be exported, corrected, deleted or transferred without violating another family's rights.

## 2. Assets and trust boundaries

Assets:
- Account credentials, sessions, recovery tokens.
- Family memberships, role assignments and invitations.
- Person identity links and family-specific profiles.
- Relationships, facts, sources and disputes.
- Media originals, derivatives and metadata/EXIF.
- Stories, transcripts and translations.
- Contributions, audit records and publication snapshots.
- Export archives and background job payloads.

Trust boundaries:
- Browser/mobile client to API.
- API to PostgreSQL.
- API/worker to object storage.
- API/worker to email provider.
- API/worker to AI/transcription/translation providers.
- Private application data to published public projections.
- One family tenant to another family tenant.

Assume client input, uploaded files, external provider responses and public traffic are untrusted.

## 3. Threat scenarios and controls

| Threat | Example | Required controls | Verification |
|---|---|---|---|
| Cross-family IDOR | User changes family/person UUID in URL | Family context authorization, scoped repositories, composite FKs, optional RLS | Negative API tests across two families |
| Role escalation | Contributor changes role or owner fields | Server-derived actor/membership; explicit policy checks; protected role mutations | Role matrix tests |
| Invitation theft/replay | Leaked invitation URL reused | Hashed random token, expiry, single-use, revoke, email/role binding | Expired/replayed/revoked token tests |
| Session theft | Stolen cookie or refresh token | Secure HttpOnly cookie, SameSite, CSRF strategy, rotation, reuse detection, revocation | Session lifecycle tests |
| Public data leakage | Private person appears in public tree | Separate published projections, explicit field selection, cache purge on revoke | Snapshot and revocation leakage tests |
| Minor/living person exposure | Exact birth date or contact info published | Private defaults, field-level policy, stricter sensitive data rules | Publication policy tests |
| Malicious upload | Polyglot or oversized file | Size/type/signature checks, isolated processing, malware scan where feasible, private bucket | Upload abuse tests |
| Media URL leakage | Long-lived object URL shared | Short-lived signed URLs, authorization before signing, revoke/cache strategy | Expiry/access tests |
| AI prompt/data leakage | Unauthorized record enters prompt or embedding | Authorized retrieval before prompt assembly; tenant-scoped indexes; provider data controls; redaction | Retrieval authorization tests |
| Audit tampering | Privileged user edits history | Append-only audit role, immutable event chain/retention controls | Permission and integrity tests |
| Graph abuse | Huge graph query exhausts DB | Depth/node/edge limits, timeouts, pagination, rate limits, query plan tests | Load/abuse tests |
| Account deletion collateral | Deleting one account removes shared family data | Membership revocation separate from family/person deletion; deletion workflow and retention rules | Multi-family deletion tests |

## 4. Authorization model

Every family operation resolves:
1. Authenticated user and active session.
2. Family membership for requested family.
3. Membership status.
4. Role and branch scope.
5. Target record belongs to that family.
6. Record-level visibility and access channel.
7. Operation-specific policy (read, propose, approve, publish, export, delete).

Do not return different errors that reveal whether a foreign-family resource exists. For unauthorized and nonexistent records, use a consistent not-found response where appropriate.

### Proposed role-action matrix

| Action | Owner | Admin | Branch manager | Contributor | Reviewer | Viewer |
|---|---|---|---|---|---|---|
| Read permitted records | Yes | Yes | Scoped | Yes | Yes | Yes |
| Create/edit own proposals | Yes | Yes | Scoped | Yes | As allowed | No |
| Directly apply edits | Yes | Delegated | No by default | No | No | No |
| Invite members | Yes | Yes | Scoped if delegated | No | No | No |
| Change family settings | Yes | Delegated | No | No | No | No |
| Review proposals | Yes | Yes | Scoped | No | Yes | No |
| Publish/unpublish | Yes | Delegated | No by default | No | Review only | No |
| Export archive | Yes | Delegated | No by default | No | No | No |
| Transfer ownership | Yes, guarded | No | No | No | No | No |

This matrix is a proposal. Product and legal review must finalize exact permissions, especially direct edits, publication and export.

## 5. Publication security

- Publication is an explicit workflow, never a family-wide boolean that exposes all records.
- Publication service constructs a versioned allowlisted projection from approved source records.
- A public visitor cannot query private domain tables.
- Exclude living people/minors by default; exceptions require explicit policy and informed consent.
- Remove sensitive fields such as contact details, precise home coordinates and exact dates unless explicitly approved.
- Media derivatives strip EXIF and private metadata.
- Revocation marks projection unavailable, invalidates caches/CDN, and revokes or expires media access.
- Audit who approved each field/content publication and when.

## 6. Media and upload security

- Object storage buckets are private and block public ACLs.
- API authorizes upload intent before issuing a short-lived signed URL.
- Validate size, declared MIME type and file signature; do not trust extension.
- Quarantine pending malware/content scanning where feasible.
- Use random object keys; original filename is metadata only.
- Image/video processing runs in isolated workers with resource/time limits.
- Public derivatives are generated separately; preserve original bytes.
- Download URL is short-lived and issued only after checking record visibility.
- Deletion workflow removes derivatives and object versions according to retention policy.

## 7. Sessions and application security

- Passwords use a modern memory-hard password hash.
- Session cookies use Secure, HttpOnly, narrow Path and appropriate SameSite; use __Host prefix where compatible.
- CSRF protection is required for cookie-authenticated state-changing requests.
- Refresh tokens rotate; detect reuse and revoke the token family.
- Rate-limit login, recovery, invitation, search and expensive graph endpoints.
- Use strict input schemas, output encoding, CSP and security headers.
- Secrets are injected from secret management; never logged or committed.
- Admin/publication/export/deletion actions are audited.
- Email verification and recovery responses avoid account enumeration.

## 8. AI and background processing

- Authorize data before retrieval; unauthorized records must not enter prompts, embeddings, caches, logs or telemetry.
- Worker jobs carry opaque job ID and family context; workers re-check current authorization at execution time.
- Revoked membership or publication rights must be considered before job completion/delivery.
- External providers receive only minimum necessary content.
- Provider retention/training terms are reviewed before production use.
- AI outputs are drafts with claim-level provenance; no direct write to confirmed genealogy facts.
- Redact personal data from logs and provider error telemetry.

## 9. Privacy, retention and rights

Open policy decisions:
- Retention period for deleted accounts and family audit records.
- How shared identity references behave when a user leaves a family.
- Correction/removal request process for living people and minors.
- Whether family owners can export all member contributions.
- Legal hold and backup purge windows.
- Ownership transfer and inactive-owner recovery.
- Consent requirements for public publication and AI processing.

## 10. Security acceptance gates

- [ ] Threat model reviewed by engineering and product.
- [ ] Role/action matrix approved.
- [ ] Cross-family negative tests specified for every family-scoped endpoint.
- [ ] Public projection and revocation threat tests specified.
- [ ] Media upload/signing threat tests specified.
- [ ] Session/CSRF/recovery controls agreed.
- [ ] AI and worker authorization flow agreed.
- [ ] Data retention/deletion policy decisions recorded.
- [ ] No unresolved critical threat is silently deferred to implementation.

ARCH-004 remains draft until controls, ownership and test evidence are reviewed.
