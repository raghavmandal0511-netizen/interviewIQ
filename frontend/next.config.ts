import type { NextConfig } from "next";

/**
 * API calls go directly to NEXT_PUBLIC_API_BASE_URL (Render).
 * No `/api` rewrite proxy is required for business endpoints.
 * Only same-origin Next routes under `/api/auth/session` and
 * `/api/auth/logout` run inside this Next.js app.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
