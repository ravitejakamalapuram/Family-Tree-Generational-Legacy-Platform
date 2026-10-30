# Project Status

**Last updated:** 2026-10-30  
**Stage:** Pre-implementation product design and backend architecture  
**Implementation:** Paused pending Phase 0 design/architecture approval  
**Milestone:** R1 — Working family tree  
**Default branch:** main

## State
The product, UX and architecture baselines are committed. They are not yet complete implementation handoffs. Phase 0 is now mandatory: UX-001–UX-004 and ARCH-001–ARCH-005 must be completed and jointly reviewed before application implementation begins.

The nine workstream issues are open:
- UX: #54–#57.
- Backend architecture: #58–#62.

The detailed plans are [Product Design Plan](../ux/PRODUCT_DESIGN_PLAN.md) and [Backend Architecture Plan](../architecture/BACKEND_ARCHITECTURE_PLAN.md). Draft deliverables are on their respective workstream branches and are linked from issues #54 and #58. The execution sequence and exit gate are in [Delivery Plan](DELIVERY_PLAN.md).

Canonical FL-001–FL-039 issue mappings remain in [GITHUB_TRACKING.md](GITHUB_TRACKING.md). Fourteen duplicate issue records were cross-checked and closed with GitHub's duplicate reason. FL-040–FL-104 remain in the master backlog and are not yet represented as GitHub issues. No application code or tests are claimed.

## Workstream branches
- `workstream/ux-design` — created from `main`; use for UX artifacts and design iterations.
- `workstream/backend-architecture` — created from `main`; use for backend architecture artifacts and technical decisions.

## Parked implementation branches
- `feature/fl-001-frontend-foundation` — parked; no implementation until Phase 0 approval.
- `feature/fl-002-backend-foundation` — parked; no implementation until Phase 0 approval.

## Work completed in Phase 0
- UX-001 draft v0.1 committed on `workstream/ux-design`: `docs/ux/INFORMATION_ARCHITECTURE_AND_JOURNEYS.md`. Covers sitemap, role-aware navigation, eight P0 journeys, cross-cutting states and responsive behavior. Open product questions remain; UX-001 is not Done.
- ARCH-001 draft v0.1 committed on `workstream/backend-architecture`: `docs/architecture/MODULE_BOUNDARIES.md`. Covers module ownership, dependency rules, critical workflows, transaction boundaries and open architecture decisions. Review remains pending; ARCH-001 is not Done.

## Next actions
1. Review UX-001 and ARCH-001 drafts; align domain vocabulary and priority journeys.
2. Complete UX-002/UX-003 and ARCH-002/ARCH-003.
3. Complete ARCH-004/ARCH-005 and UX-004 handoff.
4. Hold a joint design/architecture review; record decisions and explicitly approve or reject the Phase 0 exit gate.
5. Only after approval, resume FL-001/FL-002/FL-003/FL-008 implementation in dependency order.

## Risks
Shared identity privacy; complex graph correctness; public publication leakage; contribution/adoption; free-model media/AI costs; historical uncertainty/provenance; preservation/succession.

Every meaningful plan, decision, issue, branch or implementation change must update this repository's tracking/status documents in the same work cycle. Repository state overrides old conversation memory.
