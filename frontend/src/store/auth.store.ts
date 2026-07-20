import { create } from "zustand";

import type { User } from "@/types/auth";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  login: (payload: { user: User; accessToken: string }) => void;
  logout: () => void;
};

/**
 * Client-only auth UI state.
 * Server state (session fetch) should use TanStack Query.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),
  setAccessToken: (accessToken) => set({ accessToken }),
  login: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
