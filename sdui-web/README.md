# SDUI Web

Next.js frontend that renders UI components driven by server JSON responses.

## Tech Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, Zod, shadcn/ui, Axios

## Structure

```
sdui-web/
├── app/
│   ├── page.tsx                # Redirects to /home
│   ├── [slug]/
│   │   ├── page.tsx            # Dynamic page (reads slug param)
│   │   └── MainPageComponent.tsx # Fetches + renders page with skeleton/fallback
│   ├── globals.css             # Tailwind + shadcn theme
│   └── layout.tsx              # Root layout (fonts, dark mode)
├── components/
│   ├── ComponentMapper.tsx     # Routes component type → renderer
│   ├── ButtonComponent.tsx
│   ├── CardComponent.tsx
│   ├── ContainerComponent.tsx
│   ├── InputComponent.tsx
│   ├── FormComponent.tsx
│   ├── FallbackComponent.tsx
│   ├── FallbackPage.tsx        # Full-page error fallback
│   └── ui/                     # shadcn primitives (button, input, skeleton)
├── hooks/
│   └── useActionsResolver.ts   # Handles navigate + api_call actions
├── lib/
│   ├── main.schema.ts          # Zod schemas + types
│   ├── axiosInstance.ts         # Axios with base URL
│   └── utils.ts                # cn() helper + Tailwind safelist
└── public/
```

## Setup

```bash
npm install
npm run dev
```

Runs on http://localhost:3000
