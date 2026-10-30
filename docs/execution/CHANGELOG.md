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
