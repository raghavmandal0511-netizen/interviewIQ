/**
 * Environment configuration.
 * Never access process.env directly outside this module.
 */
function normalizeApiBaseUrl(raw: string | undefined): string {
  const fallback = "https://interviewiq-backend-ecex.onrender.com";
  const value = (raw ?? fallback).trim().replace(/\/+$/, "");
  return value || fallback;
}

export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "InterviewIQ",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  /**
   * Absolute backend origin (no trailing slash, no `/api` suffix).
   * Endpoint paths in `API_ENDPOINTS` already include `/api/...`.
   */
  apiBaseUrl: normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL),
  aiInterviewUrl:
    process.env.NEXT_PUBLIC_AI_INTERVIEW_URL ??
    "https://ai-interview.interviewiq.app",
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDevelopment: process.env.NODE_ENV !== "production",
  isProduction: process.env.NODE_ENV === "production",
} as const;

export type Env = typeof env;
