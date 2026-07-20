/**
 * TanStack Query key factory.
 * Use these keys for all server-state queries/mutations.
 */
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  categories: {
    all: ["categories"] as const,
    detail: (id: string) => ["categories", id] as const,
  },
  topics: {
    all: ["topics"] as const,
    detail: (slug: string) => ["topics", slug] as const,
  },
  tests: {
    all: ["tests"] as const,
    detail: (id: string) => ["tests", id] as const,
    result: (id: string) => ["tests", id, "result"] as const,
  },
  reports: {
    all: ["reports"] as const,
  },
  profile: {
    me: ["profile", "me"] as const,
  },
} as const;
