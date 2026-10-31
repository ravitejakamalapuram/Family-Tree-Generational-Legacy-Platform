# Project Status

**Last updated:** 2026-10-31
**Stage:** Phase 0 — cross-review and validation
**Implementation:** Paused pending complete Phase 0 approval
**Milestone:** R1 — Working family tree
**Default branch:** main

## State
The product owner has approved the UX visual direction and UX-DEC-002–UX-DEC-006 defaults, and approved the direction in ADR-0005–0008 on 2026-10-31. This selects product/technical direction but is not final UX handoff sign-off, proof that architecture works, legal/privacy approval, or the joint Phase 0 gate. Phase 0 remains open; production implementation remains gated.

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
- Tree geometry remains illustrative. Keyboard/screen-reader, contrast, regional-script and cross-browser QA remain open. A prototype inline-JavaScript syntax workflow passes (run 41002983442). Browser, responsive and assistive-technology QA remain outstanding.
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
- UX clickable prototype v0.2 committed on `workstream/ux-design`; includes a semantic list alternative and keyboard-selectable SVG person nodes. Not merged.
- Backend architecture review pass completed; proposed ADRs 0005–0008 now cover v1 cross-family identity isolation, Prisma/SQL-first migrations, PostgreSQL RLS and PostgreSQL-backed jobs. They remain Proposed; no backend architecture sign-off yet.
- OpenAPI structural checks completed; Redocly CI workflow added; first runs caught duplicate YAML mappings and a misplaced ErrorEnvelope schema; fixes were applied and Redocly CLI 1.34.5 successfully bundled the revised OpenAPI 3.1 document after duplicate-route consolidation and tree-focus persistence (32 paths, 39 operations) in run 41179809644.
- Cross-review found and corrected a v1 identity-anchor constraint gap: ERD now requires UNIQUE(person_id) so an opaque Person anchor cannot be reused across families. Added personal last-focus persistence and family-configured focus to the ERD; OpenAPI now includes PUT /families/{familyId}/tree/focus. Removed a duplicate relationship-path route.
- No application code, automated tests or CI execution are claimed.

## Next actions
1. Complete P0 screen and prototype browser/device review, including complex genealogy cases, long names and deep trees.
2. Run keyboard-only, screen-reader, contrast and regional-script QA; record reproducible evidence.
3. Map each P0 journey to API operations and add negative role/branch/visibility/tenant contract tests.
4. Review PR #64, `docs/architecture/ARCHITECTURE_REVIEW.md` and proposed ADRs 0005–0008; obtain privacy/product and engineering decisions before implementation.
5. Resolve retention/deletion, provider, backup/RPO/RTO and operational ownership.
6. Conduct joint product/design/backend Phase 0 gate; only after explicit sign-off, resume FL-001/FL-002/FL-003/FL-008 in dependency order.


## Risks
Shared identity privacy; graph integrity and concurrent cycle prevention; public projection leakage/revocation; living-person/minor privacy; regional-script accessibility; media security; provider retention for AI; backup/restore and succession.

## Source of truth
Meaningful changes to plan, scope, decisions, issues, branches and progress must be recorded in this repository in the same work cycle. Read this file and the linked plans before resuming. Repository state overrides stale conversation memory.
