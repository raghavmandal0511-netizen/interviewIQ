import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "@/lib/axios";
import type {
  AttemptResult,
  AttemptSession,
  ResumeAttemptResponse,
  TestDetail,
  TestListItem,
} from "@/features/tests/types";

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

async function unwrapPatch<T>(
  promise: ReturnType<typeof apiClient.patch<ApiResponse<T>>>,
): Promise<T> {
  const response = await promise;
  return response.data.data;
}

export const testsService = {
  async listTests(params?: Record<string, string | number>): Promise<TestListItem[]> {
    return unwrap(
      apiClient.get<ApiResponse<TestListItem[]>>(API_ENDPOINTS.tests, { params }),
    );
  },

  async getTest(testId: string): Promise<TestDetail> {
    return unwrap(apiClient.get<ApiResponse<TestDetail>>(`${API_ENDPOINTS.tests}/${testId}`));
  },

  async startAttempt(testId: string): Promise<AttemptSession> {
    return unwrapPost(
      apiClient.post<ApiResponse<AttemptSession>>(API_ENDPOINTS.attempts.start, { testId }),
    );
  },

  async resumeAttempt(attemptId: string): Promise<ResumeAttemptResponse> {
    return unwrap(
      apiClient.get<ApiResponse<ResumeAttemptResponse>>(API_ENDPOINTS.attempts.resume(attemptId)),
    );
  },

  async saveAnswer(
    attemptId: string,
    payload: { questionId: string; selectedOption: string; timeTaken?: number },
  ): Promise<{ autoSubmitted: boolean; timer?: { remainingSeconds: number; isExpired: boolean } }> {
    return unwrapPatch(
      apiClient.patch(API_ENDPOINTS.attempts.answers(attemptId), payload),
    );
  },

  async submitAttempt(attemptId: string): Promise<AttemptResult> {
    return unwrapPost(
      apiClient.post<ApiResponse<AttemptResult>>(API_ENDPOINTS.attempts.submit(attemptId)),
    );
  },

  async autoSubmitAttempt(attemptId: string): Promise<AttemptResult> {
    return unwrapPost(
      apiClient.post<ApiResponse<AttemptResult>>(API_ENDPOINTS.attempts.autoSubmit(attemptId)),
    );
  },

  async getResult(attemptId: string): Promise<AttemptResult> {
    return unwrap(
      apiClient.get<ApiResponse<AttemptResult>>(API_ENDPOINTS.attempts.result(attemptId)),
    );
  },
};
