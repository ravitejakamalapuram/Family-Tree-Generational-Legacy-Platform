# Project Status

**Last updated:** 2026-10-30
**Stage:** Phase 0 — UX design and backend architecture
**Implementation:** Paused pending complete Phase 0 approval
**Milestone:** R1 — Working family tree
**Default branch:** main

## State
The product owner has approved the UX visual direction after reviewing desktop/mobile dashboard review mockups: warm neutral surfaces, evergreen accents, calm editorial styling, clear family-space context, and a family-tree-centered hierarchy. This is a meaningful design decision, but it is not approval of all UX artifacts or the backend architecture. Phase 0 remains open; application implementation remains gated until UX handoff and backend architecture receive explicit approval.

## Workstream branches
- `workstream/ux-design` — UX draft artifacts and clickable P0 prototype.
- `workstream/backend-architecture` — backend architecture draft artifacts.
- `feature/fl-001-frontend-foundation` — parked.
- `feature/fl-002-backend-foundation` — parked.

## UX progress
- UX-001 draft: `docs/ux/INFORMATION_ARCHITECTURE_AND_JOURNEYS.md`.
- UX-002: visual direction approved; design tokens remain provisional pending contrast and regional-script validation. See `docs/ux/DESIGN_SYSTEM.md` on UX branch.
- UX-003 draft: `docs/ux/P0_SCREEN_SPECIFICATIONS.md` — nine P0 screen specs plus clickable prototype v0.2 at `docs/ux/prototype/index.html`.
- UX-004 draft: `docs/ux/DESIGN_HANDOFF.md` — component inventory, screen mapping, interaction contracts, state matrix and frontend guardrails.
- Prototype scope: dashboard, tree selection/inspector, people search, person profile, add-person form, family setup, memories and members. Static HTML/CSS/JS with fictional sample data only; no backend, auth, persistence, authorization, uploads or production graph algorithm.
- Desktop/mobile dashboard review mockups were reviewed and the visual direction approved on 2026-10-30. They are visual review aids, not hosted app screenshots or proof of full prototype QA.
- Tree geometry remains illustrative. Keyboard/screen-reader, contrast, regional-script and cross-browser QA remain open. A prototype inline-JavaScript syntax workflow passes (run 41002983442). Browser, responsive and assistive-technology QA remain outstanding.
- Design issues #54–#57 remain open; do not mark UX work complete based solely on visual-direction approval.

## Backend architecture progress
- ARCH-001 draft: `docs/architecture/MODULE_BOUNDARIES.md`.
- ARCH-002 draft: `docs/architecture/ERD_AND_SCHEMA.md`.
- ARCH-003 draft: `docs/architecture/openapi-v1.yaml` — expanded to cover P0 auth/CSRF, invitations/memberships, people/facts and relationship corrections; structural checks passed (27 unique paths, 34 operations with response blocks), and a pinned Redocly bundle-validation workflow has been added; no successful workflow run is available yet.
- Architecture review: `docs/architecture/ARCHITECTURE_REVIEW.md` on `workstream/backend-architecture` records contract fixes, privacy recommendations and unresolved ADR decisions.
- ARCH-004 draft: `docs/architecture/SECURITY_THREAT_MODEL.md`.
- ARCH-005 draft: `docs/architecture/RUNTIME_OPERATIONS.md`.

## Draft review pull requests
- UX design: [Draft PR #63](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/63).
- Backend architecture: [Draft PR #64](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/64).

## Review and validation status
- UX visual direction approved; complete design system, P0 screen, accessibility and engineering handoff approval remain outstanding.
- UX clickable prototype v0.2 committed on `workstream/ux-design`; includes a semantic list alternative and keyboard-selectable SVG person nodes. Not merged.
- Backend architecture review pass completed; no backend architecture sign-off yet. ORM, cross-family identity linking, RLS/pooler, branch scope, graph concurrency and job queue choices remain to be resolved.
- OpenAPI structural checks completed; Redocly CI workflow added; first runs caught duplicate YAML mappings and a misplaced ErrorEnvelope schema; fixes were applied and Redocly CLI 1.34.5 successfully bundled the expanded OpenAPI 3.1 document (32 paths, 39 operations) in run 41003237580.
- ERD/schema has not yet been reviewed against the final API contract.
- No application code, automated tests or CI execution are claimed.

## Next actions
1. Apply the approved visual direction consistently across the P0 screen specifications and prototype; refine tree prominence and mobile navigation without changing the approved design language.
2. Complete prototype edge cases: multiple partners/parent types, blended families, unknown/disputed relationships, long names and deeper trees; verify the newly added accessible list alternative and keyboard tree selection.
3. Run responsive, keyboard, screen-reader, contrast and regional-script QA; record evidence and decisions.
4. Review PR #64 and `docs/architecture/ARCHITECTURE_REVIEW.md`; resolve identity, schema, ORM, RLS and transaction questions.
5. Obtain a successful Redocly OpenAPI 3.1 validation run and reconcile every P0 journey with endpoint contracts.
6. Review security/runtime controls and conduct joint product/design/backend Phase 0 gate.
7. Only after explicit approval, resume FL-001/FL-002/FL-003/FL-008 in dependency order.

## Risks
Shared identity privacy; graph integrity and concurrent cycle prevention; public projection leakage/revocation; living-person/minor privacy; regional-script accessibility; media security; provider retention for AI; backup/restore and succession.

## Source of truth
Meaningful changes to plan, scope, decisions, issues, branches and progress must be recorded in this repository in the same work cycle. Read this file and the linked plans before resuming. Repository state overrides stale conversation memory.
