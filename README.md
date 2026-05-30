# SDUI - Server Driven UI

A learning project exploring the Server-Driven UI pattern, where the server controls what the client renders via JSON responses.

## Structure

- `sdui-api/` — Fastify backend that serves UI schemas
- `sdui-web/` — Next.js frontend that renders components from server responses

## Getting Started

### API Server

```bash
cd sdui-api
npm install
npm run dev
# Runs on http://localhost:3001
```

### Web App

```bash
cd sdui-web
npm install
npm run dev
# Runs on http://localhost:3000
```

### Environment Variables

Create `sdui-web/.env` with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the Fastify API (include trailing slash) |

## Changelog

- **2026-05-30** — Added loading skeleton, fallback page, api_call toast feedback + re-fetch, started Fastify refactor (pages/routes extraction) and resolver-as-prop refactor.
- **2026-05-30** — Polished FormComponent: submit button via server trigger, buttonType prop, error handling with toast, restricted actionResolver for submit actions.
- **2026-05-29** — Added FormComponent with dynamic Zod validation, react-hook-form integration, contact page endpoint.
- **2026-05-28** — Added card component, refactored ComponentMapper into individual files, installed shadcn, async error handling in useActionResolver, fixed Turbopack memory issue.
- **2026-05-28** — Added Prettier config, restructured README/PLAN roles, added steering rules for doc consistency.
- **2026-05-27** — Migrated sdui-api to TypeScript. Added input component schema + basic rendering. Fixed redirect on `/`.
- **2026-05-26** — Phase 3 complete. Dynamic routing, actions (navigate + api_call), recursive rendering all working. Starting Phase 4.
