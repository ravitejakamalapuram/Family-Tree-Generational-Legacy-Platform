# ADR-0002: Separate Person Identity from Family Representation
- Status: Accepted
- Date: 2026-10-30

## Context
One person may belong to multiple family spaces. Each space may independently maintain display name, biography, relationships and privacy. Embedding Person inside a tree creates duplicates and leakage.

## Decision
Introduce global Person, FamilySpace, FamilyPerson and family-scoped Relationship. Relationship joins FamilyPerson records in the same space. Family facts and publication belong to that representation; do not synchronize automatically.

## Consequences
Shared identity with independent access. Identity linking/merging is sensitive and explicit, reviewed, audited. Cross-family lookup is not exposed by default.


## Scope refinement — ADR-0005 (2026-10-31)
ADR-0005 narrows this conceptual model for v1. The Person/FamilyPerson separation remains, but a Person anchor is opaque and belongs to exactly one FamilyPerson (UNIQUE(person_id)). If the same real-world person appears in another family, create a separate anchor. Cross-family identity matching, lookup, reuse and linking are disabled in v1. The broader shared-identity capability described above is deferred until consent, unlink/revocation and privacy/legal semantics are separately approved.
