# API application

R1 backend foundation built with NestJS and TypeScript.

## Requirements

- Node.js 22.12+
- npm 10+

## Commands (from repository root)

```sh
npm install
npm run dev:api
npm run lint:api
npm run typecheck:api
npm run test:api
npm run build:api
```

## Current behavior

- API routes are versioned under `/api/v1`.
- Liveness is exposed at `GET /api/v1/health/live`.
- Readiness intentionally returns HTTP 503 until FL-003 adds a real PostgreSQL connectivity probe. It must not report ready based only on a configured connection string.
- Security headers are enabled; every request receives a generated request ID.
- Unhandled server failures are returned as a generic error envelope; internal exception details are not exposed.

No authentication, family data or production database access is implemented in this foundation slice.
