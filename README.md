# Family Legacy

**Family Tree & Generational Legacy Platform**  
India-first · Global-ready · Web-first · Free initial product

Family Legacy is a private-by-default, collaborative family knowledge platform for documenting ancestry, maintaining relationships, preserving photographs and stories, organizing family events, and passing family knowledge to future generations.

> Every family has a history. Family Legacy helps preserve it, connect it, and pass it on.

## Project status
- Stage: R1 foundation implementation
- Implementation: FL-001 frontend and FL-002 backend foundations in progress on stacked feature branches
- Current release target: R1 — Working family tree
- Source of truth: This repository

## Approved product decisions

| Area | Decision |
|---|---|
| Platform | Responsive web first |
| Visibility | Mixed; private by default; explicitly published public family pages |
| Identity | Each family representation has a distinct opaque Person anchor in v1; cross-family linking is disabled |
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

## Current implementation
The R1 foundation start gate is recorded as satisfied in [Build Readiness](docs/execution/BUILD_READINESS.md). FL-001 and FL-002 are being implemented on feature branches stacked from their approved UX and backend architecture workstreams. The Phase 0 design PRs remain unmerged; implementation PRs target their respective workstream branches until those design PRs are integrated. No production deployment or real personal/family data is authorized.

## Non-negotiable principles
- Correct relationships over visual polish.
- Preserve original media and evidence.
- Private by default; public exposure requires explicit publication.
- No cross-family data leakage.
- AI assists; humans confirm history and relationship changes.
- Keep data portable and restorable.
- Record decisions and update documentation as the project evolves.
