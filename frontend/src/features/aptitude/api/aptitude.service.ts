import { apiClient, ApiError } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { PaginatedResponse } from "@/types/api";
import type {
  Exercise,
  LearningModule,
  Question,
  Theory,
  Topic,
  TopicProgress,
} from "@/features/aptitude/types";

type ListParams = Record<string, string | number | boolean | undefined>;

function assertData<T>(data: T | undefined, message: string): T {
  if (data === undefined || data === null) {
    throw new Error(message);
  }
  return data;
}

export const aptitudeService = {
  async getModuleBySlug(slug: string): Promise<LearningModule> {
    const response = await apiClient.get<{ success: boolean; data: LearningModule }>(
      `${API_ENDPOINTS.modules}/slug/${slug}`,
    );
    return assertData(response.data.data, "Module not found");
  },

  async getTopics(params: ListParams = {}): Promise<Topic[]> {
    const response = await apiClient.get<PaginatedResponse<Topic>>(API_ENDPOINTS.topics, {
      params: {
        limit: 100,
        sortBy: "order",
        sortOrder: "asc",
        isPublished: true,
        ...params,
      },
    });
    return response.data.data ?? [];
  },

  async getTopicBySlug(slug: string, moduleId?: string): Promise<Topic> {
    const response = await apiClient.get<{ success: boolean; data: Topic }>(
      `${API_ENDPOINTS.topics}/slug/${slug}`,
      { params: moduleId ? { moduleId } : undefined },
    );
    return assertData(response.data.data, "Topic not found");
  },

  async getTheoryByTopic(topicId: string): Promise<Theory | null> {
    try {
      const response = await apiClient.get<{ success: boolean; data: Theory }>(
        API_ENDPOINTS.theoryByTopic(topicId),
      );
      return response.data.data ?? null;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async getExercisesByTopic(topicId: string): Promise<Exercise[]> {
    const response = await apiClient.get<PaginatedResponse<Exercise>>(
      API_ENDPOINTS.exercises,
      {
        params: {
          topicId,
          isPublished: true,
          limit: 100,
          sortBy: "order",
          sortOrder: "asc",
        },
      },
    );
    return response.data.data ?? [];
  },

  async getQuestionsByExercise(exerciseId: string): Promise<Question[]> {
    const response = await apiClient.get<PaginatedResponse<Question>>(
      API_ENDPOINTS.questions,
      {
        params: {
          exerciseId,
          limit: 100,
          sortBy: "createdAt",
          sortOrder: "asc",
        },
      },
    );
    return response.data.data ?? [];
  },

  async getTopicProgress(topicId: string): Promise<TopicProgress> {
    const response = await apiClient.get<{ success: boolean; data: TopicProgress }>(
      API_ENDPOINTS.topicProgress.byTopic(topicId),
    );
    return assertData(response.data.data, "Topic progress not found");
  },

  async markTheoryComplete(topicId: string): Promise<TopicProgress> {
    const response = await apiClient.patch<{
      success: boolean;
      data: TopicProgress;
    }>(API_ENDPOINTS.topicProgress.theory(topicId));
    return assertData(response.data.data, "Failed to update theory progress");
  },

  async markExerciseComplete(topicId: string): Promise<TopicProgress> {
    const response = await apiClient.patch<{
      success: boolean;
      data: TopicProgress;
    }>(API_ENDPOINTS.topicProgress.exercise(topicId));
    return assertData(response.data.data, "Failed to update exercise progress");
  },
};
