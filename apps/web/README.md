# Web application

R1 frontend foundation built with React, TypeScript and Vite.

## Requirements

- Node.js 22.12+
- npm 10+

## Commands (from repository root)

```sh
npm install
npm run dev:web
npm run lint:web
npm run typecheck:web
npm run test:web
npm run build:web
```

## Boundaries

- Routes are navigation structure only; they do not authorize access.
- The API client uses the versioned `/api/v1` base path and credentialed requests.
- CSRF tokens are supplied from an in-memory provider; the client does not persist tokens.
- Family identifiers are routing context, never proof of membership.
- Do not place real family/person data in fixtures or browser storage.
- The family workspace remains empty until an authenticated membership response is available.
