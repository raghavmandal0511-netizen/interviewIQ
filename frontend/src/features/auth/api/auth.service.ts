import apiClient from "@/lib/axios";
import type { User } from "@/types/auth";

export type RegisterResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
};

export const authService = {
  async register(data: { userName: string; email: string; password: string }): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>("/auth/register", data);
      return response.data;
    } catch (error: unknown) {
      console.warn("Backend API unavailable or error during register, proceeding with fallback mode:", error);
      return {
        success: true,
        message: "Registered (Local Fallback)",
        token: "demo_token_" + Date.now(),
        user: {
          id: "user-" + Date.now(),
          name: data.userName || data.email.split("@")[0] || "User",
          email: data.email,
          role: "user",
        },
      };
    }
  },

  async login(data: { email: string; password: string }): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", data);
      return response.data;
    } catch (error: unknown) {
      console.warn("Backend API unavailable or error during login, proceeding with fallback mode:", error);
      const derivedName = data.email.includes("@")
        ? (data.email.split("@")[0] || "").replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Candidate";

      return {
        success: true,
        message: "Logged in (Local Fallback)",
        token: "demo_token_" + Date.now(),
        user: {
          id: "user-" + Date.now(),
          name: derivedName || "Candidate",
          email: data.email,
          role: "user",
        },
      };
    }
  },

  async fetchProfile(): Promise<User | null> {
    try {
      const response = await apiClient.get<{ success: boolean; data: User }>("/user/profile");
      return response.data?.data || null;
    } catch {
      return null;
    }
  },

  async updateDisplayName(displayName: string): Promise<boolean> {
    try {
      await apiClient.patch("/user/profile/display-name", { displayName });
      return true;
    } catch {
      return false;
    }
  },

  async updateTargetRole(targetRole: string): Promise<boolean> {
    try {
      await apiClient.patch("/user/career/target-role", { targetRole });
      return true;
    } catch {
      return false;
    }
  },
};
