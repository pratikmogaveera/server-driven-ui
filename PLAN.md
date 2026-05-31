# Server-Driven UI: Level 2–3 Learning Plan

**Stack:** Next.js (frontend) + Fastify (API)  
**Focus:** Layout & Interactions  
**Timeline:** 4–6 weeks

---

## Overview

**Level 2–3 covers:**

- Nested component trees, layouts, containers
- Interactive elements (buttons, forms, inputs)
- Action handlers (navigation, API calls)
- Type safety with Zod schemas

**Out of scope for now:**

- Conditional rendering, feature flags
- Global state machines
- Complex side effects
- Shared packages / monorepo tooling

---

## Phase 1: Schema + First Endpoint (Week 1)

> **Goal:** Define what the server sends and prove it works end-to-end with a hardcoded response.

### 1.1 Define Component Types

Start with 3 types only. You can always add more later.

| Type | Props | Why |
|------|-------|-----|
| `text` | `content`, `className` | Simplest possible component |
| `button` | `label`, `className`, `action` | Introduces actions |
| `container` | `children`, `className` | Introduces recursion |

Write the schema in `sdui-web/lib/sdui.schema.ts` using Zod:

- Use `z.discriminatedUnion("type", [...])` for component types
- Use `z.lazy()` for recursive `children` in container
- Use a separate `z.discriminatedUnion("type", [...])` for actions

**Key insight:** Get the recursive type working first. Everything else builds on it.

### 1.2 Define Actions (Keep to 2)

| Action | Fields | Purpose |
|--------|--------|---------|
| `navigate` | `target` (route string) | Page transitions |
| `api_call` | `endpoint`, `method` | Form submissions, data fetching |

That's it. Don't add more until you need them.

### 1.3 First Fastify Endpoint

Create `GET /api/pages/home` that returns a hardcoded payload:

```json
{
  "id": "home",
  "title": "Home",
  "root": {
    "type": "container",
    "className": "flex flex-col gap-4 p-6",
    "children": [
      { "type": "text", "content": "Welcome to SDUI", "className": "text-2xl font-bold" },
      { "type": "button", "label": "Go to About", "className": "...", "action": { "type": "navigate", "target": "/about" } }
    ]
  }
}
```

**Exercise:**

- [x] Write the Zod schema (3 components + 2 actions)
- [x] Create the Fastify endpoint returning valid JSON
- [x] Validate your own endpoint response against the schema (write a quick test script)

---

## Phase 2: Component Mapper + Rendering (Week 1–2)

> **Goal:** Render the server payload on screen. This is the "aha moment" of SDUI.

### 2.1 The Mapping Pattern

```
Server: { type: "button", label: "Click" }
          ↓
Mapper:  componentMap["button"] → ButtonComponent
          ↓
Screen:  <button>Click</button>
```

Build `ComponentMapper.tsx` — a single component that takes a `Component` union and renders the right thing.

### 2.2 Build 3 Components

**TextComponent:** Renders `<p>` with `content` and `className`  
**ButtonComponent:** Renders `<button>` with `label` and `className`, calls action on click  
**ContainerComponent:** Renders `<div>` with `className`, maps `children` through `ComponentMapper` recursively

**Rules:**
- No business logic in components
- Props come directly from the schema type (use `Extract<Component, { type: 'text' }>`)
- Server controls styling via `className` (Tailwind classes)

### 2.3 SDUIRenderer

Top-level component that:
1. Takes a validated page payload
2. Renders `<ComponentMapper component={payload.root} />`

### 2.4 Fetch + Render in Next.js

In `app/page.tsx`:
1. Fetch from `http://localhost:3001/api/pages/home`
2. Validate with Zod `.parse()`
3. Pass to `<SDUIRenderer />`

**At this point you should see your server-defined UI on screen.**

**Exercise:**

- [x] Build ComponentMapper + 3 components
- [x] Fetch and render the home page payload
- [x] Change the Fastify payload → see UI update without touching frontend code

---

## Phase 3: Actions (Week 2)

> **Goal:** Make the UI interactive. Buttons do things.

### 3.1 useActionResolver Hook

A custom hook that returns a `resolveAction(action)` function.

```
User clicks → ButtonComponent calls resolveAction(action)
            → Hook checks action.type
            → "navigate" → router.push(target)
            → "api_call" → fetch(endpoint, { method })
```

### 3.2 Navigate Action

Use Next.js `useRouter`. When action type is `navigate`, call `router.push(action.target)`.

### 3.3 API Call Action

Call `fetch(action.endpoint, { method: action.method })`. For now, just log the response.

### 3.4 Wire It Up

Pass `resolveAction` down through ComponentMapper (via props or context). ButtonComponent calls it on click.

**Exercise:**

- [x] Create `useActionResolver` hook
- [x] Wire navigate action to a button
- [x] Add a second Fastify page (`/api/pages/about`) and navigate between them
- [x] Add a button with `api_call` action, verify it hits Fastify

**Known issues to fix in Phase 5:**
- `useActionResolver` is called in every recursive `ComponentMapper` instance — pass `resolver` as a prop instead
- `api_call` fires and forgets — no response handling, no error feedback
- `key={i}` (index as key) in children map — fragile if list order changes; add stable `id` field to components

---

## Phase 4: Forms + More Components (Week 2–3)

> **Goal:** Handle user input. This is where SDUI gets interesting.

### 4.1 Add Component Types

| Type | Props |
|------|-------|
| `input` | `name`, `placeholder`, `className` |
| `card` | `children`, `className` |
| `image` | `src`, `alt`, `className` |

Update your Zod schema. Add to ComponentMapper.

### 4.2 Form Pattern

Server sends a container with inputs + a submit button. The submit button's action is `api_call` with the form data.

**Challenge:** Inputs need local state, but SDUI is server-driven. Solution:

- Wrap form sections in a `FormProvider` component (client-side)
- Inputs register themselves by `name`
- Submit button collects all values and sends them with the action

### 4.3 Fastify Action Endpoint

Create `POST /api/actions` that receives form data, validates it, and returns a response.

**Exercise:**

- [x] Add `input` component (schema + basic rendering)
- [x] Add `card` component
- [x] Build a form page (Fastify returns inputs + submit button)
- [x] Submit form → hits `/api/actions` → returns success
- [x] Display success/error state
- [x] Handle `api_call` response in `useActionResolver` — show success/error, re-fetch page after mutation
- [x] Refactor `ComponentMapper` into individual component files (`components/sdui/components/TextComponent.tsx`, `ButtonComponent.tsx`, etc.)

---

## Phase 5: Multi-Page App (Week 3–4)

> **Goal:** Build something that feels like a real app.

### 5.1 Dynamic Routing

Create `app/[pageId]/page.tsx` that:
1. Reads `pageId` from params
2. Fetches `/api/pages/:pageId`
3. Renders with SDUIRenderer

Now any page the server defines is automatically renderable.

### 5.2 Build 3+ Pages in Fastify

| Page | Content |
|------|---------|
| `home` | Welcome text + navigation cards |
| `dashboard` | Grid of stat cards |
| `contact` | Form with inputs + submit |

### 5.3 Error Handling

| Scenario | Behavior |
|----------|----------|
| Fastify is down | Show fallback UI |
| Invalid payload | Show error + log details |
| Network timeout | Show retry button |
| Unknown component type | Skip it, render nothing |

### 5.4 Loading States

Show a skeleton or spinner while fetching. Server could even define its own loading layout later.

**Exercise:**

- [x] Dynamic route rendering any page from server
- [x] 3 pages working end-to-end (home, about, contact)
- [x] Error boundary + fallback for each failure mode (Fastify down, invalid payload, network timeout)
- [x] Loading skeleton instead of plain "Loading..." text
- [x] Zod parse errors surfaced with detail in error state (not swallowed into generic message)
- [x] Pass `resolver` as prop through `ComponentMapper` instead of calling hook on every recursive instance

---

## Phase 6: Polish & Patterns (Week 4–6)

> **Goal:** Refine, add features one at a time, build muscle memory.

### Pick one per session:

1. **Variants** — Server sends `variant: "primary" | "secondary"`, component maps to styles
2. **Lists** — Server sends `{ type: "list", items: [...] }`, component renders each
3. **Spacing/Layout** — Server controls gap, padding, direction via className
4. **Refresh** — After an action, re-fetch the page to get updated UI
5. **Transitions** — Add simple animations between page navigations
6. **DevTools** — Build a debug panel showing the raw JSON payload
7. **Link component** — Add `{ type: "link", label, href }` to schema; renders as `<Link>` instead of `<button>` for navigation. Buttons should trigger actions, links should navigate — server declares intent explicitly.

### Testing (Manual is fine)

- [ ] Check payloads in Network tab
- [ ] Test with invalid payloads (break things intentionally)
- [ ] Test on slow network (DevTools throttling)
- [ ] Verify TypeScript catches schema mismatches at compile time

---

## Project Structure

```
sdui-web/
├── lib/
│   └── sdui.schema.ts           # Zod schemas + types
├── components/
│   └── sdui/
│       ├── ComponentMapper.tsx   # Maps type → component
│       ├── SDUIRenderer.tsx      # Top-level renderer
│       └── components/
│           ├── TextComponent.tsx
│           ├── ButtonComponent.tsx
│           ├── ContainerComponent.tsx
│           ├── InputComponent.tsx
│           └── CardComponent.tsx
├── hooks/
│   └── useActionResolver.ts     # Handles actions
├── app/
│   ├── page.tsx                 # Home (fetches /api/pages/home)
│   └── [pageId]/
│       └── page.tsx             # Dynamic pages
└── ...

sdui-api/
├── index.js
├── routes/
│   ├── pages.js                 # GET /api/pages/:id
│   └── actions.js               # POST /api/actions
└── data/
    └── pages/                   # Hardcoded page payloads
        ├── home.json
        ├── dashboard.json
        └── contact.json
```

---

## Styling Decision: Tailwind Classes from Server

Server sends Tailwind class strings in `className`. Component applies them directly.

**Why this approach:**
- You already have Tailwind set up
- Maximum server control over appearance
- Zero mapping logic on the client
- Easy to iterate — change classes in Fastify, see results instantly

**Rule:** Components can have base classes (e.g., `cursor-pointer` on buttons) but server classes override/extend.

---

## Key Principles

1. **Server owns structure and style.** Client owns rendering mechanics.
2. **Components are dumb.** Data in, UI out. No fetching, no business logic.
3. **Start hardcoded, extract later.** Don't build a CMS. Hardcode JSON in Fastify.
4. **One new thing per session.** Don't try to build everything at once.
5. **Break things intentionally.** Send invalid payloads. See what happens. Fix it.

---

## Session Checkpoint (2026-05-31, morning)

- Zod schema defined in `sdui-web/lib/main.schema.ts` and `sdui-api/src/schema.ts`
- API migrated to TypeScript (`sdui-api/src/`)
- API validates responses against `PageSchema` before sending (returns 500 on mismatch)
- Response shape: `{ id, title, root: { type: 'container', children: [...] } }`
- Components implemented: `text`, `button`, `container`, `input`, `card`, `form`
- Actions implemented: `navigate`, `api_call`, `submit`
- Dynamic routing via `app/[slug]/page.tsx` — any server-defined page is renderable
- Root `/` uses `redirect('/home')` (fixed from `router.push`)
- `axiosInstance` centralises base URL config
- `ComponentMapper` refactored — delegates to individual component files (`ButtonComponent`, `CardComponent`, `ContainerComponent`, `InputComponent`, `FallbackComponent`, `FormComponent`)
- `useActionResolver` now async with error handling, toast feedback (goey-toast), `router.refresh()` after success
- **Action resolver provided via React Context** — hook called once in `MainPageComponent`, consumed in `ButtonComponent` via `useActionResolverConsumer()`. `ComponentMapper` is now action-agnostic.
- Installed shadcn (zinc theme, dark mode), using `cn()` for base + server style merging
- Added `outputFileTracingRoot` in `next.config.ts` to fix Turbopack memory explosion
- Tailwind safelist in `lib/utils.ts` for server-sent classes not in source
- Added Prettier config + `.prettierignore`, formatted all files
- Added steering rules (`.kiro/steering/docs.md`) for doc structure
- `FormComponent` with dynamic Zod schema generation from server-defined inputs
- `InputComponent` connected to react-hook-form via `register` prop (optional — works standalone too)
- `validationObject` added to input schema (`{ type: 'onChange' | 'onBlur', message }`)
- Form `submit` prop: `{ endpoint, method, trigger }` — server defines submit button + API target
- `ButtonComponent` passes `type={data.buttonType || 'button'}`, skips resolver for `submit` actions
- Form submission with toast feedback (goey-toast) for success/error
- 3 pages served: home, about, contact
- Contact page: form with email + password inputs, submits to `/contact-submit`
- Loading skeleton (shadcn `Skeleton`) shown while page data is fetching
- `FallbackPage` component renders on fetch/parse errors
- Fastify refactor started: page payloads in `src/pages/`, `contactSubmit` in `src/routes/action.ts`, `pageMapper` in `src/config.ts`

**Next up:**
- Standardize API response envelope:
  - Success: `{ success: true, data: <Page | ActionResponse> }`
  - Error: `{ success: false, error: { message: string, details?: ZodIssue[] } }`
- Add axios response interceptor on frontend to unwrap envelope
- Build dashboard page

---

## Checkpoint: End of Week 4

- [x] Zod schema with 5+ component types + 2 action types
- [x] ComponentMapper rendering all types recursively
- [x] useActionResolver handling navigate + api_call
- [x] 3+ pages served from Fastify
- [ ] Form submission working end-to-end
- [x] Error handling for all failure modes
- [x] Dynamic routing (`/[pageId]`)
- [ ] Can change UI by only editing Fastify — no frontend deploys needed

---

## What's Next (Level 4+)

- Database-backed payloads (Postgres via Supabase) — replace hardcoded JSON with DB reads
- Admin panel to edit page JSON on the fly — alter UI without redeploying
- Deploy: frontend on Vercel, API on Railway/Render, DB on Supabase
- Conditional rendering (show/hide based on state)
- Feature flags from server
- Multi-step forms with state machines
- Caching + stale-while-revalidate
- React Native client (same schema, different components)
- Unit tests for mapper, integration tests for flows
