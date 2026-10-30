# Working Agreements

## Product governance
- Charter decisions are baselined; a material change requires an ADR.
- Brainstorming is not committed scope until added to PRD/backlog and prioritized.
- Core tree, collaboration and export remain free unless changed through governance.
- Privacy, security, accessibility, provenance and portability are product requirements.

## Delivery governance
- Track work with stable backlog IDs FL-001 onward.
- Every implementation PR references IDs, acceptance criteria, tests and documentation.
- In progress is not done. Done requires evidence.
- Milestones are dependency-driven, not calendar promises.
- Keep PRs focused and reviewable.
- No merge without explicit repository-owner approval.

## Documentation governance
Product behavior → PRD/use cases/UX. Technical design → architecture/data/API/ADR. Delivery → backlog/status. Agent rules → AGENTS/agreements. User-visible changes → changelog. ADRs are append-only; supersede rather than rewrite.

## Definition of Ready
Clear goal/value, scope/non-goals, dependencies, testable acceptance criteria, privacy/data implications.

## Definition of Done
Acceptance criteria pass; tests updated; relevant checks pass; security/tenant isolation reviewed; docs/status updated; diff self-reviewed; no hidden blockers.

## Review checklist
Cross-family leakage? Living people/minors exposed? Original evidence preserved? Conflicts/provenance retained? Relationships family-scoped? Backend authorization enforced? Safe retries/concurrent edits? Mobile/keyboard usable? Localized correctly? Export/restore still works?
