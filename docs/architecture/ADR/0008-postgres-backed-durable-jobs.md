# ADR-0008: PostgreSQL-backed durable jobs for the initial release

**Status:** Accepted — engineering direction approved 2026-10-31
**Date:** 2026-10-30

## Context
The modular monolith needs asynchronous work for email, media processing, publication projection, transcription and archive export. Initial expected volume is modest, and transactionally enqueueing work with domain writes is valuable. Introducing a separate broker adds operational cost before scale is known.

## Decision

**Approval note:** Product owner approved this initial-release direction on 2026-10-31. Validate the selected maintained queue, transactional enqueue/outbox behavior, retries, idempotency and authorization rechecks before production use.
Use a PostgreSQL-backed durable job queue for the initial release. Prefer a maintained PostgreSQL queue such as pg-boss rather than implementing a bespoke queue. Keep job payloads versioned and minimal; carry opaque IDs and family scope, not unnecessary personal content.

- Enqueue durable work through a transactional outbox: the domain mutation and outbox record commit in one database transaction; a relay publishes with a stable idempotency key to the maintained queue. The POC passed rollback, dedupe and competing `SKIP LOCKED` claim tests (CI #41339408260). pg-boss itself, retry/lease/singleton behavior and load limits remain to be validated before adopting it as the concrete adapter.
- Workers use leases/visibility timeouts, bounded concurrency, retry with exponential backoff and jitter, and terminal failure states. The exact queue library semantics must be proven with integration tests rather than inferred from the outbox POC.
- Jobs are idempotent; use stable idempotency keys and deduplicate repeated deliveries.
- Re-check current membership, record visibility and publication permissions before processing and before delivery.
- Track attempts, next run, safe error metadata, progress and cancellation where applicable.

## Consequences
- Fewer initial infrastructure dependencies.
- Database workload includes job polling/locking and must be measured.
- Long-running media/AI work needs worker isolation, timeouts and resource limits.
- Move to a managed queue only when measured throughput, latency or operational isolation justifies it.

## Alternatives considered
- Managed SQS/Cloud queue: robust at scale, but adds another dependency and transactional outbox requirement.
- Redis queue: viable but adds Redis availability/consistency and recovery considerations.
- Custom jobs table: rejected unless no maintained queue satisfies transaction, retry and observability requirements.

## Revisit trigger
Queue depth, lock contention, database utilization, latency or workload isolation exceeds documented service targets.
