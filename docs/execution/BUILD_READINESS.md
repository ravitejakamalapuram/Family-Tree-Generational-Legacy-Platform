# Build Readiness

**Status:** READY TO START R1 FOUNDATION BUILD (synthetic data only)  
**Last reviewed:** 2026-11-02  
**Decision scope:** Permission to begin R1 engineering foundations using synthetic data; not production launch approval.

## 1. Readiness principle

The start-building gate is narrower than production readiness. Foundation work may begin when the product direction, R1 journeys, domain boundaries, API contract, local stack and highest-risk data invariants are sufficiently specified and technically plausible. Provider-specific deployment, legal approvals, production security evidence and release-level accessibility checks remain hard gates before the affected data/features go live.

No real family, child, health, contact or other personal data may be used in development/POC fixtures. Use fictional/synthetic data only.

## 2. Start-building gate

| Area | Evidence required | Status |
|---|---|---|
| Product scope and R1 exit criteria | PROJECT_CHARTER, PRODUCT_REQUIREMENTS, USE_CASES, DELIVERY_PLAN and stable FL backlog agree | Pass; R1/R2/R3 priorities reconciled |
| Product decisions | UX-DEC-002–006 and ADR-0005–0008 accepted and recorded | Pass |
| Identity isolation | Person/FamilyPerson v1 invariant, UNIQUE(person_id), backlog and PRD reconciled | Pass |
| UX R1 screen coverage | Nine R1 screens specified; account entry, onboarding, dashboard, people, add/edit, profile, tree, relationship editor and member/invite flows prototyped | Pass |
| UX automated checks | All R1 screens at desktop/tablet/mobile/320px, no horizontal overflow, key flows, pre-validation invite privacy assertions and per-screen axe scans at desktop/mobile | Pass on current UX PR head: #41340292066 on current UX PR head; [40-screen capture artifact](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41340292066/artifacts/13096888231) |
| UX manual accessibility | Full keyboard-only, screen-reader and regional-script review | Deferred to implementation QA; must pass before release |
| Backend module boundaries | Modular monolith, module ownership, transaction/audit/outbox defaults | Pass |
| Data model and tenant constraints | ERD, composite-FK audit, RLS policy matrix, identity constraints | Design pass; full schema migration/tests required during foundation |
| API contract | OpenAPI 3.1 32 paths/39 operations; Redocly bundle passes | Pass for contract syntax; runtime contract tests deferred until handlers exist |
| Highest-risk database proof | Prisma + PostgreSQL 16, RLS tenant context, composite FKs, identity uniqueness, concurrent graph-cycle prevention | Pass on ERD-aligned direct connection in #41339408260 and latest PR-head rerun #41339514211 |
| Durable job proof | Transactional outbox rollback/dedupe and competing SKIP LOCKED claims | Pass in #41339408260 and latest PR-head rerun #41339514211; pg-boss adapter behavior deferred |
| Local developer stack | PostgreSQL 16, MinIO, Mailpit; Node/TypeScript, Prisma SQL-first migrations | Pass as documented default |
| Security/privacy baseline | Threat model, P0 negative-test matrix, India DPDP readiness baseline | Pass as engineering design; legal sign-off not granted |
| Build sequence and ownership | FL-001/002/003/008 dependency order and measurable exit criteria | Pass; see section 5 |

## 3. Safe defaults for foundation implementation

- Frontend: React + TypeScript + Vite; accessible component primitives; XYFlow is the rendering layer only, not the source of genealogy truth.
- Backend: Node.js + TypeScript + NestJS modular monolith.
- Data: PostgreSQL 16+, Prisma Client, reviewed SQL-first migrations; recursive CTEs and RLS use parameterized SQL where required.
- Tenant boundary: every family-owned row includes family_id; composite same-family FKs; transaction-local RLS context set only after application authorization.
- Identity: one opaque Person anchor per FamilyPerson in v1; no cross-family identity matching or reuse.
- Jobs: transactional outbox contract first; keep a queue adapter boundary. pg-boss is preferred candidate but not a locked dependency until integration/load proof.
- Media: private S3-compatible interface; MinIO local/test. Production provider remains unselected.
- Sessions: opaque HttpOnly/Secure/SameSite cookies with PostgreSQL-backed session state and hashed rotating refresh credentials.
- Local services: PostgreSQL, MinIO and Mailpit via developer compose; no production credentials in local files.
- Observability: OpenTelemetry-compatible traces/metrics/logs with strict PII/content redaction.
- Data: synthetic fixtures only until privacy/legal and provider gates are approved.

## 4. Deferred gates — do not mistake these for completed work

### Before production database traffic
- Verify the exact managed PostgreSQL provider and connection pooler mode; prove transaction-local RLS context cannot leak across pooled transactions.
- Test full schema migrations from empty and previous supported versions, upgrade/compensating rollback and schema drift.
- Apply and test RLS on every family-owned table; prove runtime role separation and no direct source-table access by public roles.
- Run full cross-family IDOR, branch/role/record-visibility, CSRF, invitation replay and worker authorization tests.

### Before worker-heavy features
- Integrate pg-boss (or selected maintained alternative) with transactional outbox.
- Prove retries, leases, singleton/deduplication, idempotency, cancellation, authorization rechecks, backpressure and realistic lock/load behavior.

### Before real personal or child data
- Qualified privacy counsel must approve the operating model/Data Fiduciary roles, lawful grounds for family-submitted living-person data, notices, rights/grievance operations, retention/deletion and guardian verification.
- Implement and verify child-data controls, including applicable verifiable parental consent and withdrawal.
- Approve data processor/subprocessor terms, backup/region locations and cross-border transfers.

### Before public pages or AI
- Public pages: consent evidence, second review, allowlisted projections, living/minor exclusions, revocation and cache/media purge tests.
- AI: provider terms/DPA, no-training/retention and transfer controls, explicit purpose/opt-in, permission-aware retrieval and deletion.

### Before release
- Manual screen-reader and keyboard QA, regional-language/mixed-script review, complex genealogy scenarios, complete contrast matrix.
- Restore drill, media integrity, backup objectives, incident/breach runbooks and production SLO/load tests.

## 5. First implementation sequence

1. FL-001 — frontend foundation: Vite/React/TypeScript, lint/test/build, accessible shell, route structure, family-space context and API client boundary.
2. FL-002 — backend foundation: NestJS modular monolith, config/health, request IDs, error envelope, OpenAPI generation/validation and test harness.
3. FL-003 — PostgreSQL/Prisma SQL migration baseline: users, sessions, family_spaces, memberships, opaque Person/FamilyPerson, RLS roles/policies and composite constraints. Build migration/tenant tests before endpoints.
4. FL-004/005 — typed configuration and CI; add Postgres integration service and required checks.
5. FL-006/007 — structured logging, OpenTelemetry-compatible telemetry and error monitoring with PII redaction.
6. FL-008 — approved semantic design tokens, component primitives and responsive shell.
7. Start R1 domain flows in dependency order: authentication/session → family creation/membership → people/facts/provenance → relationships/graph integrity → tree projections → invitation/member controls → dashboard.

Do not begin memories, contribution review, public publishing or AI as part of R1 foundations; keep them behind their later release gates.

## 6. Final decision record

**Decision: READY TO START BUILDING**

The R1 foundation may begin on synthetic data. The current design and contract are sufficiently specified, accepted decisions are recorded, the all-screen UX browser/axe suite passes, OpenAPI validation passes, and the ERD-aligned PostgreSQL/Prisma proof passes for the highest-risk identity, tenant, graph and outbox invariants. Remaining items are explicitly deferred behind implementation, provider-selection or production-release gates in section 4.

This decision authorizes FL-001/FL-002/FL-003/FL-008 foundation engineering. It does not authorize production launch, real personal/child data processing, public publishing or third-party AI processing. Keep all private data synthetic until the legal, security, provider and operational release gates are passed.
