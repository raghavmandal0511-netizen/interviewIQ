import type { NextConfig } from "next";

const backendUrl =
  process.env.BACKEND_INTERNAL_URL ?? "http://localhost:5000";

const proxy = (path: string) => ({
  source: `/api/${path}/:path*`,
  destination: `${backendUrl}/api/${path}/:path*`,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      // Exact auth login/register (backend uses nested /api/userAuth paths)
      {
        source: "/api/auth/api/:path*",
        destination: `${backendUrl}/api/auth/api/:path*`,
      },
      proxy("user"),
      proxy("categories"),
      proxy("modules"),
      proxy("topics"),
      proxy("theories"),
      proxy("exercises"),
      proxy("questions"),
      proxy("tests"),
      proxy("test-questions"),
      proxy("attempts"),
      proxy("user-answers"),
      proxy("topic-progress"),
      proxy("hr"),
      proxy("dashboard"),
      proxy("reports"),
    ];
  },
};

export default nextConfig;
