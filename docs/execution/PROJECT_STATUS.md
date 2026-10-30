# Project Status

**Last updated:** 2026-10-30  
**Stage:** Product definition and R1 execution planning  
**Implementation:** Not started  
**Milestone:** R1 — Working family tree  
**Default branch:** main

## State
Product/UX/architecture baseline is committed. Canonical GitHub issues FL-001–FL-039 are indexed in [GITHUB_TRACKING.md](GITHUB_TRACKING.md). All canonical issues are open and Not Started. During issue creation, the GitHub integration partially completed a batch before returning an error, resulting in duplicate issue records for some FL IDs; the tracking index identifies canonical issues. Duplicate records have not been closed pending owner confirmation. FL-040–FL-104 remain in the master backlog and are not yet represented as GitHub issues. No application code or tests are claimed.

## Next actions
1. Review and reconcile duplicate issue records; close confirmed duplicates.
2. Configure repository labels and milestone grouping (not yet configured).
3. Review R1 issue dependencies and acceptance criteria.
4. Start FL-001 and FL-002 on focused feature branches.
5. Complete FL-003/FL-004, then CI FL-005.
6. Implement auth/family spaces.
7. Implement Person/FamilyPerson and relationship integrity before tree UI.

## Risks
Shared identity privacy; complex graph correctness; public publication leakage; contribution/adoption; free-model media/AI costs; historical uncertainty/provenance; preservation/succession.

Every implementation PR updates this file with completed IDs, evidence, checks, blockers, milestone and next actions. Repository state overrides old conversation memory.
