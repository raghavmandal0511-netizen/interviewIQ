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
    interviewHrFreshers: "/dashboard/interview/hr/freshers",
    interviewHrExperienced: "/dashboard/interview/hr/experienced",
    interviewAi: "/dashboard/interview/ai",
    reports: "/dashboard/reports",
    profile: "/dashboard/profile",
    profileEdit: "/dashboard/profile/edit",
  },
} as const;

export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;
export const AUTH_ROUTES = [ROUTES.login, ROUTES.signup] as const;

export function aptitudeModulePath(
  module: "arithmetic" | "logical" | "verbal",
): string {
  return `${ROUTES.dashboard.generalAptitude}/${module}`;
}

export function topicPath(
  module: "arithmetic" | "logical" | "verbal",
  topicSlug: string,
): string {
  return `${aptitudeModulePath(module)}/${topicSlug}`;
}

export function topicTheoryPath(
  module: "arithmetic" | "logical" | "verbal",
  topicSlug: string,
): string {
  return `${topicPath(module, topicSlug)}/theory`;
}

export function topicPracticePath(
  module: "arithmetic" | "logical" | "verbal",
  topicSlug: string,
): string {
  return `${topicPath(module, topicSlug)}/practice`;
}

export function testInstructionsPath(testId: string): string {
  return `${ROUTES.dashboard.tests}/${testId}/instructions`;
}

export function testAttemptPath(testId: string): string {
  return `${ROUTES.dashboard.tests}/${testId}/attempt`;
}

export function testResultPath(testId: string): string {
  return `${ROUTES.dashboard.tests}/${testId}/result`;
}

export function hrQuestionPath(questionId: string): string {
  return `${ROUTES.dashboard.interviewHr}/question/${questionId}`;
}
