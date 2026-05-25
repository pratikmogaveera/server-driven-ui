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

## Checkpoint (2026-05-25)

- Zod schema defined in both `sdui-web/lib/main.schema.ts` and `sdui-api/schema.js`
- API validates responses against `PageSchema` before sending (returns 500 on mismatch)
- Response shape: `{ id, title, root: { type: 'container', children: [...] } }`
- Components implemented: `text`, `button`, `container`
- Actions implemented: `navigate` (via Next.js Link), `api_call` (via axios)
- Frontend fetches from API as a client component with `useEffect`
- Error handling: loading state, error state with message display
- `ComponentMapper` renders recursively from server payload

**Next session:**
- Extract action handling from `ComponentMapper` into a `useActionResolver` hook
- Add `/api/pages/about` endpoint in Fastify
- Create `app/[pageId]/page.tsx` for dynamic routing
