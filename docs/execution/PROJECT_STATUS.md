# Project Status

**Last updated:** 2026-10-30  
**Stage:** Phase 0 — UX design and backend architecture drafts  
**Implementation:** Paused pending Phase 0 approval  
**Milestone:** R1 — Working family tree  
**Default branch:** main

## State
Phase 0 is mandatory before application implementation. UX-001–UX-004 and ARCH-001–ARCH-005 have draft artifacts on their respective workstream branches. They are not approved, and none of the nine workstream issues is marked Done. FL-001, FL-002, FL-003 and FL-008 implementation remains blocked until the joint review gate is explicitly approved.

## Workstream branches
- `workstream/ux-design` — UX draft artifacts and clickable P0 prototype.
- `workstream/backend-architecture` — backend architecture draft artifacts.
- `feature/fl-001-frontend-foundation` — parked.
- `feature/fl-002-backend-foundation` — parked.

## UX progress
- UX-001 draft: `docs/ux/INFORMATION_ARCHITECTURE_AND_JOURNEYS.md`.
- UX-002 draft: `docs/ux/DESIGN_SYSTEM.md` — provisional visual direction/tokens; contrast and regional-script checks pending.
- UX-003 draft: `docs/ux/P0_SCREEN_SPECIFICATIONS.md` — nine P0 screen specs plus clickable prototype v0.1 at `docs/ux/prototype/index.html`.
- UX-004 draft: `docs/ux/DESIGN_HANDOFF.md` — component inventory, screen mapping, interaction contracts, state matrix and frontend guardrails.
- Prototype scope: dashboard, tree selection/inspector, people search, person profile, add-person form, family setup, memories and members. Static HTML/CSS/JS with fictional sample data only; no backend, auth, persistence, authorization, uploads or production graph algorithm.
- Prototype is not yet browser/device/accessibility validated. Save/Continue are intentionally non-persistent. Tree sample geometry is illustrative.
- Design issues #54–#57 remain open pending review; no UX sign-off recorded.

## Backend architecture progress
- ARCH-001 draft: `docs/architecture/MODULE_BOUNDARIES.md`.
- ARCH-002 draft: `docs/architecture/ERD_AND_SCHEMA.md`.
- ARCH-003 draft: `docs/architecture/openapi-v1.yaml` — OpenAPI validation and UX contract reconciliation outstanding.
- ARCH-004 draft: `docs/architecture/SECURITY_THREAT_MODEL.md`.
- ARCH-005 draft: `docs/architecture/RUNTIME_OPERATIONS.md`.

## Draft review pull requests
- UX design: [Draft PR #63](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/63).
- Backend architecture: [Draft PR #64](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/64).

## Review and validation status
- UX clickable prototype artifact committed on `workstream/ux-design`; not merged.
- No design/architecture sign-off yet.
- OpenAPI file has not yet been run through a validator.
- ERD/schema has not yet been reviewed against the final API contract.
- Token contrast and regional font fallback have not yet been verified in rendered UI.
- Prototype has not yet been tested across browsers/devices or with keyboard/screen readers.
- No application code, automated tests or CI execution are claimed.

## Next actions
1. Review prototype v0.1 and draft PR #63; capture product/design feedback and revise screens/tokens.
2. Complete prototype edge cases: multiple partners/parent types, blended families, unknown/disputed relationships, long names and deeper trees; add a proper accessible list alternative.
3. Run responsive, keyboard, screen-reader, contrast and regional-script QA; record evidence and decisions.
4. Review PR #64; resolve identity, schema, ORM, RLS and transaction questions.
5. Validate OpenAPI 3.1 syntax and reconcile every P0 journey with endpoint contracts.
6. Review security/runtime controls and conduct joint product/design/backend Phase 0 gate.
7. Only after explicit approval, resume FL-001/FL-002/FL-003/FL-008 in dependency order.

## Risks
Shared identity privacy; graph integrity and concurrent cycle prevention; public projection leakage/revocation; living-person/minor privacy; regional-script accessibility; media security; provider retention for AI; backup/restore and succession.

## Source of truth
Meaningful changes to plan, scope, decisions, issues, branches and progress must be recorded in this repository in the same work cycle. Read this file and the linked plans before resuming. Repository state overrides stale conversation memory.
