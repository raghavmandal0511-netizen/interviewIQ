/**
 * Application route path constants.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  contact: "/contact",
  features: "/features",
  login: "/login",
  signup: "/signup",
  dashboard: {
    root: "/dashboard",
    generalAptitude: "/dashboard/general-aptitude",
    arithmetic: "/dashboard/general-aptitude/arithmetic",
    logical: "/dashboard/general-aptitude/logical",
    verbal: "/dashboard/general-aptitude/verbal",
    tests: "/dashboard/tests",
    interview: "/dashboard/interview",
    interviewHr: "/dashboard/interview/hr",
    interviewAi: "/dashboard/interview/ai",
    reports: "/dashboard/reports",
    profile: "/dashboard/profile",
    profileEdit: "/dashboard/profile/edit",
  },
} as const;

export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;
export const AUTH_ROUTES = [ROUTES.login, ROUTES.signup] as const;
