# Routing

## Route Groups

| Group | Purpose | URL prefix |
| --- | --- | --- |
| `(public)` | Marketing pages | `/` |
| `(auth)` | Authentication | `/login`, `/signup` |
| `(dashboard)` | Authenticated app | `/dashboard/*` |

## Public Routes

| Path | File |
| --- | --- |
| `/` | `src/app/(public)/page.tsx` |
| `/about` | `src/app/(public)/about/page.tsx` |
| `/contact` | `src/app/(public)/contact/page.tsx` |
| `/features` | `src/app/(public)/features/page.tsx` |

## Auth Routes

| Path | File |
| --- | --- |
| `/login` | `src/app/(auth)/login/page.tsx` |
| `/signup` | `src/app/(auth)/signup/page.tsx` |

## Dashboard Routes

| Path | File |
| --- | --- |
| `/dashboard` | `dashboard/page.tsx` |
| `/dashboard/general-aptitude` | `dashboard/general-aptitude/page.tsx` |
| `/dashboard/general-aptitude/arithmetic` | `.../arithmetic/page.tsx` |
| `/dashboard/general-aptitude/arithmetic/[topicSlug]` | `.../[topicSlug]/page.tsx` |
| `/dashboard/general-aptitude/arithmetic/[topicSlug]/theory` | `.../theory/page.tsx` |
| `/dashboard/general-aptitude/arithmetic/[topicSlug]/practice` | `.../practice/page.tsx` |
| `/dashboard/general-aptitude/logical` | `.../logical/page.tsx` |
| `/dashboard/general-aptitude/logical/[topicSlug]` | `.../logical/[topicSlug]/page.tsx` |
| `/dashboard/general-aptitude/verbal` | `.../verbal/page.tsx` |
| `/dashboard/general-aptitude/verbal/[topicSlug]` | `.../verbal/[topicSlug]/page.tsx` |
| `/dashboard/tests` | `dashboard/tests/page.tsx` |
| `/dashboard/tests/[testId]/instructions` | `.../instructions/page.tsx` |
| `/dashboard/tests/[testId]/attempt` | `.../attempt/page.tsx` |
| `/dashboard/tests/[testId]/result` | `.../result/page.tsx` |
| `/dashboard/interview` | `dashboard/interview/page.tsx` |
| `/dashboard/interview/hr` | `.../hr/page.tsx` |
| `/dashboard/interview/hr/freshers` | `.../freshers/page.tsx` |
| `/dashboard/interview/hr/experienced` | `.../experienced/page.tsx` |
| `/dashboard/interview/hr/question/[questionId]` | `.../question/[questionId]/page.tsx` |
| `/dashboard/interview/ai` | `.../ai/page.tsx` |
| `/dashboard/reports` | `dashboard/reports/page.tsx` |
| `/dashboard/profile` | `dashboard/profile/page.tsx` |
| `/dashboard/profile/edit` | `dashboard/profile/edit/page.tsx` |

All dashboard pages live under `src/app/(dashboard)/`.

## Layouts

- **Public Layout** — `src/app/(public)/layout.tsx`
- **Auth Layout** — `src/app/(auth)/layout.tsx`
- **Dashboard Layout** — `src/app/(dashboard)/layout.tsx`
  - Navbar placeholder
  - Sidebar placeholder
  - Main content placeholder
  - Theme toggle placeholder
  - Profile menu placeholder

## Middleware Protection

File: `src/middleware.ts`

Behavior:

1. Unauthenticated access to `/dashboard/*` → redirect to `/login?redirect=...`
2. Authenticated access to `/login` or `/signup` → redirect to `/dashboard`
3. Auth detection uses cookie: `interviewiq_access_token`

Use `ROUTES` and `PROTECTED_ROUTE_PREFIXES` from `@/constants/routes` when adding new protected areas.

## Global Route UI

| File | Role |
| --- | --- |
| `loading.tsx` | Global loading UI placeholder |
| `not-found.tsx` | 404 page placeholder |
| `error.tsx` | Segment error UI placeholder |
| `global-error.tsx` | Root error UI placeholder |
