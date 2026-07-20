# Project Structure

InterviewIQ frontend uses a **feature-first** architecture on top of the Next.js App Router.

## Top Level

```text
src/
├── app/           # Routes, layouts, loading/error/404
├── api/           # Reserved for Next.js route handlers (under app/api)
├── assets/        # Images, icons, static media
├── components/    # Shared presentational components
├── config/        # Environment + site configuration
├── constants/     # Routes, endpoints, query keys
├── features/      # Domain features (auth, aptitude, tests, ...)
├── hooks/         # Shared hooks
├── lib/           # Low-level libraries (axios, cn, query client)
├── providers/     # App-wide providers
├── services/      # Cross-cutting HTTP services
├── store/         # Zustand stores
├── styles/        # Additional style modules
├── types/         # Global shared types
└── utils/         # Pure helpers
```

## App Router Groups

```text
src/app/
├── (public)/      # Marketing / public pages
├── (auth)/        # Login / signup
├── (dashboard)/   # Authenticated product shell
├── api/           # Future route handlers
├── layout.tsx     # Root layout + providers
├── loading.tsx
├── error.tsx
├── global-error.tsx
└── not-found.tsx
```

Route groups do **not** appear in the URL.

## Components

```text
src/components/
├── layout/     # Shell + landing section placeholders
├── navbar/
├── sidebar/
├── footer/
├── cards/
├── charts/
├── buttons/
├── forms/
├── inputs/
├── dialogs/
├── tables/
├── shared/     # ErrorBoundary, placeholders
└── ui/         # shadcn primitives
```

## Features

Each feature owns its own slice:

```text
src/features/<feature>/
├── api/          # Feature HTTP functions (via apiClient)
├── components/   # Feature UI
├── hooks/        # Feature React Query / local hooks
└── types/        # Feature-specific types
```

Current features:

- `auth`
- `dashboard`
- `aptitude`
- `tests`
- `reports`
- `interview`
- `profile`

## State Ownership

| Kind | Tool | Location |
| --- | --- | --- |
| Server / async data | TanStack Query | `features/*/hooks` |
| Client UI state | Zustand | `src/store` |
| Forms | React Hook Form + Zod | feature components |
| Theme | next-themes | `providers/theme-provider` |

## Import Alias

All imports use the `@/` absolute alias mapped to `src/`.

```ts
import { apiClient } from "@/lib/axios";
import { useAuthStore } from "@/store";
```

Relative imports (`../`) are not allowed.
