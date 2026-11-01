# Delivery Plan

Dependency-based plan; calendar/effort estimates are not committed until tasks are estimated and capacity understood.

## Phase 0 — Product design and backend architecture (mandatory gate)
Before application implementation, complete two parallel workstreams:
- UX-001–UX-004: information architecture and journeys, visual direction/design system, high-fidelity P0 screens, design-to-engineering handoff. See [Product Design Plan](../ux/PRODUCT_DESIGN_PLAN.md).
- ARCH-001–ARCH-005: domain boundaries, ERD/constraints/migrations, P0 OpenAPI, security/threat model, runtime/operations blueprint. See [Backend Architecture Plan](../architecture/BACKEND_ARCHITECTURE_PLAN.md).

UX and architecture proceed in parallel, with shared domain vocabulary and P0 user journeys reviewed together.

**Start-building gate:** accepted UX/product decisions and ADRs are recorded; all nine R1 screens and journeys are specified; the interactive prototype passes automated desktop/tablet/mobile/320px and per-screen axe checks; backend module boundaries, ERD/tenant constraints, P0 OpenAPI, threat model and runtime defaults are documented; the ERD-aligned PostgreSQL/Prisma proof validates opaque identity anchors, composite same-family FKs, representative RLS, concurrent graph cycle prevention and transactional outbox semantics; BUILD_READINESS.md explicitly authorizes foundation work.

This gate is satisfied as of 2026-11-02. Begin FL-001/FL-002/FL-003/FL-008 foundation work using synthetic data only. The detailed deferred gates in BUILD_READINESS.md remain mandatory before production database traffic, real personal/child data, public publishing, AI or worker-heavy features. Manual screen-reader/regional-script review is required before release; provider/pooler and pg-boss integration are required before the affected production features ship.

The Phase 0 review PRs remain open and unmerged. Implementation branches may be stacked from the approved UX/backend workstream branches until those docs are integrated into main.

## Phase 1 — Engineering foundations
Scope FL-001–FL-008, sequenced against Phase 0 outputs. FL-001 and FL-002 establish FE/BE scaffolding; FL-003 database/migrations; FL-004 configuration; FL-005 CI; FL-006 logging; FL-007 monitoring; FL-008 implements the approved design system and responsive shell.

## R1 — Working family tree
Scope FL-001–FL-039. Create private family, people/complex relationships, ancestor/descendant tree, relationship calculation, invite member, prove tenant isolation.
Exit: five-generation scenario; same real-world person independently represented in two family spaces using separate opaque Person anchors; graph integrity; tenant isolation and authorization suite.

## R2 — Memories and collaboration
Scope FL-040–FL-057. Secure vault, multi-person tagging, stories, invitations, contribution review, audit.
Exit: media privacy, original preservation, contribution concurrency tests.

## R3 — Family life, languages, public pages
Scope FL-058–FL-078. Events, places, migration, multilingual UX, explicitly published pages.
Exit: locale tests, projection privacy suite, revoke tests.

## R4 — AI Historian
Scope FL-079–FL-087. Source-grounded Q&A, relationship explanation, biography drafts, transcription, translation, suggestions.
Exit: permission-aware retrieval, claim/source evaluation, human confirmation, provider abstraction.

## R5 — Preservation and production
Scope FL-088–FL-104. GEDCOM, full export, family books, succession, backup/recovery, quality/security/load readiness.
Exit: import/export roundtrip, restore test, archive integrity, production checklist.

Release is not complete on compilation alone; review exit criteria, tests, privacy, documentation and risks.
