# Project Status

**Last updated:** 2026-11-02  
**Stage:** R1 foundation build ready  
**Implementation:** Authorized to start FL-001/FL-002/FL-003/FL-008 foundations on synthetic data  
**Milestone:** R1 — Working family tree  
**Default branch:** main

## State

The product owner approved the UX visual direction and UX-DEC-002–UX-DEC-006 defaults, plus ADR-0005–0008 direction, on 2026-10-31. The user has authorized autonomous continuation through the point where the project is genuinely ready to start building. Do not pause for routine decisions; use conservative defaults, revalidate each change and record evidence. Phase 0 PRs remain draft/unmerged; foundation implementation is authorized on synthetic data. No production deployment or personal-data processing is authorized.

## Workstream branches and pull requests

- `workstream/ux-design` — UX specifications, design handoff and interactive prototype.
- `workstream/backend-architecture` — architecture, ERD, OpenAPI, threat model, runtime plan and ADRs.
- `spike/phase-0-proof-only` — isolated PostgreSQL/Prisma proof and India privacy baseline; [Draft PR #66](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/66).
- `feature/fl-001-frontend-foundation` and `feature/fl-002-backend-foundation` — parked but authorized to resume from their respective UX/backend workstream branches when implementation begins.
- [Draft PR #63 — UX](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/63), [Draft PR #64 — backend architecture](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/64), [Draft PR #66 — isolated proof/privacy](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/66) remain open and unmerged.
- PR #65 was closed because its head included the unmerged backend architecture branch; its proof artifacts were replayed cleanly on a main-based branch as PR #66.

## Product and identity decisions

- UX-DEC-002–UX-DEC-006 are accepted in `docs/ux/PRODUCT_DECISIONS.md` on the UX branch.
- ADR-0005–0008 are accepted direction: opaque per-family identity anchors/no cross-family linking in v1; Prisma with reviewed SQL-first migrations; PostgreSQL RLS; PostgreSQL-backed durable jobs.
- ADR-0005 refines ADR-0002 for v1. Each FamilyPerson has its own opaque Person anchor; `UNIQUE(person_id)` is mandatory. A real-world person in another family gets a separate anchor. Product requirements, logical data model, backlog FL-018 and ADR-0002 addendum on main have been reconciled.
- India privacy/compliance engineering baseline is in PR #66 at `docs/product/PRIVACY_AND_COMPLIANCE_READINESS.md`. It is not legal advice. The DPDP Act/Rules have phased commencement; child-data, notices, rights, retention, grievance and lawful-basis design must be reviewed with qualified counsel before the relevant production processing.

## UX progress

- UX-001: R1 launch journeys updated to make first-person creation optional and split R1 invitation acceptance from R2 contribution review.
- UX-002: warm neutral/evergreen direction and semantic-token approach accepted; final contrast matrix and regional-script validation remain.
- UX-003: nine R1 screen specifications: account entry, create/join onboarding, dashboard, people directory, add/edit person, profile, tree, relationship editor, members/invitations.
- UX-004: design-to-engineering handoff and component/state contracts.
- Prototype v0.3 adds account entry, relationship editor and invitation acceptance; Memories is explicitly a future R2 preview, not an R1 active feature. Static fictional data only; no real auth, persistence, authorization, upload or production tree algorithm.
- Expanded all-R1-screen × four-viewport screenshot/overflow and per-screen desktop/mobile axe suite passes: [run #41339259200](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41339259200). All 40 responsive screenshots are available in [the artifact](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41339259200/artifacts/13096876295). Visual inspection found and corrected public entry/invitation shell leakage; the current screenshots show no family workspace or family name before invitation validation.
- Manual keyboard-only, screen-reader, regional-script, complex-family and all-screen visual review remain.

## Backend architecture progress

- ARCH-001 module boundaries: R1 People module contains separate identity and family-representation subdomains; cross-module contribution orchestration and audit ownership defaults are documented.
- ARCH-002 ERD: v1 identity anchor uniqueness, family-scoped tree preferences, normalized branch scopes, typed facts and explicit relationship catalog. Resolved defaults: normalized text instead of citext; no PostGIS initially; check constraints for bounded status codes; RLS mandatory.
- ARCH-003 OpenAPI: 32 unique paths and 39 operations. Duplicate relationship-path route removed; personal tree-focus endpoint and Owner/delegated Admin configured-focus authorization included. Latest Redocly 3.1 validation on backend branch passed in [run #41339554466](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41339554466). This proves parse/bundle only, not API runtime behavior.
- ARCH-004 threat model and ARCH-005 runtime operations record authorization, RLS, media, worker, backup and observability controls. Local defaults: PostgreSQL 16, MinIO and Mailpit; PostgreSQL sessions; OpenTelemetry-compatible instrumentation. Provider selection and production pooler remain deferred.
- P0 operation-level authorization test plan: `docs/architecture/P0_CONTRACT_TEST_MATRIX.md` on backend branch.

## Architecture proof evidence

The isolated POC under `poc/phase-0-proof` in PR #66 passed against PostgreSQL 16 and Prisma 6.19.0:
- Prisma schema validates and client generates.
- Direct-connection Prisma interactive transaction sets transaction-local tenant context.
- Runtime role is non-owner, non-superuser and non-BYPASSRLS; RLS fails closed without context and isolates two families.
- Global Person anchor uniqueness and composite same-family relationship FKs reject cross-family reuse/edges.
- Two concurrent opposite parentage edges serialize; exactly one commits and the other is rejected as a cycle.
- Transactional outbox rolls back with the domain transaction, deduplicates event keys, and competing workers use `FOR UPDATE SKIP LOCKED` without double-claiming.
- ERD-aligned proof passed in [run #41339408260](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41339408260); latest PR-head rerun passed in [run #41339514211](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41339514211).

POC limitations: direct PostgreSQL only (production pooler not proven); representative RLS tables only (full schema policies still need tests); pg-boss library retry/lease/singleton semantics and load/lock tests not yet proven; full migration upgrade/rollback/schema-drift tests and API handler authorization are not covered.

## Start-building decision
The project is **READY TO START R1 FOUNDATION BUILD**. The evidence, safe defaults, implementation sequence and release-only deferrals are recorded in [BUILD_READINESS.md](BUILD_READINESS.md). Begin FL-001/FL-002/FL-003/FL-008 on synthetic data. Do not use real personal/child data, enable public pages or external AI until their explicit gates are passed.

## Remaining production/release gates

1. Complete manual keyboard-only/screen-reader and Telugu/Tamil/Kannada/Hindi/mixed-script checks before release.
2. Complete production pooler proof for transaction-local RLS before production DB traffic.
3. Validate pg-boss adapter semantics and queue load/lock behavior before worker-heavy features.
4. Add full migration-from-empty, upgrade, rollback/compensating-migration and schema-drift checks.
5. Apply and test RLS/composite-FK coverage for every family-owned table; add cross-family IDOR, role/branch/record-visibility API tests as handlers are implemented.
6. Complete product/privacy operating-model decisions with counsel before real personal/child data, public publishing or external AI use.
7. Provider selection, backup/restore drill, incident runbooks and production RPO/RTO evidence before production.

## Risks

Cross-family identity correlation; parentage graph concurrency; incomplete RLS coverage; pooler context leakage; public projection revocation; living-person/minor privacy; child-data legal basis/guardian verification; media security; AI vendor retention/transfers; data-subject rights and deletion; backup/restore and succession.

## Source of truth

Meaningful changes to plan, scope, decisions, issues, branches and progress must be recorded in this repository in the same work cycle. Read this file and linked plans before resuming. Repository state overrides stale conversation memory.
