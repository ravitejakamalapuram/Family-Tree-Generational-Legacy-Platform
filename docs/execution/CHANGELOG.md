# Changelog

## 2026-10-30 — Project foundation
- Established vision and approved decisions.
- Added PRD, use cases, UX, architecture, data/API/security.
- Added four accepted ADRs.
- Added delivery plan and FL-001–FL-104 backlog.
- Added status and future-session handoff rules.
- Documentation only; no application implementation included.

## 2026-10-30 — Design-first execution plan
- Reordered execution: UX design and backend architecture are mandatory Phase 0 gates before FE/BE/database implementation.
- Added UX-001–UX-004 and ARCH-001–ARCH-005 GitHub workstreams.
- Created UX and backend architecture workstream branches; parked FL-001/FL-002 implementation branches.
- Added draft UX artifacts and backend module boundaries, ERD/schema, OpenAPI, security and runtime/operations documents.
- Opened documentation-only draft review PRs #63 (UX) and #64 (backend architecture); neither is approved or merged.
- Recorded open validation and review gates; no application implementation or sign-off claimed.

## 2026-10-30 — Clickable P0 prototype v0.1
- Added `docs/ux/prototype/index.html` on `workstream/ux-design`, with representative dashboard, family tree, people, profile, add-person, onboarding, memories and members screens.
- Added prototype usage/limitations README and mapped prototype coverage into P0 screen specifications and engineering handoff.
- Explicitly documented static-only behavior: fictional sample data, no API/auth/persistence/authorization/uploads, and no production genealogy layout engine.
- Prepared browser-rendered desktop/mobile dashboard review snapshots for product feedback. These are visual review aids, not hosted preview links or completed QA evidence.
- Updated UX workstream plan, project status and changelog. PR #63 remains draft. Product review and accessibility/regional-script QA remain pending; no PR merged and no production application implementation started.

## 2026-10-30 — UX visual direction approved
- Product owner reviewed the desktop/mobile dashboard visual direction and asked the team to proceed.
- Recorded approval for warm neutral surfaces, evergreen accents, calm editorial styling, clear family-space context and a family-tree-centered information hierarchy.
- Updated the UX workstream plan and project status. Token-level contrast/regional-script checks, complete P0 screen validation, accessibility QA and engineering handoff remain open.
- Backend architecture review and the overall Phase 0 gate remain open. No implementation branch resumed and no PR merged.


## 2026-10-30 — UX prototype v0.2
- Applied the approved visual direction across the UX workstream documentation.
- Added a semantic people-list alternative to the family tree prototype, including selection synchronization with the visual tree and an explicit unknown-parent placeholder.
- Added visible keyboard-focus styling to primary prototype controls.
- Updated P0 screen and engineering handoff notes. Accessibility behavior is implemented as a design prototype but still requires keyboard and screen-reader QA.
- Phase 0 remains open; backend architecture has not been approved and no production implementation has started.


## 2026-10-30 — Backend architecture review pass
- Reconciled OpenAPI v1 with P0 auth, family invitation/membership, people/facts and relationship correction flows.
- Added cookie-session CSRF synchronizer-token contract, exact-origin/CORS guidance and idempotency-key requirements.
- Standardized date assertions to represent ranges, approximate values and unknown precision.
- Added an architecture review report with remaining schema, identity privacy, ORM/RLS, graph concurrency, jobs and recovery decisions.
- Performed structural OpenAPI checks (unique path keys and response blocks); full OpenAPI 3.1 parser/validator and CI contract tests remain outstanding.
- PR #64 remains draft/unmerged; Phase 0 approval and production implementation remain blocked.

## 2026-10-30 — OpenAPI validation automation
- Added a pinned Redocly bundle-validation workflow on the backend architecture branch, triggered by OpenAPI/validator changes.
- The workflow is committed but no successful run is visible yet; validation remains pending.

## 2026-10-30 — Keyboard-accessible tree prototype
- Made SVG person nodes focusable with accessible labels and selected state; Enter/Space now select a node.
- Synchronized selected state with the semantic list alternative and added an announced selected-person summary.
- Updated design handoff and product design plan. Keyboard/screen-reader testing remains outstanding.

## 2026-10-30 — OpenAPI validation feedback
- First Redocly run found a duplicate YAML mapping in the family creation operation.
- Merged the CSRF and idempotency parameter references into one valid parameters list and committed the correction.
- Follow-up validation run #5 is in progress; do not treat OpenAPI as validated until it passes.

## 2026-10-30 — Prototype validation automation
- Added a GitHub Actions check to extract inline prototype JavaScript and run Node syntax validation on relevant UX prototype changes.
- First validation run is queued; no pass is claimed yet.

## 2026-10-30 — Validation fixes and passing checks
- Fixed duplicate YAML mapping keys in family create, family patch and person patch operations; moved ErrorEnvelope into the OpenAPI schemas component.
- Redocly CLI 1.34.5 successfully bundled OpenAPI 3.1 in GitHub Actions run 41003090188.
- Fixed literal escaped line breaks in the prototype's inline JavaScript and simplified the syntax-check workflow extraction.
- Prototype inline JavaScript syntax check passes in GitHub Actions run 41002983442. Browser, keyboard and screen-reader QA remain open.

## 2026-10-30 — P0 API coverage expansion
- Added family dashboard, tree search, ancestor/descendant and branch-list endpoints to the OpenAPI contract and reconciled API_DESIGN.md.
- Strengthened ERD tenant-scope design with normalized membership/invitation branch-scope join tables, family-scoped association constraints and temporal checks.
- Redocly CLI 1.34.5 passed OpenAPI bundling after the latest additions: 32 unique paths and 39 operations in run 41003237580.
- API contract integration tests, complete journey mapping and remaining ADR decisions are still open.

## 2026-10-30 — Proposed backend ADRs
- Added ADR-0005: disable cross-family identity linking in v1 (Proposed).
- Added ADR-0006: Prisma with reviewed SQL-first migrations (Proposed).
- Added ADR-0007: PostgreSQL RLS as defense in depth (Proposed).
- Added ADR-0008: PostgreSQL-backed durable jobs for initial release (Proposed).
- Indexed proposals and linked them from the architecture review. None is marked Accepted; implementation remains gated on explicit review.

## 2026-10-30 — Proposed UX product decisions
- Added UX-DEC-002–UX-DEC-006 proposals for first-person/root behavior, default tree focus, publication review, Viewer/public visitor boundaries and design-system implementation defaults.
- Linked proposals from IA and product design plan. They remain Proposed and require product-owner approval before UX-001/UX-002 sign-off or publication behavior implementation.


## 2026-10-31 — Phase 0 product and architecture defaults approved
- Product owner approved UX-DEC-002–UX-DEC-006: no assumed genealogical root, deterministic tree-entry focus, private-by-default publication with heightened consent/review safeguards, strict Viewer/public projection separation, and design-system implementation defaults.
- Product owner approved the direction recorded in ADR-0005–0008: v1 cross-family identity isolation, Prisma with reviewed SQL-first migrations, PostgreSQL RLS defense in depth, and PostgreSQL-backed durable jobs.
- Updated the UX workstream decisions, IA/design plan, architecture ADRs and architecture review; updated the main decision log and project status.
- Approval selects product and technical direction only. It does not constitute UX handoff sign-off, legal/privacy approval, technical proof, security validation or joint Phase 0 approval.
- Next: complete cross-workstream contract review, accessibility/browser QA, threat-model-to-test mapping and technical proof of the accepted architecture choices. No implementation branches resumed and no PR merged.


## 2026-10-31 — Phase 0 cross-workstream contract review
- Tightened ADR-0005 enforcement in the ERD: v1 Person identity anchors are opaque and unique across all FamilyPerson rows, preventing reuse across family spaces.
- Added family-configured tree focus and per-member last-focused-person persistence to the ERD; added PUT /families/{familyId}/tree/focus to OpenAPI and API_DESIGN.
- Removed the duplicate relationship-path endpoint from OpenAPI; retained one canonical family relationship-path route.
- Added docs/architecture/PHASE_0_CROSS_REVIEW.md with P0 journey-to-contract mapping, review findings and blocking validation gates.
- Redocly CLI 1.34.5 passed after the route/focus contract changes: run 41179809644. The contract remains 32 paths and 39 operations.
- UX prototype syntax validation also passes: run 41179691052. Browser, responsive, keyboard, screen-reader, contrast and regional-script QA remain outstanding.
- PRs #63 and #64 remain draft/unmerged; implementation branches remain parked pending complete Phase 0 sign-off.


## 2026-10-31 — Automated prototype browser and accessibility QA
- Added Playwright/Chromium QA for desktop (1440px), tablet (768px), mobile (390px) and small-mobile (320px) viewports, including horizontal-overflow checks, navigation/search/tree keyboard/list/form smoke tests, axe WCAG scans and screenshot artifacts.
- Initial runs exposed a test-navigation issue and a muted-text contrast ratio of 4.49:1. Corrected the test flow and darkened the semantic muted-text token; the subsequent axe scan and browser suite passed.
- Latest passing run: #41180347724. It uploaded desktop/tablet/mobile/small-mobile screenshots as the prototype-browser-qa-screenshots artifact.
- Reviewed generated desktop/mobile screenshots and adjusted mobile page-header stacking and Add button wrapping.
- Automated checks do not replace full keyboard-only, screen-reader, all-screen, complex-family or regional-script QA.

## 2026-10-31 — Final P0 OpenAPI focus authorization update
- Added Owner/delegated Admin authorization guidance and configuredTreeFocusPersonId to PATCH /families/{familyId}.
- Redocly CLI 1.34.5 passed the final 32-path, 39-operation OpenAPI 3.1 bundle: run #41180375558.
- Added operation-level authorization and negative-test plan in docs/architecture/P0_CONTRACT_TEST_MATRIX.md.


## 2026-11-02 — R1 build-readiness gate satisfied
- Expanded the UX prototype to cover account entry, onboarding, dashboard, people directory, add/edit person, profile, tree, relationship editor, member directory and invitation acceptance. Memories is explicitly a non-functional R2 preview, not an active R1 navigation item.
- Corrected the public-entry and pre-validation invitation states so they do not display authenticated family navigation, family workspace labels or family names before invitation validation.
- Expanded Playwright/axe QA to capture all R1 screens at 1440px, 768px, 390px and 320px; check horizontal overflow; exercise key flows; and run per-screen axe scans at desktop/mobile. Pass: run #41339259200; 40 screenshot artifact: https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41339259200/artifacts/13096876295.
- Visually inspected the generated screen contact sheet and auth/invitation/dashboard/relationship states; fixed the authenticated-shell leakage found in the first screenshot pass.
- Aligned the isolated PostgreSQL/Prisma proof schema to production ERD relationship columns and relationship type catalog. The suite proves identity-anchor uniqueness, same-family composite FKs, RLS fail-closed/two-family isolation, Prisma transaction-local context, concurrent graph-cycle prevention, transactional outbox rollback/dedupe and competing SKIP LOCKED claims. ERD-aligned pass #41339408260; latest PR-head rerun #41339514211.
- Added table-by-table schema constraint/RLS audit and India DPDP/privacy/child-data readiness baseline.
- Reconciled ADR-0002/0005, PRODUCT_REQUIREMENTS, DATA_MODEL, BACKLOG FL-018 and DELIVERY_PLAN with v1 opaque identity anchors.
- Added BUILD_READINESS.md and marked the R1 foundation start gate satisfied. FL-001/FL-002/FL-003/FL-008 may begin on synthetic data. Pooler, pg-boss, full-schema RLS/migration, manual accessibility/regional scripts, privacy counsel, provider, backup/restore and production controls remain release/feature gates.
- PRs #63, #64 and #66 remain draft and unmerged; PR #65 closed as superseded by clean main-based PR #66. No production implementation or real personal data processing has begun.


## 2026-11-02 — Final UX current-head revalidation and release-scope reconciliation
- Re-ran inline JavaScript syntax validation and all-R1-screen Playwright/axe checks on the current UX PR head after updating the prototype README: [browser run #41340010653](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41340010653); [40-screen screenshot artifact](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41340010653/artifacts/13096817898).
- Visual review confirms public account entry and pre-validation invitation screens do not show authenticated family navigation, workspace name or family details. Verified invitation details are a separate simulated post-validation state.
- Reconciled IA, Product Requirements, Use Cases and Backlog so R1 is family/tree/people/relationships/member invitations; media/memories and contribution review are R2; events/places/public pages R3; AI R4; preservation R5. First-person creation remains optional.
- Updated BUILD_READINESS.md evidence and retained manual accessibility, legal, provider/pooler, full schema RLS/migration, pg-boss and production operations as explicit release/feature gates.
