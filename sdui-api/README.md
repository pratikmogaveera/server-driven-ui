# SDUI API

Fastify backend that serves UI schemas as JSON for the frontend to render.

## Tech Stack

Fastify, TypeScript, Zod, pino-pretty (logging)

## Structure

```
sdui-api/
├── src/
│   ├── index.ts    # Server setup, routes, page payloads
│   └── schema.ts   # Zod schemas (shared types with frontend)
└── tsconfig.json
```

## Setup

```bash
npm install
npm run dev
```

Runs on http://localhost:3001

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/home` | GET | Home page payload |
| `/about` | GET | About page payload (card + input) |
