# ADR-0005: Disable cross-family identity linking in v1

**Status:** Proposed — requires product/privacy approval
**Date:** 2026-10-30

## Context
The domain model separates global Person identity from family-scoped FamilyPerson representation. Reusing one global Person across multiple family spaces can reveal that two otherwise independent families refer to the same living person, enable cross-family correlation, and create difficult consent/deletion semantics. A global identity search is especially risky for minors and private family spaces.

## Decision
For v1, do not match, reuse, search or link Person identity anchors across different FamilySpace records. Create a distinct opaque Person anchor for each FamilyPerson representation. Keep Person free of family biography, dates, contact information, sources, visibility and public fields. Duplicate suggestions are scoped to the active family and advisory only.

A future cross-family linking feature requires explicit informed consent from authorized participants, a privacy threat review, unlink/revocation semantics, and product/legal approval.

## Consequences
- Stronger default isolation and simpler family deletion/export behavior.
- No cross-family deduplication or shared identity convenience in v1.
- The Person/FamilyPerson separation remains useful for future evolution without implying cross-family matching.
- Database constraints and application tests must prevent attaching an existing Person anchor from another family.

## Alternatives considered
1. Enable global matching but hide search results — rejected because linkage itself leaks relationship information.
2. Allow only manual cross-family linking — deferred; consent and revocation semantics are not yet designed.
3. Remove the Person anchor entirely — possible simplification, but would amend the accepted identity boundary and is not required to achieve v1 isolation.

## Revisit trigger
A concrete user need for a person to participate in multiple family spaces, with consent and unlinking requirements designed and reviewed.
