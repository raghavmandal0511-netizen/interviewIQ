/**
 * Environment configuration.
 * Never access process.env directly outside this module.
 */
export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "InterviewIQ",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  /**
   * Same-origin `/api` is proxied to the Express backend via next.config rewrites.
   * This allows the httpOnly `token` cookie to work with Next.js middleware.
   */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  aiInterviewUrl:
    process.env.NEXT_PUBLIC_AI_INTERVIEW_URL ??
    "https://ai-interview.interviewiq.app",
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDevelopment: process.env.NODE_ENV !== "production",
  isProduction: process.env.NODE_ENV === "production",
} as const;

export type Env = typeof env;
