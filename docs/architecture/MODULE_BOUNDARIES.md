# Backend Module Boundaries and Dependency Rules

**Workstream:** ARCH-001  
**Status:** Draft for architecture review  
**Version:** 0.1  
**Inputs:** ARCHITECTURE.md, DATA_MODEL.md, API_DESIGN.md, SECURITY_PRIVACY.md, accepted ADRs.

## 1. Architecture style
Use a modular monolith with a single deployable API initially. Modules own their domain state and expose application-level interfaces. Background worker processes may share the same codebase and module boundaries. Do not split into microservices without measured operational or scaling evidence.

Layering inside a module:
- Domain: entities/value objects, invariants, domain policies; no HTTP, ORM or vendor dependencies.
- Application: use cases, authorization orchestration, transaction boundaries and module interfaces.
- Infrastructure: database repositories, external providers, queues, object storage and adapters.
- Interface: HTTP controllers/DTOs and worker handlers.

## 2. Proposed module ownership

| Module | Owns | Does not own |
|---|---|---|
| Auth & Sessions | Credentials, verification, sessions, refresh/revocation | Family memberships or family facts |
| Users & Preferences | Account profile, language and user preferences | Family-specific person profiles |
| Families & Memberships | FamilySpace, membership, invitations, role assignment | Person identity or relationship edges |
| People & Identity | Global Person identity and identity-level references | Family display/privacy/facts |
| Family People | FamilyPerson, family-specific names/profile/facts/visibility | Global credentials or cross-family discovery |
| Genealogy | Relationship types/edges/revisions, graph validation, path/ancestor/descendant algorithms | HTTP, UI layout, AI interpretation |
| Branches | Family branch/group metadata and delegated scope | Replacing relationship graph semantics |
| Media & Memories | Media metadata, upload lifecycle, memory records/tags/visibility | Raw identity/relationship ownership |
| Stories | Story content, oral-history transcript versions and links | AI provider implementation |
| Collaboration | Contributions, review decisions and workflow state | Owning all business entities being proposed |
| Events & Places | Event, participant, place and historical place facts | Person identity |
| Search | Family-scoped search indexing/query orchestration | Authorization decisions; it must consume authorized scopes |
| Publication | Publication approval, published projections, revocation | Direct public reads from private domain tables |
| Notifications | Notification preferences, delivery intents and read state | Permission decisions; source modules authorize intent |
| Historian / AI | Provider abstraction, prompt/retrieval orchestration, draft outputs | Authoritative fact/relationship writes |
| Archives & Exports | Export jobs, package manifests, import validation | Bypassing access/deletion policy |
| Audit | Immutable audit records and query interfaces | Acting as a replacement for domain state |

The precise split of People and Family People may be implemented as one package with explicit subdomains initially; the identity boundary must remain explicit regardless of folder structure.

## 3. Dependency rules
- Domain layer has no dependencies on infrastructure, HTTP, React, ORM models or AI vendors.
- Interface layer calls application use cases; it must not call repositories directly.
- Application services may depend on their own domain and declared module ports.
- Modules do not import another module's private persistence models.
- Cross-module reads use explicit query interfaces; cross-module writes use application interfaces and explicit orchestration.
- No circular module dependencies.
- Search, AI, notifications and exports are consumers of authorized data contracts, never alternate authorization authorities.
- Public web/API surface reads Publication-owned projections only.
- Genealogy algorithms operate on domain graph contracts, not ORM-specific records or XYFlow nodes.

## 4. Critical workflow ownership and transaction boundaries

### Create family
Families/Memberships owns the use case. Create FamilySpace and owner Membership in one transaction. Authenticated user identity is supplied by the session context, never accepted as an arbitrary owner ID from request body.

### Add person to family
People/Identity and Family People coordinate one application use case. Create a new opaque Person anchor and one FamilyPerson scoped to the target family in the same use case. In v1, never select/reuse an anchor from another family; do not expose global identity search. Duplicate suggestions are family-scoped and advisory. The database UNIQUE(person_id) constraint enforces one anchor per representation.

### Add relationship
Genealogy owns validation and persistence. Both endpoints must be FamilyPerson records from the same family. Validate relationship type, role permissions, temporal constraints and graph rules in one transaction. Persist provenance/revision/audit information with the change.

### Submit and approve contribution
Collaboration owns proposal/review state. The target domain module validates and applies the approved change through its application interface. Proposal state transition and domain mutation must be atomic or use an explicit recoverable workflow. Keep before/after and reviewer attribution.

### Publish family content
Publication owns publication lifecycle. It reads authorized source records, validates explicit consent/role and creates a versioned projection. Public requests read only that projection. Revocation invalidates caches and media access promptly.

### Delete or export account/family
Archives/Exports orchestrates a policy-aware workflow across source modules. Each owner module provides export/deletion handlers. Shared Person identity must not cause one family's deletion to remove another family's family-scoped representation.

## 5. Cross-cutting contracts
- Request context contains authenticated user ID, request ID and trace context. Family ID is resolved and authorized, not trusted.
- Authorization decisions are explicit inputs to use cases or policies, with tests at application boundaries.
- All writes that can race use version checks/optimistic concurrency.
- Retryable commands are idempotent or use idempotency keys.
- Long-running media, AI and export work uses durable jobs with retries and observable terminal states.
- Audit events record actor, action, target, family scope, timestamp, source and relevant before/after references without copying secrets or unnecessary sensitive content.
- Module APIs use typed commands/results and stable domain error codes; HTTP mapping happens at the interface layer.

## 6. Initial package layout proposal
```
apps/
  api/
  worker/
packages/
  domain/
    identity/
    families/
    people/
    genealogy/
    collaboration/
    publication/
  application/
    auth/
    families/
    people/
    genealogy/
    media/
    stories/
    events/
    search/
    historian/
    archives/
  infrastructure/
    database/
    object-storage/
    email/
    jobs/
    observability/
  contracts/
    api/
    events/
    shared/
```
This is a logical layout, not a mandate to create a large number of packages immediately. Keep one deployable modular application and split folders only where ownership is clear.

## 7. Resolved module defaults and remaining gates
1. **ORM:** Prisma with reviewed SQL-first migrations per ADR-0006; recursive CTEs, RLS and specialized constraints remain parameterized SQL in infrastructure.
2. **People and Family People:** one logical People module in R1 with separate identity and family-representation subdomains/repositories. Preserve the Person/FamilyPerson boundary and no cross-family reuse.
3. **Audit:** aggregate-specific revision/history tables remain owned by each domain; the Audit module owns append-only actor/action/request-level audit events. Do not duplicate full sensitive payloads in general audit metadata.
4. **Contribution transaction:** R2 application orchestrator performs proposal state transition, target-domain mutation, revision/audit event and outbox insert in one PostgreSQL transaction. If future work crosses a service boundary, introduce an explicit idempotent saga; do not silently weaken atomicity.
5. **Jobs:** PostgreSQL-backed durable queue direction accepted (ADR-0008); use a transactional outbox for domain events. pg-boss remains the preferred candidate pending library integration/load tests.
6. **Second-person review:** required for publication of living/minor/sensitive content; sensitive relationship corrections and ownership/role escalation follow a policy matrix to be finalized before those workflows ship. R1 can launch without public publishing or contribution review.

## 8. Review checklist
- [ ] Every persistent entity has one owning module.
- [ ] Module dependencies are acyclic and documented.
- [ ] Person / FamilyPerson / FamilySpace boundaries are explicit.
- [ ] Relationship graph ownership and family-scope invariants are explicit.
- [ ] Authorization cannot be bypassed through search, jobs, exports or AI.
- [ ] Publication projections isolate public reads from private tables.
- [ ] Transaction/retry/concurrency behavior is defined for critical workflows.
- [ ] Open questions have owners and are recorded as ADRs before implementation.
