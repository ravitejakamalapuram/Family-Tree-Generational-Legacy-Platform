# Family Legacy

**Family Tree & Generational Legacy Platform**  
India-first · Global-ready · Web-first · Free initial product

Family Legacy is a private-by-default, collaborative family knowledge platform for documenting ancestry, maintaining relationships, preserving photographs and stories, organizing family events, and passing family knowledge to future generations.

> Every family has a history. Family Legacy helps preserve it, connect it, and pass it on.

## Project status
- Stage: Pre-implementation design and architecture
- Implementation: Paused pending UX and backend architecture approval
- Current release target: R1 — Working family tree
- Source of truth: This repository

## Approved product decisions

| Area | Decision |
|---|---|
| Platform | Responsive web first |
| Visibility | Mixed; private by default; explicitly published public family pages |
| Identity | A real-world person may appear in multiple family spaces |
| Business | Free initially; core access/export not paywalled |
| Languages | English, Telugu, Tamil, Kannada, Hindi launch target |
| Architecture | Modular monolith |
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + TypeScript; NestJS preferred |
| Database | PostgreSQL |
| Tree UI | XYFlow with custom genealogy layout |
| Graph queries | PostgreSQL recursive CTEs initially |
| Media | S3-compatible object storage |
| Portability | GEDCOM + complete archive export |

## Start here
1. [Project charter](docs/product/PROJECT_CHARTER.md)
2. [PRD](docs/product/PRODUCT_REQUIREMENTS.md)
3. [Use cases](docs/product/USE_CASES.md)
4. [Architecture](docs/architecture/ARCHITECTURE.md)
5. [Data model](docs/architecture/DATA_MODEL.md)
6. [API design](docs/architecture/API_DESIGN.md)
7. [UX specification](docs/ux/UX_SPECIFICATION.md)
8. [Delivery plan](docs/execution/DELIVERY_PLAN.md)
9. [Master backlog](docs/execution/BACKLOG.md)
10. [Agent instructions](AGENTS.md)

## Immediate next step
Complete the UX design and backend architecture workstreams before implementing FL-001/FL-002. Start with [Product Design Plan](docs/ux/PRODUCT_DESIGN_PLAN.md) and [Backend Architecture Plan](docs/architecture/BACKEND_ARCHITECTURE_PLAN.md). Track UX-001–UX-004 and ARCH-001–ARCH-005 in GitHub. The existing foundation branches are parked; no application code should be started until the design and architecture gates are approved.

## Non-negotiable principles
- Correct relationships over visual polish.
- Preserve original media and evidence.
- Private by default; public exposure requires explicit publication.
- No cross-family data leakage.
- AI assists; humans confirm history and relationship changes.
- Keep data portable and restorable.
- Record decisions and update documentation as the project evolves.
