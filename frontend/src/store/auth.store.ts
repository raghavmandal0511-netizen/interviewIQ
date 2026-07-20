import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/auth";

export type TestResultItem = {
  id: string;
  name: string;
  category: string;
  score: string;
  accuracy: number;
  date: string;
  status: string;
};

export type InterviewFeedbackItem = {
  id: string;
  title: string;
  date: string;
  rating: string;
  feedback: string;
  type: string;
  href: string;
};

export type UserProgress = {
  testsTaken: number;
  accuracyRate: number;
  topicsCompleted: number;
  streakDays: number;
  problemsSolved: number;
  mockInterviews: number;
  overallProgressPercent: number;
  recentTests: TestResultItem[];
  recentInterviews: InterviewFeedbackItem[];
  unlockedAchievements: string[];
};

export const emptyProgress: UserProgress = {
  testsTaken: 0,
  accuracyRate: 0,
  topicsCompleted: 0,
  streakDays: 0,
  problemsSolved: 0,
  mockInterviews: 0,
  overallProgressPercent: 0,
  recentTests: [],
  recentInterviews: [],
  unlockedAchievements: [],
};

export const demoProgress: UserProgress = {
  testsTaken: 12,
  accuracyRate: 78,
  topicsCompleted: 24,
  streakDays: 7,
  problemsSolved: 142,
  mockInterviews: 4,
  overallProgressPercent: 72,
  recentTests: [
    {
      id: "test-1",
      name: "Quantitative Aptitude Mock #1",
      category: "Arithmetic",
      score: "88/100",
      accuracy: 88,
      date: "Jul 20, 2026",
      status: "Passed",
    },
    {
      id: "test-2",
      name: "Logical Reasoning Speed Test",
      category: "Logical",
      score: "42/50",
      accuracy: 84,
      date: "Jul 18, 2026",
      status: "Passed",
    },
    {
      id: "test-3",
      name: "Full Length Placement Exam",
      category: "All-in-One",
      score: "65/100",
      accuracy: 65,
      date: "Jul 14, 2026",
      status: "Average",
    },
  ],
  recentInterviews: [
    {
      id: "int-1",
      title: "AI Technical Mock Interview (Fullstack)",
      date: "Jul 19, 2026",
      rating: "4.8/5.0",
      feedback: "Excellent technical depth in React & Node.js architecture. Speak slightly slower during system design.",
      type: "AI Interview",
      href: "/dashboard/interview/ai",
    },
    {
      id: "int-2",
      title: "HR Behavioral Interview Practice",
      date: "Jul 16, 2026",
      rating: "4.5/5.0",
      feedback: "Strong STAR format framing. Good posture and clear articulation of career goals.",
      type: "HR Interview",
      href: "/dashboard/interview/hr",
    },
  ],
  unlockedAchievements: ["ach-1", "ach-2", "ach-3"],
};

type AuthState = {
  user: User | null;
  targetRole: string;
  accessToken: string | null;
  isAuthenticated: boolean;
  progress: UserProgress;
  setUser: (user: User | null) => void;
  setTargetRole: (role: string) => void;
  login: (payload: { user: User; accessToken: string; isNewUser?: boolean }) => void;
  logout: () => void;
  resetProgressToZero: () => void;
  loadDemoProgress: () => void;
  updateProgress: (newProgress: Partial<UserProgress>) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      targetRole: "Software Engineer Candidate",
      accessToken: "demo_token",
      isAuthenticated: true,
      // DEFAULT STATE MUST BE emptyProgress (ALL 0s)
      progress: emptyProgress,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: Boolean(user),
        }),
      setTargetRole: (targetRole) => set({ targetRole }),
      login: ({ user, accessToken, isNewUser }) => {
        if (typeof document !== "undefined") {
          document.cookie = `interviewiq_access_token=${accessToken}; path=/; max-age=86400`;
        }
        set({
          user,
          accessToken,
          isAuthenticated: true,
          progress: isNewUser ? emptyProgress : (user.name === "John Doe" ? demoProgress : emptyProgress),
        });
      },
      logout: () => {
        if (typeof document !== "undefined") {
          document.cookie =
            "interviewiq_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          progress: emptyProgress,
        });
      },
      resetProgressToZero: () => set({ progress: emptyProgress }),
      loadDemoProgress: () => set({ progress: demoProgress }),
      updateProgress: (newProgress) =>
        set((state) => ({
          progress: { ...state.progress, ...newProgress },
        })),
    }),
    {
      name: "interviewiq_auth_storage_v3",
    }
  )
);
