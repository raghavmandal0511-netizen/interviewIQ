# InterviewIQ Frontend

Production-ready Next.js 15 frontend foundation for InterviewIQ.

This package contains architecture, configuration, layouts, route placeholders, providers, and shared infrastructure only. It does **not** include business logic, API integrations, or finished UI.

## Stack

| Concern | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| UI Kit | shadcn/ui |
| Animation | Framer Motion |
| Client State | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Theme | next-themes |
| Icons | Lucide React |
| Charts | Recharts |
| Toasts | Sonner |

## Installation

```bash
cd frontend
npm install
cp .env.example .env.local
```

## Commands

```bash
npm run dev        # Start development server (Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run typecheck  # TypeScript (--noEmit)
```

## How to Start

1. Ensure Node.js 20+ is installed.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local` and adjust values if needed.
4. Run `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000).

> Dashboard routes are protected by middleware. Without an auth cookie (`interviewiq_access_token`), `/dashboard/*` redirects to `/login`.

## Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── app/                 # App Router (public, auth, dashboard)
│   ├── assets/              # Static assets
│   ├── components/          # Shared UI building blocks
│   ├── config/              # Env, site, navigation config
│   ├── constants/           # Routes, API paths, query keys
│   ├── features/            # Feature-first modules
│   ├── hooks/               # Shared hooks
│   ├── lib/                 # Axios, query client, utils
│   ├── providers/           # Theme, Query, Toast providers
│   ├── services/            # HTTP services (no axios in components)
│   ├── store/               # Zustand client state
│   ├── styles/              # Extra style entrypoints
│   ├── types/               # Global TypeScript types
│   ├── utils/               # Shared helpers
│   └── middleware.ts        # Auth route protection
├── components.json          # shadcn config
├── next.config.ts
├── package.json
└── tsconfig.json
```

See also:

- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [ROUTING.md](./ROUTING.md)
- [API_INTEGRATION.md](./API_INTEGRATION.md)
- [CODING_STANDARDS.md](./CODING_STANDARDS.md)
- [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)

## Coding Standards

- Absolute imports only (`@/...`)
- Feature-first architecture
- Never call Axios inside components — use services
- React Query for server state; Zustand for client UI/auth shell state
- Prefer Server Components; mark Client Components only when required
- Strict TypeScript — no `any`
- One component = one responsibility

## Git Branch Strategy

| Branch | Purpose |
| --- | --- |
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/<name>` | New features |
| `fix/<name>` | Bug fixes |
| `chore/<name>` | Tooling / architecture |

Workflow:

1. Branch from `develop` (or `main` if that is the team default).
2. Open a PR into the integration branch.
3. Require lint + typecheck + build before merge.

## Commit Convention

Follow Conventional Commits:

```text
feat: add aptitude topic route placeholders
fix: correct middleware redirect path
chore: configure react query provider
docs: update routing guide
refactor: split auth store actions
```

Rules:

- Use imperative mood (`add`, not `added`)
- Keep subject under ~72 characters
- Scope optional: `feat(auth): ...`
