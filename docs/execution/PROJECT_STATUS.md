# Project Status

**Last updated:** 2026-10-30  
**Stage:** Product definition and R1 execution planning  
**Implementation:** Foundation branches created; implementation not started  
**Milestone:** R1 — Working family tree  
**Default branch:** main

## State
Product/UX/architecture baseline is committed. Canonical GitHub issues FL-001–FL-039 are indexed in [GITHUB_TRACKING.md](GITHUB_TRACKING.md). All canonical issues are open and Not Started. During issue creation, the GitHub integration partially completed a batch before returning an error, resulting in duplicate issue records for some FL IDs; the tracking index identifies canonical issues. Fourteen duplicate records have been cross-checked and closed with GitHub's duplicate reason. FL-040–FL-104 remain in the master backlog and are not yet represented as GitHub issues. No application code or tests are claimed.

## Current execution branches
- `feature/fl-001-frontend-foundation` — created from `main`; FL-001 implementation not yet started.
- `feature/fl-002-backend-foundation` — created from `main`; FL-002 implementation not yet started.

## Next actions
1. Configure repository labels and the R1 milestone. The current GitHub integration exposes issue-label assignment but no label-creation or milestone-creation action; neither has been configured.
2. Implement FL-001 and FL-002 independently on their feature branches.
3. Complete FL-003/FL-004, then CI FL-005.
4. Implement auth/family spaces.
5. Implement Person/FamilyPerson and relationship integrity before tree UI.

## Risks
Shared identity privacy; complex graph correctness; public publication leakage; contribution/adoption; free-model media/AI costs; historical uncertainty/provenance; preservation/succession.

Every implementation PR updates this file with completed IDs, evidence, checks, blockers, milestone and next actions. Repository state overrides old conversation memory.
