# Backend Architecture Workstream — ARCH-001 to ARCH-005

**Status:** Draft artifacts and internal review pass completed; OpenAPI 3.1 bundling passes; architecture decisions and contract completeness remain open.
**Source inputs:** ARCHITECTURE, DATA_MODEL, API_DESIGN, SECURITY_PRIVACY and accepted ADRs.

## Objective
Convert the current high-level architecture baseline into an implementation-ready backend design with explicit domain boundaries, persistence constraints, API contracts, authorization rules and operational behavior.

## Non-negotiable domain invariants
1. Person is a global identity record; FamilyPerson is its representation in one FamilySpace.
2. All family facts, display details, memberships, roles and privacy settings are scoped to a family representation.
3. Relationship edges connect FamilyPerson records in the same family only.
4. Family IDs and opaque UUIDs are identifiers, never authorization.
5. Never auto-merge identities or silently overwrite disputed historical assertions.
6. Unknown, approximate, conflicting and sourced facts must be representable.
7. Public reads use explicit published projections, not private tables with client-side filtering.
8. Authorization applies to API, background jobs, exports, search and AI retrieval.

## ARCH-001 — Domain boundaries and modular monolith
Define:
- Bounded modules and ownership of domain entities.
- Allowed module dependencies and public interfaces.
- Domain services versus application services versus infrastructure adapters.
- Transaction boundaries and cross-module orchestration.
- Events/jobs where asynchronous work is justified; avoid premature event streaming.

Proposed modules to validate: Auth/Identity, Users, Families/Memberships, People/FamilyPeople, Genealogy/Relationships, Media/Memories/Stories, Collaboration/Approvals, Events/Places, Search, Publication, Notifications, Archives/Exports, Historian/AI.

Acceptance:
- Module responsibility matrix and dependency diagram exist.
- No circular dependencies; genealogy domain logic is framework/ORM independent.
- Every cross-module workflow has an explicit owner and transaction strategy.

## ARCH-002 — Data model, constraints and migrations
Finalize ERD and schema for:
- User, Credential/Session/VerificationToken.
- FamilySpace, Membership, Invitation, Role/Permission.
- Person, FamilyPerson, PersonName, Fact/Assertion, Source/Citation.
- Relationship and relationship history/revision.
- Branch and family-defined grouping.
- MediaAsset, MediaVariant, Memory, Story, tags and visibility.
- Contribution, Approval, AuditEvent.
- Publication, PublishedPerson/PublishedRelationship/PublishedContent projections.
- Event, Participant, Place.
- ExportJob, BackgroundJob and notification records where needed.

Specify:
- Primary/foreign keys, uniqueness and check constraints.
- Family-scoped composite constraints for graph edges.
- Soft deletion/archival versus hard deletion.
- Temporal and uncertain-date representation.
- Optimistic concurrency/versioning.
- Indexes and query patterns.
- Migration, rollback and recovery approach.

Acceptance:
- ERD and data dictionary reviewed.
- Constraints enforce critical invariants where possible.
- Migration plan supports clean setup and safe forward changes.
- No production schema auto-sync.

## ARCH-003 — API contracts and error model
Finalize OpenAPI 3.x contracts for P0 flows:
- Auth and session lifecycle.
- Family creation, membership and invitations.
- People, names, facts and profiles.
- Relationship create/update/revise.
- Bounded tree, ancestor and descendant reads.
- Search and relationship path.
- Health/readiness endpoints.

Specify:
- Request/response schemas, validation, pagination and limits.
- Standard error envelope and stable error codes.
- Request/correlation IDs.
- Idempotency for retryable writes.
- ETags/version checks and conflict responses.
- API versioning and compatibility.

Acceptance:
- OpenAPI 3.1 document parses and bundles in CI (latest pass: run 41003237580; 32 paths and 39 operations).
- Every P0 UI journey maps to API operations, including endpoint-level authorization and error behavior (reconciliation remains in progress).
- Authorization and error behavior documented per operation.

## ARCH-004 — Security, privacy and threat model
Define:
- Authentication/session strategy, password hashing and refresh rotation.
- Role/action matrix and record-level visibility rules.
- Tenant-isolation strategy and automated negative tests.
- Public projection creation, approval, revocation and cache invalidation.
- Living-person/minor defaults and sensitive data handling.
- Upload authorization, file validation, malware/scanning strategy and signed URL lifecycle.
- Audit coverage, retention and deletion/export obligations.
- Rate limits, abuse controls, secrets, encryption and backup protections.
- AI/job authorization and least-privilege service identities.

Acceptance:
- Threat model and permission matrix reviewed.
- Sensitive workflows have explicit authorization checkpoints.
- Cross-family and public-leakage test scenarios are defined before implementation.

## ARCH-005 — Runtime, operations and implementation blueprint
Define:
- Local developer environment and dependency orchestration.
- Configuration schema and secret management.
- Logging, metrics, traces and error monitoring with redaction.
- Worker/job model, retries, idempotency and dead-letter handling.
- Storage adapter and media lifecycle.
- Health/readiness, graceful shutdown and deployment topology.
- Test strategy and performance budgets for bounded graph operations.

Acceptance:
- Local architecture can be run by a new engineer from documented steps.
- Operational failure modes and recovery are documented.
- FL-002/FL-003/FL-004/FL-005 implementation sequence is dependency-correct.

## Architecture decision gates
1. Domain boundaries and ownership approved.
2. ERD, constraints and transaction strategy approved.
3. OpenAPI contracts approved for P0.
4. Security/privacy model and threat scenarios approved.
5. Runtime/operations blueprint approved.

## Scope boundary
This workstream produces design artifacts and validated contracts; it does not build the API. FL-002 is the backend implementation foundation, FL-003 is PostgreSQL/migrations, and FL-004/FL-005 implement configuration and CI. Existing ADRs remain accepted unless a documented ADR amendment supersedes them.
