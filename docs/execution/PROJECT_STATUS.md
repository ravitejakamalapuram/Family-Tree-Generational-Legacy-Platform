# Project Status

**Last updated:** 2026-11-02
**Stage:** Phase 0 — technical proof and final readiness validation
**Implementation:** Paused pending complete Phase 0 approval
**Milestone:** R1 — Working family tree
**Default branch:** main

## State
The product owner approved the UX visual direction and UX-DEC-002–UX-DEC-006 defaults, plus ADR-0005–0008 direction, on 2026-10-31. The user has authorized autonomous continuation through readiness. Phase 0 remains open until technical proof, remaining UX review, risk/operational decisions and a documented build-readiness checklist are complete.

## Workstream branches
- `workstream/ux-design` — UX draft artifacts and clickable P0 prototype.
- `workstream/backend-architecture` — backend architecture draft artifacts.
- `feature/fl-001-frontend-foundation` — parked.
- `feature/fl-002-backend-foundation` — parked.

## UX progress
- UX-001 draft: `docs/ux/INFORMATION_ARCHITECTURE_AND_JOURNEYS.md`; accepted product defaults UX-DEC-002–UX-DEC-006 are documented in `docs/ux/PRODUCT_DECISIONS.md` on the UX branch.
- UX-002: visual direction approved; design tokens remain provisional pending contrast and regional-script validation. See `docs/ux/DESIGN_SYSTEM.md` on UX branch.
- UX-003 draft: `docs/ux/P0_SCREEN_SPECIFICATIONS.md` — nine P0 screen specs plus clickable prototype v0.2 at `docs/ux/prototype/index.html`.
- UX-004 draft: `docs/ux/DESIGN_HANDOFF.md` — component inventory, screen mapping, interaction contracts, state matrix and frontend guardrails.
- Prototype scope: dashboard, tree selection/inspector, people search, person profile, add-person form, family setup, memories and members. Static HTML/CSS/JS with fictional sample data only; no backend, auth, persistence, authorization, uploads or production graph algorithm.
- Desktop/mobile dashboard review mockups were reviewed and the visual direction approved on 2026-10-30. They are visual review aids, not hosted app screenshots or proof of full prototype QA.
- Tree geometry remains illustrative. Latest Playwright/axe browser QA passes on commit `aa4600e06750ffe5fb6f4e41fa3fa54c0dab72cc`: [browser QA run #41180439258](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41180439258), [syntax run #41180439232](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41180439232). The suite checks desktop/tablet/mobile/320px viewports, horizontal overflow, representative navigation/search/tree/form flows and axe WCAG scans. Full manual screen-reader, keyboard-only, regional-script, complex-family and all-screen visual review remain open.
- Design issues #54–#57 remain open; do not mark UX work complete based solely on visual-direction approval.

## Backend architecture progress
- ARCH-001 draft: `docs/architecture/MODULE_BOUNDARIES.md`.
- ARCH-002 draft: `docs/architecture/ERD_AND_SCHEMA.md`.
- ARCH-003 draft: `docs/architecture/openapi-v1.yaml` — expanded to cover P0 auth/CSRF, invitations/memberships, people/facts and relationship corrections; structural checks passed (27 unique paths, 34 operations with response blocks), and a pinned Redocly bundle-validation workflow has been added; no successful workflow run is available yet.
- Architecture review: `docs/architecture/ARCHITECTURE_REVIEW.md` and `docs/architecture/PHASE_0_CROSS_REVIEW.md` on `workstream/backend-architecture` record cross-workstream findings, accepted defaults and remaining proof gates.
- ARCH-004 draft: `docs/architecture/SECURITY_THREAT_MODEL.md`.
- ARCH-005 draft: `docs/architecture/RUNTIME_OPERATIONS.md`.

## Draft review pull requests
- UX design: [Draft PR #63](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/63).
- Backend architecture: [Draft PR #64](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/pull/64).

## Review and validation status
- UX visual direction approved; complete design system, P0 screen, accessibility and engineering handoff approval remain outstanding.
- UX clickable prototype v0.2 committed on `workstream/ux-design`; includes a semantic list alternative and keyboard-selectable SVG person nodes. Playwright/axe browser QA passes at 1440px, 768px, 390px and 320px, including no-horizontal-overflow checks and key interaction smoke tests (run 41180347724); screenshot artifact is attached to the run. This is not full manual screen-reader or all-screen QA. Not merged.
- ADR-0005–0008 are Accepted direction (not proof): v1 cross-family identity isolation, Prisma/SQL-first migrations, PostgreSQL RLS and PostgreSQL-backed durable jobs. The technical proof is now the critical remaining gate.
- OpenAPI workflow has passed repeatedly; latest successful run is #41180443225 on the current backend workstream head. It validates parse/bundle only, not runtime handlers or authorization.
- Cross-review found and corrected a v1 identity-anchor constraint gap: ERD now requires UNIQUE(person_id) so an opaque Person anchor cannot be reused across families. Added personal last-focus persistence and family-configured focus to the ERD; OpenAPI now includes PUT /families/{familyId}/tree/focus and Owner/Admin family-focus authorization. Removed a duplicate relationship-path route.
- No production application implementation is claimed. A focused architecture proof-of-concept is being prepared separately from the product implementation.

## Next actions
1. Complete manual review of all P0 screens and complex genealogy cases, long names and deep trees; the automated browser suite currently covers representative flows and viewport smoke checks.
2. Complete full keyboard-only and screen-reader review, regional-script review, and the complete token/control contrast matrix.
3. Turn the P0 contract matrix into executable API tests once the application foundation exists; prioritize cross-family IDOR, role/branch visibility, CSRF, invitation replay and graph concurrency.
4. Run the isolated proof-of-concept for Prisma, composite-FK, RLS transaction context/pooler isolation, concurrent graph writes and durable-job idempotency.
5. Resolve retention/deletion, provider, backup/RPO/RTO and operational ownership.
6. Produce a final build-readiness report with explicit pass/fail/deferred gates, implementation sequence and residual risks; then begin FL-001/FL-002/FL-003/FL-008 without merging the Phase 0 review PRs unless separately requested.


## Risks
Shared identity privacy; graph integrity and concurrent cycle prevention; public projection leakage/revocation; living-person/minor privacy; regional-script accessibility; media security; provider retention for AI; backup/restore and succession.

## Source of truth
Meaningful changes to plan, scope, decisions, issues, branches and progress must be recorded in this repository in the same work cycle. Read this file and the linked plans before resuming. Repository state overrides stale conversation memory.
