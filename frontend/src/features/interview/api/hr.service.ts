import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "@/lib/axios";

export type HrCategory = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type HrQuestion = {
  _id: string;
  categoryId: {
    _id: string;
    title: string;
    slug: string;
    description?: string;
  };
  question: string;
  sampleAnswer: string;
  keyPoints: string[];
  commonMistakes: string[];
  interviewerTips: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

async function unwrap<T>(promise: ReturnType<typeof apiClient.get<ApiResponse<T>>>): Promise<T> {
  const response = await promise;
  return response.data.data;
}

async function unwrapPost<T>(
  promise: ReturnType<typeof apiClient.post<ApiResponse<T>>>,
): Promise<T> {
  const response = await promise;
  return response.data.data;
}

export const hrService = {
  async getCategories(): Promise<HrCategory[]> {
    return unwrap(apiClient.get<ApiResponse<HrCategory[]>>(API_ENDPOINTS.hr.categories));
  },

  async getQuestions(params?: Record<string, string | number>): Promise<HrQuestion[]> {
    return unwrap(
      apiClient.get<ApiResponse<HrQuestion[]>>(API_ENDPOINTS.hr.questions, { params }),
    );
  },

  async getQuestion(id: string): Promise<HrQuestion> {
    return unwrap(apiClient.get<ApiResponse<HrQuestion>>(`${API_ENDPOINTS.hr.questions}/${id}`));
  },

  async submitAnswer(questionId: string, answer: string) {
    return unwrapPost(
      apiClient.post(API_ENDPOINTS.hr.answers, { questionId, answer }),
    );
  },
};
