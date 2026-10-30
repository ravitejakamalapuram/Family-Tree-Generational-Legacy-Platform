# Agent Instructions — Family Legacy

Mandatory context for Codex, ChatGPT, and all coding agents.

## Read before acting
At the start of every task read README.md, .github/WORKING_AGREEMENTS.md, docs/execution/PROJECT_STATUS.md, and relevant product/UX/architecture/ADR docs. Inspect repository state, code, tests, branches, and open work. Do not rely on prior chat history: this repository is durable project memory.

## Approved product decisions
Web-first responsive application; mixed visibility, private by default; one Person may have separate FamilyPerson representations in multiple FamilySpaces; free initially; English, Telugu, Tamil, Kannada, Hindi launch target; React + TS + Vite; Node.js + TS backend (NestJS preferred); PostgreSQL modular monolith; XYFlow custom genealogy layout; recursive CTEs initially; S3-compatible storage; GEDCOM and complete archive export.

## Critical domain rules
1. Never conflate global identity with family membership.
2. Model Person, FamilySpace, FamilyPerson separately.
3. Relationships connect FamilyPerson records within the same family, never global Person records.
4. Support multiple names, family representations, relationships, spouses/partners, and life events.
5. Support biological, adoptive, step, guardian, partner/spouse and family-defined links.
6. Preserve uncertain/conflicting assertions with provenance.
7. Never automatically merge people or confirm AI-suggested relationships.
8. Do not infer sensitive characteristics.
9. Never expose private family identifiers as globally searchable identity keys.

## Security/privacy
- Enforce tenant isolation on every backend read/write.
- Check authentication, membership, role, record visibility, and channel.
- Frontend route guards are not authorization.
- Public pages read explicit approved published projections, never private tables filtered in browser.
- Public visibility is not inherited by every person/media/story.
- Living people and minors private by default; sensitive fields stricter.
- Short-lived signed media URLs; validate upload ownership/type/size.
- Secure sessions, rate limits, audit logs, least privilege.
- AI retrieval follows normal authorization.
- No private-data model training without explicit informed consent.
- Export/deletion accounts for shared identities/multiple families.

## Engineering standards
Modular monolith with explicit boundaries. Keep genealogy logic independent of React/HTTP/ORM/AI providers. Use versioned migrations, input validation, transactions for graph/publication/approval/membership changes, optimistic concurrency, bounded/paginated graph traversal, and tests for domain/security rules. No secrets in source. Avoid premature microservices, Kafka, Kubernetes, Neo4j.

## Workflow
Identify backlog IDs; inspect code; state assumptions; implement smallest coherent change; add tests/docs; run relevant format/lint/typecheck/tests/build; review privacy, tenant isolation, migration safety, accessibility and regressions; update PROJECT_STATUS/backlog/decision log/changelog; report exact files/checks/outcomes/blockers/next task. Never mark Done without evidence.

## GitHub hygiene
Work on feature branches. Descriptive conventional commits. PRs reference backlog IDs, acceptance criteria and test evidence. Never merge without explicit user approval. Do not claim push/test/CI without verification or discard user work.

## Resume after a long gap
Read this file and start-here docs; inspect status, branch, latest commits, open PRs/issues; read PROJECT_STATUS (repo state overrides stale conversation memory); review ADRs/changelog; select next unblocked task; summarize state and proceed. Repository is source of truth.
