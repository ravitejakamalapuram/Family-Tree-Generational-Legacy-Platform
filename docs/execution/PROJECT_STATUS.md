# Project Status

**Last updated:** 2026-10-30  
**Stage:** Phase 0 — UX design and backend architecture drafts  
**Implementation:** Paused pending Phase 0 approval  
**Milestone:** R1 — Working family tree  
**Default branch:** main

## State
Phase 0 is mandatory before application implementation. UX-001–UX-004 and ARCH-001–ARCH-005 have draft artifacts on their respective workstream branches. They are not approved, and none of the nine workstream issues is marked Done. FL-001, FL-002, FL-003 and FL-008 implementation remains blocked until the joint review gate is explicitly approved.

## Workstream branches
- `workstream/ux-design` — UX draft artifacts.
- `workstream/backend-architecture` — backend architecture draft artifacts.
- `feature/fl-001-frontend-foundation` — parked.
- `feature/fl-002-backend-foundation` — parked.

## UX progress
- UX-001 draft: `docs/ux/INFORMATION_ARCHITECTURE_AND_JOURNEYS.md` — sitemap, role-aware navigation, eight P0 journeys, responsive behavior and open product questions.
- UX-002 draft: `docs/ux/DESIGN_SYSTEM.md` — proposed visual direction, provisional tokens, components, family-tree visual language and accessibility checklist.
- UX-003 draft: `docs/ux/P0_SCREEN_SPECIFICATIONS.md` — nine P0 screen layouts, responsive hierarchy, interactions, states and tree edge cases. A clickable prototype/reviewable visual artifact is still required.
- UX-004 draft: `docs/ux/DESIGN_HANDOFF.md` — component inventory, screen mapping, interaction contracts, state matrix and frontend guardrails.

## Backend architecture progress
- ARCH-001 draft: `docs/architecture/MODULE_BOUNDARIES.md` — module ownership, dependencies, workflow boundaries and open decisions.
- ARCH-002 draft: `docs/architecture/ERD_AND_SCHEMA.md` — logical ERD, entities, constraints, tenant isolation, indexes and migration strategy.
- ARCH-003 draft: `docs/architecture/openapi-v1.yaml` — initial P0 auth/family/people/relationship/tree/health API contract. OpenAPI validation and UX contract reconciliation remain outstanding.
- ARCH-004 draft: `docs/architecture/SECURITY_THREAT_MODEL.md` — threat scenarios, authorization matrix and security controls.
- ARCH-005 draft: `docs/architecture/RUNTIME_OPERATIONS.md` — topology, environments, jobs, observability, testing, deployment and recovery.

## Draft review pull requests
- UX design: [Draft PR #63](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/63).
- Backend architecture: [Draft PR #64](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/64).

## Review and validation status
- Draft artifacts committed to their workstream branches.
- No design/architecture sign-off yet.
- OpenAPI file has not yet been run through a validator.
- ERD/schema has not yet been reviewed against the final API contract.
- Token contrast and regional font fallback have not yet been verified in rendered UI.
- No application code, automated tests or CI execution are claimed.

## Next actions
1. Review draft PRs #63 and #64; resolve UX-001/UX-002/UX-003 product decisions and create/review clickable P0 prototype.
2. Review ARCH-001/ARCH-002 and resolve identity, schema, ORM, RLS and transaction questions.
3. Validate OpenAPI 3.1 syntax and reconcile every P0 journey with endpoint contracts.
4. Review ARCH-004/ARCH-005 threat controls, provider choices and operational targets.
5. Joint product/design/backend review; record decisions and explicitly approve or reject Phase 0.
6. Only after approval, resume FL-001/FL-002/FL-003/FL-008 in dependency order.

## Risks
Shared identity privacy; graph integrity and concurrent cycle prevention; public projection leakage/revocation; living-person/minor privacy; regional-script accessibility; media security; provider retention for AI; backup/restore and succession.

## Source of truth
Meaningful changes to plan, scope, decisions, issues, branches and progress must be recorded in this repository in the same work cycle. Read this file and the linked plans before resuming. Repository state overrides stale conversation memory.
