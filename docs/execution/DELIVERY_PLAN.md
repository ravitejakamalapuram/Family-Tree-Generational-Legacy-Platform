# Delivery Plan

Dependency-based plan; calendar/effort estimates are not committed until tasks are estimated and capacity understood.

## Phase 0 — Product design and backend architecture (mandatory gate)
Before application implementation, complete two parallel workstreams:
- UX-001–UX-004: information architecture and journeys, visual direction/design system, high-fidelity P0 screens, design-to-engineering handoff. See [Product Design Plan](../ux/PRODUCT_DESIGN_PLAN.md).
- ARCH-001–ARCH-005: domain boundaries, ERD/constraints/migrations, P0 OpenAPI, security/threat model, runtime/operations blueprint. See [Backend Architecture Plan](../architecture/BACKEND_ARCHITECTURE_PLAN.md).

UX and architecture proceed in parallel, with shared domain vocabulary and P0 user journeys reviewed together.

**Exit gate:** P0 UX flows/screens/responsive states are approved; design tokens and component handoff are implementation-ready; backend module boundaries, ERD, constraints, API contracts, authorization/security model and runtime plan are reviewed; decisions are recorded; PROJECT_STATUS explicitly authorizes implementation.

Until then, `feature/fl-001-frontend-foundation` and `feature/fl-002-backend-foundation` remain parked. Do not implement FL-001/FL-002/FL-003/FL-008 yet.

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
