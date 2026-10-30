# ADR-0004: Explicit Published Projections for Public Pages
- Status: Accepted
- Date: 2026-10-30

## Context
Visibility is mixed: private by default, optional public pages. A family-wide public flag cannot safely publish every person's data.

## Decision
Assemble approved content into publication snapshots/projections. Public endpoints read only those projections. Publication is field/person/media/story-specific, audited and revocable.

## Consequences
Requires publication workflow/snapshot storage but improves safety and simplifies public API.
