# SDUI API

Fastify backend that serves UI schemas as JSON for the frontend to render.

## Tech Stack

Fastify, TypeScript, Zod, pino-pretty (logging)

## Structure

```
sdui-api/
├── src/
│   ├── index.ts        # Server setup, cors, route registration
│   ├── config.ts       # Logger config, page mapper
│   ├── schema.ts       # Zod schemas (shared types with frontend)
│   ├── pages/
│   │   ├── home.ts     # Home page payload handler
│   │   ├── about.ts    # About page payload handler
│   │   └── contact.ts  # Contact page payload handler
│   └── routes/
│       └── action.ts   # Action endpoints (contact-submit)
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
| `/:pageId` | GET | Dynamic page payload (home, about, contact) |
| `/contact-submit` | POST | Contact form submission |
