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
