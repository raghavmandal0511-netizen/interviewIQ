# API Audit Report — InterviewIQ Frontend

**Date:** 2026-07-21  
**Scope:** Frontend API integration only (backend unchanged)

---

## Current API architecture

```text
UI / React Query hooks
  → feature services (auth, aptitude, tests, hr, reports, dashboard, profile)
    → single shared `apiClient` (@/lib/axios)
      → NEXT_PUBLIC_API_BASE_URL + API_ENDPOINTS paths
        → https://interviewiq-backend-ecex.onrender.com/api/...

Auth extras (Next.js same-origin only):
  POST /api/auth/session  → sets httpOnly `token` cookie for middleware
  POST /api/auth/logout   → clears that cookie
```

- **One** Axios instance: `src/lib/axios.ts` (`apiClient`)
- Endpoint constants: `src/constants/api.ts` (all paths start with `/api/...`)
- Env access: `src/config/env.ts` only

---

## Wrong URLs found

| Wrong URL | Why |
| --- | --- |
| `http://localhost:3000/api/auth/api/userAuth/register` | `NEXT_PUBLIC_API_BASE_URL=/api` + path `/auth/api/userAuth/register` duplicated prefixes and used a non-existent backend route |
| `…/api/auth/api/userAuth/login` | Same duplication / wrong nested path |
| Proxy rewrite `source: /api/auth/api/:path*` → Render | Forwarded the broken nested path; live backend returns **404** `Cannot POST /api/auth/api/userAuth/register` |

### Live backend verification

| Probe | Result |
| --- | --- |
| `POST https://interviewiq-backend-ecex.onrender.com/api/auth/register` (empty body) | **400** `{"message":"All fields are required"}` — route exists |
| `POST https://interviewiq-backend-ecex.onrender.com/api/auth/api/userAuth/register` | **404** — route does not exist |
| `GET https://interviewiq-backend-ecex.onrender.com/` | **200** `{"success":true,"message":"Welcome to InterviewIQ API"}` |

Correct auth routes on deployed backend:

- `POST /api/auth/register`
- `POST /api/auth/login`

---

## Duplicate `/api` prefixes removed

| Before | After |
| --- | --- |
| Base `/api` + `/auth/api/userAuth/register` | Base `https://interviewiq-backend-ecex.onrender.com` + `/api/auth/register` |
| Base `/api` + `/user/profile` (via Next rewrite) | Base Render origin + `/api/user/profile` |
| `next.config.ts` rewrite `/api/auth/api/:path*` | Removed (no business proxy) |

All `API_ENDPOINTS` values now include a single `/api` segment and match Express mounts in `backend/src/routes/index.js`.

---

## Files modified

| File | Change |
| --- | --- |
| `frontend/.env.local` | Direct Render base URL |
| `frontend/.env.example` | Same; removed unused `BACKEND_INTERNAL_URL` |
| `frontend/src/config/env.ts` | Normalize absolute API origin (strip trailing `/`) |
| `frontend/src/constants/api.ts` | Correct paths; auth → `/api/auth/login|register` |
| `frontend/src/lib/axios.ts` | Direct base URL + Bearer interceptor |
| `frontend/src/lib/auth-token.ts` | **New** — localStorage access token helpers |
| `frontend/src/features/auth/api/auth.service.ts` | Persist JWT from login/register; session mirror |
| `frontend/src/app/api/auth/session/route.ts` | **New** — httpOnly cookie for Next middleware |
| `frontend/src/app/api/auth/logout/route.ts` | Cookie clear (sameSite lax) |
| `frontend/next.config.ts` | Removed broken `/api` rewrites |

Feature services already used `apiClient` exclusively (no second Axios instance).

---

## Environment variables corrected

```env
NEXT_PUBLIC_APP_NAME=InterviewIQ
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=https://interviewiq-backend-ecex.onrender.com
NEXT_PUBLIC_AI_INTERVIEW_URL=https://ai-interview.interviewiq.app
```

**Do not** set `NEXT_PUBLIC_API_BASE_URL=/api` anymore.

---

## Final Base URL

```text
https://interviewiq-backend-ecex.onrender.com
```

---

## Sample request URLs

| Action | Final URL |
| --- | --- |
| Register | `POST https://interviewiq-backend-ecex.onrender.com/api/auth/register` |
| Login | `POST https://interviewiq-backend-ecex.onrender.com/api/auth/login` |
| Profile | `GET https://interviewiq-backend-ecex.onrender.com/api/user/profile` |
| Dashboard | `GET https://interviewiq-backend-ecex.onrender.com/api/dashboard` |
| Modules | `GET https://interviewiq-backend-ecex.onrender.com/api/modules/slug/:slug` |
| Tests | `GET https://interviewiq-backend-ecex.onrender.com/api/tests` |
| HR categories | `GET https://interviewiq-backend-ecex.onrender.com/api/hr/categories` |
| Reports overview | `GET https://interviewiq-backend-ecex.onrender.com/api/reports/overview` |

Same-origin Next helpers (not proxied to Render):

| Action | URL |
| --- | --- |
| Mirror JWT cookie | `POST http://localhost:3000/api/auth/session` |
| Clear cookie | `POST http://localhost:3000/api/auth/logout` |

---

## Sample response

Successful register/login (backend):

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "user"
  }
}
```

Frontend then:

1. Stores `token` in `localStorage` (`interviewiq_access_token`)
2. Sends `Authorization: Bearer <jwt>` on subsequent API calls
3. Calls `POST /api/auth/session` so Next middleware can read the httpOnly `token` cookie

---

## Any remaining issues

1. **Restart the Next.js dev server** after `.env.local` changes (`NEXT_PUBLIC_*` is baked in at startup).
2. **Cross-origin cookies from Render are not used for API auth.** Backend sets `sameSite: 'strict'` cookies; those are unreliable from `localhost:3000` → Render. Bearer token from the JSON body is the supported path (backend `verifyToken` already accepts `Authorization`).
3. **CORS:** Deployed backend currently allows `http://localhost:3000` and `http://localhost:5173`. Production frontend origins must be added on the backend later (out of scope — backend not modified).
4. **Intentional `localhost:3000/api/auth/*`:** Only session + logout Next routes. No remaining business API traffic to `localhost:3000/api/...`.

---

## Final search checklist

- [x] Single `axios.create` in `src/lib/axios.ts`
- [x] No `/api/auth/api/userAuth` paths in `src/`
- [x] No `NEXT_PUBLIC_API_BASE_URL=/api`
- [x] No Next rewrite proxy for business APIs
- [x] Auth / dashboard / aptitude / tests / HR / reports / profile all use `apiClient`
