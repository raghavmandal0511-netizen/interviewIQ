import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import {
  mapBackendUser,
  type BackendUser,
  type EducationInput,
  type ExperienceInput,
  type User,
} from "@/types/auth";

type UserResponse = { success: boolean; user: BackendUser };

async function unwrapUser(
  promise: Promise<{ data: UserResponse }>,
): Promise<User> {
  const { data } = await promise;
  return mapBackendUser(data.user);
}

export const profileService = {
  fetchProfile: () =>
    unwrapUser(apiClient.get<UserResponse>(API_ENDPOINTS.user.profile)),

  updateDisplayName: (displayName: string) =>
    unwrapUser(
      apiClient.patch<UserResponse>(API_ENDPOINTS.user.displayName, {
        profile: { displayName },
      }),
    ),

  updateBio: (bio: string) =>
    unwrapUser(
      apiClient.patch<UserResponse>(API_ENDPOINTS.user.bio, {
        profile: { bio },
      }),
    ),

  updateTargetRole: (targetRole: string) =>
    unwrapUser(
      apiClient.patch<UserResponse>(API_ENDPOINTS.user.targetRole, {
        career: { targetRole },
      }),
    ),

  updateSkills: (skills: string[]) =>
    unwrapUser(
      apiClient.patch<UserResponse>(API_ENDPOINTS.user.skills, {
        career: { skills },
      }),
    ),

  updateGithub: (github: string) =>
    unwrapUser(
      apiClient.patch<UserResponse>(API_ENDPOINTS.user.github, {
        socialLinks: { github },
      }),
    ),

  updateLinkedIn: (linkedIn: string) =>
    unwrapUser(
      apiClient.patch<UserResponse>(API_ENDPOINTS.user.linkedin, {
        socialLinks: { linkedIn },
      }),
    ),

  updatePortfolio: (portfolio: string) =>
    unwrapUser(
      apiClient.patch<UserResponse>(API_ENDPOINTS.user.portfolio, {
        socialLinks: { portfolio },
      }),
    ),

  addEducation: (education: EducationInput) =>
    unwrapUser(
      apiClient.post<UserResponse>(API_ENDPOINTS.user.education, {
        career: { education },
      }),
    ),

  updateEducation: (educationId: string, education: Partial<EducationInput>) =>
    unwrapUser(
      apiClient.patch<UserResponse>(API_ENDPOINTS.user.educationById(educationId), {
        career: { education },
      }),
    ),

  deleteEducation: (educationId: string) =>
    unwrapUser(
      apiClient.delete<UserResponse>(API_ENDPOINTS.user.educationById(educationId)),
    ),

  addExperience: (experience: ExperienceInput) =>
    unwrapUser(
      apiClient.post<UserResponse>(API_ENDPOINTS.user.experience, {
        career: { experience },
      }),
    ),

  updateExperience: (
    experienceId: string,
    experience: Partial<ExperienceInput>,
  ) =>
    unwrapUser(
      apiClient.patch<UserResponse>(
        API_ENDPOINTS.user.experienceById(experienceId),
        { career: { experience } },
      ),
    ),

  deleteExperience: (experienceId: string) =>
    unwrapUser(
      apiClient.delete<UserResponse>(
        API_ENDPOINTS.user.experienceById(experienceId),
      ),
    ),
};
