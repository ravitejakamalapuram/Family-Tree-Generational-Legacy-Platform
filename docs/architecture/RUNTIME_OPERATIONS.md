# Runtime, Operations and Implementation Blueprint

**Workstream:** ARCH-005  
**Status:** Draft v0.3 — runtime defaults selected; provider-specific and production recovery validation pending  
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

Selected local defaults:
- PostgreSQL 16 container, direct connection for local development and integration tests.
- MinIO as a local S3-compatible object-storage adapter; never use it as a production-provider assumption.
- Mailpit as local mail catcher/test email adapter.
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

- Stateless API instances; persist opaque server-side sessions and hashed rotating refresh credentials in PostgreSQL for v1. Keep cookie values HttpOnly/Secure/SameSite and never store raw refresh tokens.
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

Accepted direction (ADR-0008, 2026-10-31): use a maintained PostgreSQL-backed durable queue initially; pg-boss is the preferred candidate, not yet a final dependency. Domain write + outbox row must commit atomically; an idempotent relay publishes to the queue. The POC proves outbox rollback, dedupe and competing `SKIP LOCKED` claims (run #41337946121), but pg-boss retry/lease/singleton behavior and load/lock testing remain required before worker-heavy features ship. Do not implement a bespoke queue by default.

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

## 12. Selected defaults and production gates

1. **Deployment/database:** choose a managed PostgreSQL provider with an India primary region as the default evaluation target. Do not claim a blanket legal localization mandate. Provider, backup region, subprocessor and transfer terms require review. Start local/CI with direct PostgreSQL; prove the exact production pooler mode before enabling RLS-backed production traffic.
2. **Jobs:** PostgreSQL durable queue plus transactional outbox; pg-boss preferred candidate pending integration tests and realistic load/lock benchmarks.
3. **Sessions:** PostgreSQL-backed opaque sessions and hashed rotating refresh credentials; session cookie remains HttpOnly/Secure/SameSite and CSRF-protected.
4. **Object storage:** S3-compatible abstraction; MinIO local/test. Production provider must support private buckets, object versioning, lifecycle deletion, short-lived signed URLs, checksums and malware-scanning integration.
5. **Observability:** OpenTelemetry-compatible traces/metrics/logs with vendor-neutral instrumentation. Error monitoring provider is selectable; redact PII, family content, tokens and signed URLs before export.
6. **Recovery targets:** propose initial production objectives of RPO ≤ 1 hour and RTO ≤ 8 hours for review against provider capabilities/cost. Require point-in-time DB recovery, object versioning/manifests and a witnessed restore drill before production launch; these are targets, not measured guarantees.
7. **Feature flags:** start with typed environment/config-backed flags for deployment-level switches; use database-backed family/user flags only when a product use case requires them. Avoid adding a flag SaaS dependency in the foundation.
8. **Migrations:** reviewed SQL migrations, executed by a separate migration role using a controlled deployment step; no runtime schema push/sync.

ARCH-005 is sufficient to begin foundation work with these defaults. Provider-specific deployment, pooler, recovery and queue evidence remain release gates before production and before the corresponding features are enabled.
