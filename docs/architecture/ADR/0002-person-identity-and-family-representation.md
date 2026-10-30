# ADR-0002: Separate Person Identity from Family Representation

- Status: Accepted
- Date: 2026-10-30

## Context
One person may belong to multiple family spaces. Each space may independently maintain display name, biography, relationships and privacy. Embedding Person inside a tree creates duplicates and privacy leakage.

## Decision
Introduce global Person, FamilySpace, FamilyPerson and family-scoped Relationship. Relationship joins FamilyPerson records in the same space. Family facts and publication belong to that representation; do not synchronize automatically.

## Consequences
Shared identity with independent access. Identity linking/merging is sensitive and explicit, reviewed, audited. Cross-family lookup is not exposed by default.
