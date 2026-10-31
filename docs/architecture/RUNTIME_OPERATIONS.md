# Runtime, Operations and Implementation Blueprint

**Workstream:** ARCH-005  
**Status:** Draft v0.2 — ADR direction accepted; runtime provider and operational proof pending  
**Related:** ARCHITECTURE.md, MODULE_BOUNDARIES.md, ERD_AND_SCHEMA.md, SECURITY_THREAT_MODEL.md

## 1. Initial runtime topology

Start with a small number of deployable processes from one codebase:
- Web: static React application served through CDN/static hosting.
- API: stateless Node.js/NestJS HTTP service.
- Worker: Node.js process for durable asynchronous jobs.
- PostgreSQL: managed relational database.
- Object storage: private S3-compatible bucket.
- Email provider: verification, invitations and notifications.
- Observability: structured logs and error monitoring.

Avoid Kubernetes, microservices, Kafka and a separate graph database initially. Revisit only with measured need.

## 2. Environment model

| Environment | Purpose | Data | Access |
|---|---|---|---|
| Local | Developer workflow | Seeded synthetic data | Developer machine |
| Test/CI | Automated checks | Ephemeral synthetic DB/storage | Pipeline only |
| Staging | Release validation | Synthetic or explicitly sanitized data | Restricted team |
| Production | Real families | Encrypted persistent data | Least privilege |

No production personal/family data in local or CI environments. Staging must not be populated from production backups unless a documented anonymization process exists.

## 3. Local developer experience

Proposed local dependencies:
- PostgreSQL container with version pinned.
- Local S3-compatible object store or test adapter.
- Mail catcher/test email adapter.
- API, worker and web apps run with hot reload.
- One command for dependency startup and one command for migrations/seed.
- Seed script creates synthetic families covering five generations, multiple partners, adoptive/step/guardian links, unknown dates and multiple family representations.

Local setup documentation must state required runtime versions, environment variables, migration commands, seed/reset commands and common troubleshooting.

## 4. Configuration and secrets

- Validate environment at process startup with a typed schema.
- Separate public web configuration from server secrets.
- Never expose DB credentials, storage secret keys, signing keys or provider API keys to frontend bundles.
- Secret manager/env injection for staging and production.
- Rotate credentials and signing keys with documented overlap procedure.
- Fail startup for missing required configuration; do not silently use insecure defaults.
- Provide safe local example values only in .env.example.

## 5. API process behavior

- Stateless API instances; session state persisted in PostgreSQL or a reviewed shared session store.
- Graceful shutdown stops accepting requests and drains in-flight work.
- Request ID and trace context generated/propagated at ingress.
- Set request body, upload metadata and query complexity limits.
- Apply request timeouts and bounded database pool.
- Health endpoints distinguish liveness from readiness.
- Readiness checks required dependencies without exposing secrets or internal topology.

## 6. Background jobs

Initial job categories:
- Media validation, thumbnailing and derivative generation.
- Audio transcription and translation.
- Email/invitation delivery.
- Archive import/export.
- Publication projection build/revoke.
- Periodic integrity and cleanup tasks.

Job contract:
- Durable job ID, family scope, actor/request reference, type, payload schema version, attempt count, scheduled time, status and timestamps.
- Idempotency key and deduplication policy.
- Retry transient failures with exponential backoff and jitter.
- Permanent failures move to terminal failed state with safe diagnostic metadata.
- Jobs re-check membership, publication and record authorization at execution/delivery time.
- Do not put raw secrets or unnecessary personal content in job payloads.
- Long-running jobs expose progress/status and allow safe cancellation where possible.

Accepted direction (ADR-0008, 2026-10-31): use a maintained PostgreSQL-backed durable queue initially (pg-boss is the preferred candidate), subject to a proof of transactional enqueue/outbox behavior, lease/retry/idempotency semantics, authorization rechecks and load/lock testing. Do not implement a bespoke queue by default.

## 7. Storage lifecycle

- Private bucket with public access blocked.
- Separate original and derived object namespaces.
- Object keys random and non-semantic; metadata stored in database.
- Upload intents are short-lived and family-scoped.
- Processing status: pending, uploaded, scanning, ready, rejected, deletion_pending, deleted.
- Store checksum and byte size; verify after upload/processing.
- Public derivatives are generated only through publication workflow.
- Lifecycle cleanup must coordinate DB state, object versions, backups and retention policy.

## 8. Observability

Structured logs:
- timestamp, level, service, environment, requestId, traceId, actor ID where appropriate, family ID only where safe, operation, duration, result/error code.
- Never log passwords, cookies, tokens, invitation links, signed URLs, raw media, full biography or sensitive fact payloads.
- Redact email and identifiers in high-volume/shared telemetry where feasible.

Metrics:
- HTTP request rate, latency, error rate.
- DB pool saturation, query latency, connection errors.
- Worker queue depth, job age, retry/failure rate.
- Upload success/failure/processing duration.
- Tree query node/edge counts and latency.
- Authentication/invitation abuse signals.
- Export/restore success and duration.

Alerts:
- API availability/error budget.
- DB unavailable/pool exhausted.
- Worker backlog or repeated job failures.
- Storage failures.
- Backup/restore verification failure.
- Unexpected public publication/revocation errors.

## 9. Testing and quality gates

- Unit tests for domain invariants.
- Application tests for transaction and permission orchestration.
- API integration tests against real PostgreSQL.
- Cross-family and role-matrix negative tests.
- Migration tests from empty DB and previous supported version.
- Contract validation for OpenAPI.
- Worker idempotency/retry/authorization tests.
- Storage upload/download/expiry tests.
- Graph performance tests with synthetic 5,000+ person family.
- Restore drill from database backup plus media manifest.

## 10. Deployment and recovery

Initial deployment:
1. Build immutable versioned artifacts.
2. Run backward-compatible expand migrations.
3. Deploy API and worker.
4. Verify readiness and smoke tests.
5. Enable new behavior behind controlled feature flags where useful.
6. Observe metrics/errors.
7. Perform contract/cleanup migrations in later release.

Recovery:
- Database point-in-time recovery where supported.
- Object versioning/retention and checksums.
- Documented RPO/RTO targets before production launch.
- Restore DB and media manifest into isolated environment.
- Verify referential integrity, media checksums and login/tree smoke paths.
- Record recovery drill evidence.

## 11. Proposed initial SLOs (targets to validate)

These are provisional targets, not measured guarantees:
- API availability: 99.5% monthly during early release.
- P95 simple authorized reads: under 500ms at expected early load.
- P95 bounded tree response: under 1.5s for normal family size; progressive expansion for large graphs.
- No acknowledged data loss for committed relational writes under supported backup policy.
- Job retry and failure visibility for all asynchronous operations.

## 12. Decisions required

1. Deployment host and managed PostgreSQL provider.
2. Validate the selected PostgreSQL-backed job queue implementation (pg-boss candidate) and operational limits.
3. Session persistence and refresh-token storage model.
4. Object storage provider and malware scanning availability.
5. Observability provider and retention/redaction settings.
6. Initial RPO/RTO and backup retention targets.
7. Feature flag strategy and migration tooling.

ARCH-005 remains draft until runtime choices, local setup and operational recovery are reviewed.
