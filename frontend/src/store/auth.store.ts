import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/auth";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  clearSession: () => void;
};

/**
 * Client-only auth mirror (profile).
 * Session authenticity is the httpOnly `token` cookie.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: Boolean(user),
        }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      clearSession: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "interviewiq_auth_storage_v4",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
