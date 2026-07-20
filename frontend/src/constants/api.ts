/**
 * API endpoint path constants (relative to apiBaseUrl `/api`).
 */
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/api/userAuth/login",
    register: "/auth/api/userAuth/register",
    logout: "/auth/logout",
  },
  user: {
    profile: "/user/profile",
    displayName: "/user/profile/display-name",
    bio: "/user/profile/bio",
    targetRole: "/user/career/target-role",
    skills: "/user/career/skills",
    education: "/user/career/education",
    educationById: (id: string) => `/user/career/education/${id}`,
    experience: "/user/career/experience",
    experienceById: (id: string) => `/user/career/experience/${id}`,
    github: "/user/social/github",
    linkedin: "/user/social/linkedin",
    portfolio: "/user/social/portfolio",
  },
  categories: "/categories",
  modules: "/modules",
  topics: "/topics",
  theories: "/theories",
  theoryByTopic: (topicId: string) => `/theories/topic/${topicId}`,
  exercises: "/exercises",
  questions: "/questions",
  tests: "/tests",
  attempts: {
    root: "/attempts",
    start: "/attempts/start",
    resume: (attemptId: string) => `/attempts/${attemptId}/resume`,
    answers: (attemptId: string) => `/attempts/${attemptId}/answers`,
    submit: (attemptId: string) => `/attempts/${attemptId}/submit`,
    autoSubmit: (attemptId: string) => `/attempts/${attemptId}/auto-submit`,
    result: (attemptId: string) => `/attempts/${attemptId}/result`,
    question: (attemptId: string, order: number) =>
      `/attempts/${attemptId}/questions/${order}`,
  },
  topicProgress: {
    root: "/topic-progress",
    byTopic: (topicId: string) => `/topic-progress/topic/${topicId}`,
    theory: (topicId: string) => `/topic-progress/topic/${topicId}/theory`,
    exercise: (topicId: string) => `/topic-progress/topic/${topicId}/exercise`,
  },
  dashboard: "/dashboard",
  reports: {
    overview: "/reports/overview",
    tests: "/reports/tests",
    testDetail: (attemptId: string) => `/reports/tests/${attemptId}`,
    topics: "/reports/topics",
    modules: "/reports/modules",
    weakTopics: "/reports/weak-topics",
    strongTopics: "/reports/strong-topics",
    performance: "/reports/performance",
    hr: "/reports/hr",
  },
  hr: {
    categories: "/hr/categories",
    questions: "/hr/questions",
    answers: "/hr/answers",
  },
} as const;

/** Auth cookie set by the Express backend (httpOnly). */
export const AUTH_COOKIE_NAME = "token";
