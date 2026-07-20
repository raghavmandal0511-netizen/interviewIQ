/**
 * TanStack Query key factory.
 */
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  dashboard: {
    root: ["dashboard"] as const,
  },
  categories: {
    all: (params?: Record<string, unknown>) =>
      ["categories", params ?? {}] as const,
    detail: (id: string) => ["categories", id] as const,
    slug: (slug: string) => ["categories", "slug", slug] as const,
  },
  modules: {
    all: (params?: Record<string, unknown>) =>
      ["modules", params ?? {}] as const,
    detail: (id: string) => ["modules", id] as const,
    slug: (slug: string) => ["modules", "slug", slug] as const,
  },
  topics: {
    all: (params?: Record<string, unknown>) =>
      ["topics", params ?? {}] as const,
    detail: (id: string) => ["topics", id] as const,
    slug: (slug: string) => ["topics", "slug", slug] as const,
  },
  theories: {
    byTopic: (topicId: string) => ["theories", "topic", topicId] as const,
  },
  exercises: {
    byTopic: (topicId: string) => ["exercises", "topic", topicId] as const,
  },
  questions: {
    byExercise: (exerciseId: string) =>
      ["questions", "exercise", exerciseId] as const,
  },
  tests: {
    all: (params?: Record<string, unknown>) =>
      ["tests", params ?? {}] as const,
    detail: (id: string) => ["tests", id] as const,
  },
  attempts: {
    list: (params?: Record<string, unknown>) =>
      ["attempts", params ?? {}] as const,
    resume: (attemptId: string) => ["attempts", attemptId, "resume"] as const,
    result: (attemptId: string) => ["attempts", attemptId, "result"] as const,
  },
  topicProgress: {
    all: ["topic-progress"] as const,
    byTopic: (topicId: string) => ["topic-progress", topicId] as const,
  },
  reports: {
    overview: ["reports", "overview"] as const,
    tests: (params?: Record<string, unknown>) =>
      ["reports", "tests", params ?? {}] as const,
    testDetail: (attemptId: string) =>
      ["reports", "tests", attemptId] as const,
    topics: (params?: Record<string, unknown>) =>
      ["reports", "topics", params ?? {}] as const,
    modules: ["reports", "modules"] as const,
    weakTopics: ["reports", "weak-topics"] as const,
    strongTopics: ["reports", "strong-topics"] as const,
    performance: ["reports", "performance"] as const,
    hr: (params?: Record<string, unknown>) =>
      ["reports", "hr", params ?? {}] as const,
  },
  profile: {
    me: ["profile", "me"] as const,
  },
  hr: {
    categories: ["hr", "categories"] as const,
    questions: (params?: Record<string, unknown>) =>
      ["hr", "questions", params ?? {}] as const,
    question: (id: string) => ["hr", "questions", id] as const,
  },
} as const;
