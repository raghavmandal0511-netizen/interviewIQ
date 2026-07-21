# API Integration Guide

This foundation prepares HTTP integration. **No live API calls are implemented yet.**

## Principles

1. Components never import `axios` or `apiClient` directly.
2. All HTTP lives in `src/services` or `src/features/<feature>/api`.
3. Server state is accessed through TanStack Query hooks in `features/*/hooks`.
4. Endpoint paths come from `@/constants/api`.
5. Query keys come from `@/constants/query-keys`.

## Axios Instance

Location: `src/lib/axios.ts`

```ts
import { apiClient } from "@/lib/axios";
```

Configured with:

- `baseURL` from `@/config/env` → absolute Render origin  
  (`https://interviewiq-backend-ecex.onrender.com`)
- Endpoint paths from `@/constants/api` already include `/api/...`
- JSON headers + `withCredentials: true`
- Request interceptor attaches `Authorization: Bearer <token>`
- Response interceptor maps errors and clears session on 401/403

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_NAME` | Product name |
| `NEXT_PUBLIC_APP_URL` | Frontend origin |
| `NEXT_PUBLIC_API_BASE_URL` | Backend origin (no trailing slash, no `/api` suffix) |

Example:

```env
NEXT_PUBLIC_API_BASE_URL=https://interviewiq-backend-ecex.onrender.com
```

Access env only through `@/config/env`.

See also: `API_AUDIT_REPORT.md`.

## Recommended Call Flow

```text
Component / Page
  → Feature Hook (React Query)
    → Feature API / Service
      → apiClient (Axios)
        → Backend
```

### Example Shape (not implemented)

```ts
// src/features/profile/api/get-profile.ts
import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { ApiResponse } from "@/types";
import type { User } from "@/types/auth";

export async function getProfile() {
  const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.profile);
  return response.data;
}
```

```ts
// src/features/profile/hooks/use-profile.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { getProfile } from "@/features/profile/api/get-profile";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile.me,
    queryFn: getProfile,
  });
}
```

## Auth Token Wiring (TODO)

When auth is implemented:

1. Persist token in HTTP-only cookie named `interviewiq_access_token` (middleware already checks this name), **or** update middleware to match backend cookie.
2. Attach bearer token in `apiClient` request interceptor if needed.
3. Map 401 responses to logout + redirect.

## Error Handling (TODO)

Centralize Axios error mapping in `src/lib/axios.ts` or a dedicated `src/lib/api-error.ts`, then surface user feedback via Sonner toasts from mutation hooks — never from raw Axios calls in components.

## Types

Shared API envelopes live in `src/types/api.ts`:

- `ApiSuccessResponse<T>`
- `ApiErrorResponse`
- `ApiResponse<T>`
- `PaginatedData<T>`
