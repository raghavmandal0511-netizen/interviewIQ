# Coding Standards

## TypeScript

- `strict` mode is enabled.
- `noImplicitAny` is enabled.
- Never use `any`. Prefer `unknown` and narrow.
- Export explicit types for public APIs.
- Prefer `type` for object shapes unless declaration merging is required.

## Imports

- Always use absolute imports via `@/`.
- Never use relative imports (`../` or `./` across modules).
- Same-folder relative imports for colocated tiny helpers are discouraged; prefer `@/features/...`.

```ts
// Good
import { apiClient } from "@/lib/axios";

// Bad
import { apiClient } from "../../lib/axios";
```

## Architecture

- Feature-first: domain code lives under `src/features/<feature>`.
- Shared primitives live under `src/components`.
- Cross-cutting HTTP helpers live under `src/services` or feature `api/`.
- Config and constants are centralized — no magic strings for routes/endpoints.

## Components

- One component = one responsibility.
- Prefer Server Components by default.
- Add `"use client"` only for interactivity, browser APIs, Zustand, or React Query hooks.
- Keep pages thin: compose feature/shared components.
- No business logic inside presentational components.

## Data Fetching

- Use TanStack Query for server state.
- Use Zustand only for client state (UI shell, ephemeral auth mirror).
- Never call Axios inside components or pages.
- Call services / feature API modules from hooks.

## Forms

- React Hook Form for form state.
- Zod for schemas and validation.
- Keep schemas next to the feature that owns them.

## Naming

| Kind | Convention | Example |
| --- | --- | --- |
| Components | PascalCase | `WelcomeBanner.tsx` |
| Hooks | `use` + camelCase | `useProfile.ts` |
| Stores | `*.store.ts` | `auth.store.ts` |
| Constants | SCREAMING_SNAKE or const objects | `API_ENDPOINTS` |
| Route files | Next.js conventions | `page.tsx`, `layout.tsx` |

## Styling

- Tailwind utility classes for styling when building UI.
- Use `cn()` from `@/lib/utils` for conditional classes.
- Do not invent parallel CSS architecture unless required.
- shadcn primitives live in `src/components/ui`.

## Errors & Loading

- Use App Router `loading.tsx` / `error.tsx` / `not-found.tsx`.
- Use shared `ErrorBoundary` for client subtree isolation when needed.
- Surface user notifications with Sonner via the toast provider.

## Comments & TODOs

- Prefer clear structure over noisy comments.
- Use `TODO:` markers for unfinished UI/integration work in placeholders.
