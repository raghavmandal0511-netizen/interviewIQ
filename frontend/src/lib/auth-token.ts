/**
 * Client-side access token helpers.
 * Backend JWT is returned in the login/register JSON body and accepted via
 * `Authorization: Bearer <token>` (cross-origin cookies to Render do not work
 * reliably from localhost). Middleware still mirrors the token in an httpOnly
 * cookie on the Next.js origin via `/api/auth/session`.
 */
const ACCESS_TOKEN_KEY = "interviewiq_access_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (!token) {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      return;
    }
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // ignore quota / private mode failures
  }
}

export function clearAccessToken(): void {
  setAccessToken(null);
}
