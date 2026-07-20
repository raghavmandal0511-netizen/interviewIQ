import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import { mapBackendUser, type BackendUser, type User } from "@/types/auth";

type AuthMessageResponse = {
  success?: boolean;
  message?: string;
};

export const authService = {
  async register(data: {
    userName: string;
    email: string;
    password: string;
  }): Promise<void> {
    await apiClient.post<AuthMessageResponse>(
      API_ENDPOINTS.auth.register,
      data,
    );
  },

  async login(data: { email: string; password: string }): Promise<void> {
    await apiClient.post<AuthMessageResponse>(API_ENDPOINTS.auth.login, data);
  },

  async fetchProfile(): Promise<User> {
    const response = await apiClient.get<{ success: boolean; user: BackendUser }>(
      API_ENDPOINTS.user.profile,
    );
    if (!response.data?.user) {
      throw new Error("Profile not found");
    }
    return mapBackendUser(response.data.user);
  },

  async logout(): Promise<void> {
    // Same-origin Next.js route (not proxied) clears the httpOnly cookie.
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  },

  async updateDisplayName(displayName: string): Promise<User> {
    const response = await apiClient.patch<{ success: boolean; user: BackendUser }>(
      API_ENDPOINTS.user.displayName,
      { profile: { displayName } },
    );
    return mapBackendUser(response.data.user);
  },

  async updateBio(bio: string): Promise<User> {
    const response = await apiClient.patch<{ success: boolean; user: BackendUser }>(
      API_ENDPOINTS.user.bio,
      { profile: { bio } },
    );
    return mapBackendUser(response.data.user);
  },

  async updateTargetRole(targetRole: string): Promise<User> {
    const response = await apiClient.patch<{ success: boolean; user: BackendUser }>(
      API_ENDPOINTS.user.targetRole,
      { career: { targetRole } },
    );
    return mapBackendUser(response.data.user);
  },

  async updateSkills(skills: string[]): Promise<User> {
    const response = await apiClient.patch<{ success: boolean; user: BackendUser }>(
      API_ENDPOINTS.user.skills,
      { career: { skills } },
    );
    return mapBackendUser(response.data.user);
  },

  async updateGithub(github: string): Promise<User> {
    const response = await apiClient.patch<{ success: boolean; user: BackendUser }>(
      API_ENDPOINTS.user.github,
      { socialLinks: { github } },
    );
    return mapBackendUser(response.data.user);
  },

  async updateLinkedIn(linkedIn: string): Promise<User> {
    const response = await apiClient.patch<{ success: boolean; user: BackendUser }>(
      API_ENDPOINTS.user.linkedin,
      { socialLinks: { linkedIn } },
    );
    return mapBackendUser(response.data.user);
  },

  async updatePortfolio(portfolio: string): Promise<User> {
    const response = await apiClient.patch<{ success: boolean; user: BackendUser }>(
      API_ENDPOINTS.user.portfolio,
      { socialLinks: { portfolio } },
    );
    return mapBackendUser(response.data.user);
  },
};
