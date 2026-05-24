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
# Runs on http://localhost:3002
```

### Web App

```bash
cd sdui-web
npm install
npm run dev
# Runs on http://localhost:3000
```
