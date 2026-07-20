# Development Rules

These rules are mandatory for InterviewIQ frontend work.

## 1. Absolute Imports Only

Use `@/` for every module import.

```ts
import { ROUTES } from "@/constants/routes";
```

Do not introduce relative import paths between folders.

## 2. Feature-First Architecture

Place domain logic under:

```text
src/features/<feature>/{api,components,hooks,types}
```

Do not dump feature UI into `src/components` unless it is truly shared.

## 3. Never Call Axios in Components

Forbidden:

```ts
// inside a component
await axios.get("/topics");
await apiClient.get("/topics");
```

Required:

```text
Component → Hook (React Query) → Feature API / Service → apiClient
```

## 4. Use Services / Feature API Modules

All HTTP belongs in:

- `src/services/*`
- `src/features/<feature>/api/*`

## 5. Use React Query for Server State

Fetching, caching, mutations, and async status belong to TanStack Query.

## 6. Zustand Is Client State Only

Use Zustand for:

- sidebar open/closed
- ephemeral UI flags
- client auth shell mirror (optional)

Do not put server lists, reports, or topic payloads in Zustand.

## 7. Prefer Server Components

Default to Server Components.

Add `"use client"` only when required for:

- event handlers
- browser-only APIs
- Zustand
- React Query hooks
- Framer Motion client animations
- theme toggles

## 8. Strict TypeScript — No `any`

- Keep `strict` enabled.
- Do not disable type checks to ship faster.
- No `any`, no unjustified `as unknown as T` casts.

## 9. One Component = One Responsibility

Split layout chrome, feature widgets, and page composition.

## 10. No Business Logic in Foundation Placeholders

Placeholder pages may only contain heading, description, and TODO.

Do not add mock API wiring, fake datasets, or styled production UI until a UI task explicitly requests it.

## 11. Route & Endpoint Constants

Never hardcode paths:

```ts
import { ROUTES } from "@/constants/routes";
import { API_ENDPOINTS } from "@/constants/api";
```

## 12. Environment Access

Read env vars only through `@/config/env`.

## 13. Auth Middleware Contract

Protected dashboard routes depend on cookie:

```text
interviewiq_access_token
```

Update middleware and auth integration together when the backend cookie/header contract is finalized.

## 14. Verification Before PR

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Fix all TypeScript and lint errors before requesting review.
