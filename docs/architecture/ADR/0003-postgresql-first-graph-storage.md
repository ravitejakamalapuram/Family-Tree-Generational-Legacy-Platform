# ADR-0003: PostgreSQL-First Genealogy Graph
- Status: Accepted
- Date: 2026-10-30

## Context
The graph is family-scoped people and typed relationships. Initial traversal can use indexed relational tables and recursive CTEs.

## Decision
Store graph nodes/edges in PostgreSQL. Use bounded recursive CTEs and dedicated genealogy domain service. Render with XYFlow and custom genealogy layout.

## Consequences
Lower infrastructure complexity and transactional integrity. Monitor query performance; reconsider graph database only with measured evidence.
