# InterviewIQ

InterviewIQ is an interview preparation platform (aptitude, HR interview, AI interview, tests, and reports).

This repository is a monorepo:

| Path | Description |
| --- | --- |
| `/backend` | Node.js Express + MongoDB API |
| `/frontend` | Next.js 15 App Router frontend foundation |

## Frontend

The frontend foundation is ready under `/frontend`.

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

See [`frontend/README.md`](./frontend/README.md) for architecture docs, coding standards, and conventions.

## Backend

```bash
cd backend
npm install
npm run dev
```

See [`backend/README.md`](./backend/README.md) for API setup details.
