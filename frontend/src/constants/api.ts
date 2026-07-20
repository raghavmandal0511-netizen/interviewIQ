/**
 * API endpoint path constants.
 * Do not hardcode paths in services or components.
 */
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },
  categories: "/categories",
  modules: "/modules",
  topics: "/topics",
  theory: "/theory",
  exercises: "/exercises",
  questions: "/questions",
  tests: "/tests",
  attempts: "/attempts",
  reports: "/reports",
  hr: {
    categories: "/hr/categories",
    questions: "/hr/questions",
  },
  profile: "/profile",
} as const;
