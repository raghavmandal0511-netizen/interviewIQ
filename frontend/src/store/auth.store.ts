import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/auth";

type AuthState = {
  user: User | null;
  targetRole: string;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTargetRole: (role: string) => void;
  login: (payload: { user: User; accessToken: string }) => void;
  logout: () => void;
};

const defaultUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "user",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: defaultUser,
      targetRole: "Senior Fullstack Software Engineer Candidate",
      accessToken: "demo_token",
      isAuthenticated: true,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: Boolean(user),
        }),
      setTargetRole: (targetRole) => set({ targetRole }),
      login: ({ user, accessToken }) => {
        // Set cookie for Next.js middleware protection
        if (typeof document !== "undefined") {
          document.cookie = `interviewiq_access_token=${accessToken}; path=/; max-age=86400`;
        }
        set({
          user,
          accessToken,
          isAuthenticated: true,
        });
      },
      logout: () => {
        // Clear cookie
        if (typeof document !== "undefined") {
          document.cookie =
            "interviewiq_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "interviewiq_auth_storage",
    }
  )
);
