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
