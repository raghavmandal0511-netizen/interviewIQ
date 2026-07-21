/**
 * API endpoint path constants.
 * Paths are absolute from the backend origin and always start with `/api`.
 * Combined with `env.apiBaseUrl` (e.g. https://interviewiq-backend-ecex.onrender.com).
 */
export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
  },
  user: {
    profile: "/api/user/profile",
    displayName: "/api/user/profile/display-name",
    bio: "/api/user/profile/bio",
    targetRole: "/api/user/career/target-role",
    skills: "/api/user/career/skills",
    education: "/api/user/career/education",
    educationById: (id: string) => `/api/user/career/education/${id}`,
    experience: "/api/user/career/experience",
    experienceById: (id: string) => `/api/user/career/experience/${id}`,
    github: "/api/user/social/github",
    linkedin: "/api/user/social/linkedin",
    portfolio: "/api/user/social/portfolio",
  },
  categories: "/api/categories",
  modules: "/api/modules",
  topics: "/api/topics",
  theories: "/api/theories",
  theoryByTopic: (topicId: string) => `/api/theories/topic/${topicId}`,
  exercises: "/api/exercises",
  questions: "/api/questions",
  tests: "/api/tests",
  attempts: {
    root: "/api/attempts",
    start: "/api/attempts/start",
    resume: (attemptId: string) => `/api/attempts/${attemptId}/resume`,
    answers: (attemptId: string) => `/api/attempts/${attemptId}/answers`,
    submit: (attemptId: string) => `/api/attempts/${attemptId}/submit`,
    autoSubmit: (attemptId: string) => `/api/attempts/${attemptId}/auto-submit`,
    result: (attemptId: string) => `/api/attempts/${attemptId}/result`,
    question: (attemptId: string, order: number) =>
      `/api/attempts/${attemptId}/questions/${order}`,
  },
  topicProgress: {
    root: "/api/topic-progress",
    byTopic: (topicId: string) => `/api/topic-progress/topic/${topicId}`,
    theory: (topicId: string) => `/api/topic-progress/topic/${topicId}/theory`,
    exercise: (topicId: string) =>
      `/api/topic-progress/topic/${topicId}/exercise`,
  },
  dashboard: "/api/dashboard",
  reports: {
    overview: "/api/reports/overview",
    tests: "/api/reports/tests",
    testDetail: (attemptId: string) => `/api/reports/tests/${attemptId}`,
    topics: "/api/reports/topics",
    modules: "/api/reports/modules",
    weakTopics: "/api/reports/weak-topics",
    strongTopics: "/api/reports/strong-topics",
    performance: "/api/reports/performance",
    hr: "/api/reports/hr",
  },
  hr: {
    categories: "/api/hr/categories",
    questions: "/api/hr/questions",
    answers: "/api/hr/answers",
  },
} as const;

/** Auth cookie set on the Next.js origin (mirrors backend JWT for middleware). */
export const AUTH_COOKIE_NAME = "token";
