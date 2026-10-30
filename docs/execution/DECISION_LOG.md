# Decision Log

| Date | ID | Decision | Status | Reference |
|---|---|---|---|---|
| 2026-10-30 | ADR-0001 | Modular monolith | Accepted | architecture/ADR/0001 |
| 2026-10-30 | ADR-0002 | Separate Person/FamilySpace/FamilyPerson; family-scoped relationships | Accepted | architecture/ADR/0002 |
| 2026-10-30 | ADR-0003 | PostgreSQL-first graph | Accepted | architecture/ADR/0003 |
| 2026-10-30 | ADR-0004 | Explicit public projections | Accepted | architecture/ADR/0004 |
| 2026-10-30 | PROD-001 | Web-first, mixed visibility, multi-family identity, free, multilingual | Approved | product/PROJECT_CHARTER.md |
| 2026-10-30 | UX-DEC-001 | Warm neutral and evergreen visual direction; calm editorial dashboard with family-tree-centered hierarchy | Approved | ux/PRODUCT_DESIGN_PLAN.md on workstream/ux-design |

## UX-DEC-001 scope
Approval applies to the visual direction shown in the desktop/mobile dashboard review mockups. It does not approve final design tokens, every P0 screen/state, accessibility/regional-script validation, engineering handoff, or backend architecture.

| 2026-10-30 | ARCH-REC-001 | Disable cross-family global identity matching in v1; revisit only with explicit consent/privacy review | Recommended, pending ADR | architecture/ARCHITECTURE_REVIEW.md |
| 2026-10-30 | ARCH-REC-002 | SQL-first migrations; evaluate ORM against RLS/composite-FK/CTE requirements | Recommended, pending ADR | architecture/ARCHITECTURE_REVIEW.md |
| 2026-10-30 | ARCH-REC-003 | Use transactionally protected family-scoped parentage mutations | Required invariant; implementation strategy pending | architecture/ARCHITECTURE_REVIEW.md |

| 2026-10-30 | ADR-0005 | Disable cross-family identity linking in v1 | Proposed | architecture/ADR/0005 |
| 2026-10-30 | ADR-0006 | Prisma client with reviewed SQL-first migrations | Proposed | architecture/ADR/0006 |
| 2026-10-30 | ADR-0007 | PostgreSQL RLS defense in depth | Proposed | architecture/ADR/0007 |
| 2026-10-30 | ADR-0008 | PostgreSQL-backed durable jobs initially | Proposed | architecture/ADR/0008 |
