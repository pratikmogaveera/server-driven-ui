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
node index.js
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

## Checkpoint (2026-05-26)

- Zod schema defined in both `sdui-web/lib/main.schema.ts` and `sdui-api/schema.js`
- API validates responses against `PageSchema` before sending (returns 500 on mismatch)
- Response shape: `{ id, title, root: { type: 'container', children: [...] } }`
- Components implemented: `text`, `button`, `container`
- Actions implemented: `navigate`, `api_call` — both handled via `useActionResolver` hook
- Dynamic routing via `app/[slug]/page.tsx` — any server-defined page is renderable
- Root `/` redirects to `/home`
- `axiosInstance` centralises base URL config
- `ComponentMapper` renders recursively from server payload

**Next session:**
- Fix `router.push` in `app/page.tsx` → use `redirect()` instead
- Phase 4: add `input`, `card` components + form pattern
