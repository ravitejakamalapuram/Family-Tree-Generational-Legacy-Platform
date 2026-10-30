# System Architecture

## Baseline
Responsive React web application + TypeScript Node.js modular monolith + PostgreSQL + S3-compatible media storage + background worker.

## Principles
Domain logic independent of frameworks, database transport and AI vendor; PostgreSQL system of record; Person distinct from family representation; family-scoped relationships; bounded graph queries; public projection distinct from private records; asynchronous durable jobs; audit and concurrency safety.

## Components
Web: auth/onboarding, workspace, dashboard, tree, people, vault, stories, events, places, collaboration, AI, public pages, settings.
API: identity/access, family, people, genealogy, branches, events/places, media/memories/stories, collaboration, search, AI, publication, archive, notifications.
Worker: thumbnails/transcoding, metadata, transcription, translation, exports, notifications, integrity checks.
Data: PostgreSQL, object storage, PostgreSQL FTS initially; cache only when measured.

## Frontend
React + TypeScript + Vite; React Router; TanStack Query; Zustand only where genuinely needed; Tailwind/design system; XYFlow custom nodes/edges; React Hook Form + Zod; i18next; IndexedDB for draft/upload queue if useful.

## Backend
Node.js + TypeScript; NestJS preferred; PostgreSQL; Prisma or Drizzle, with explicit SQL/CTEs where needed. Modules: auth, users, families, memberships, persons, family-persons, relationships, branches, events, places, media, memories, stories, contributions, notifications, search, historian, archives, public-pages.

## Repository shape
```
apps/{web,api,worker}
packages/{database,shared-types,validation,ui,genealogy-engine,i18n,config}
infrastructure/{docker,deployment,monitoring}
docs/{product,architecture,ux,execution,decisions}
scripts
.github/workflows
AGENTS.md
README.md
```

## Infrastructure
Static CDN hosting; container API/worker; managed PostgreSQL; S3-compatible storage; email; GitHub Actions; structured logs/error monitoring. Separate environments. No secrets in repo.

## Performance/reliability
Bounded graph responses; profile details loaded separately; recursive CTE depth/node limits; indexed relationship endpoints; measured cache/invalidation; resumable uploads; cursor pagination; transactions for graph/publication/approval/membership; optimistic versions; idempotency; durable jobs; tested database/media restore.

## Avoid initially
Kubernetes, microservices, Kafka, Neo4j, complex event streaming and premature complexity.
