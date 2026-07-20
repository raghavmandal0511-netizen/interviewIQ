/**
 * Environment configuration.
 * Never access process.env directly outside this module.
 */
export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "InterviewIQ",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api",
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDevelopment: process.env.NODE_ENV !== "production",
  isProduction: process.env.NODE_ENV === "production",
} as const;

export type Env = typeof env;
