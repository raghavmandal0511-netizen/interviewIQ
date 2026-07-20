import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "@/lib/axios";

export type ReportsOverview = {
  overallProgress: number;
  testsAttempted: number;
  testsCompleted: number;
  questionsSolved: number;
  averageAccuracy: number;
  averageScore: number;
  highestScore: number;
  currentStreak: number;
  completedTopics: number;
  completedTheory: number;
  completedExercises: number;
  hoursPracticed: number;
  hrQuestionsAnswered: number;
};

export type ReportTestHistoryItem = {
  attemptId: string;
  testName: string;
  testId: string;
  score: number;
  percentage: number;
  accuracy: number;
  correct: number;
  wrong: number;
  unanswered: number;
  timeTaken: number;
  attemptDate: string;
  status: "COMPLETED" | "EXPIRED";
};

export type ReportModuleProgress = {
  moduleName: string;
  moduleId: string | null;
  completedTopics: number;
  totalTopics: number;
  completionPercentage: number;
  averageAccuracy: number;
  averageScore: number;
};

export type ReportTopicItem = {
  _id: string;
  topicId: string;
  topicName: string;
  module: string;
  moduleId: string;
  completionPercentage: number;
  accuracy: number;
  averageTime: number;
  attempts: number;
  theoryCompleted: boolean;
  exerciseCompleted: boolean;
  lastVisited: string;
};

export type ReportTopicStrength = {
  _id: string;
  topicId: string;
  topicName: string;
  moduleName: string;
  accuracy: number;
  completionPercentage: number;
  totalAttempts: number;
  averageTime: number;
};

export type ReportsPerformance = {
  dailyPractice: Array<{
    date: string;
    label: string;
    testsTaken: number;
    questionsSolved: number;
    averageScore: number;
    averageAccuracy: number;
  }>;
  weeklyPractice: Array<{
    year: number;
    week: number;
    label: string;
    testsTaken: number;
    questionsSolved: number;
    averageScore: number;
    averageAccuracy: number;
  }>;
  monthlyPractice: Array<{
    month: string;
    label: string;
    testsTaken: number;
    questionsSolved: number;
    averageScore: number;
    averageAccuracy: number;
  }>;
  summary: {
    averageAccuracy: number;
    averageScore: number;
    questionsSolved: number;
    testsTaken: number;
  };
};

export type ReportsHrProgress = {
  questionsAnswered: number;
  latestAnswers: Array<{
    answerId: string;
    questionId: string;
    question: string;
    category: string;
    answer: string;
    submittedAt: string;
  }>;
  answerHistory: Array<{
    answerId: string;
    questionId: string;
    question: string;
    category: string;
    answer: string;
    submittedAt: string;
  }>;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

async function unwrap<T>(promise: ReturnType<typeof apiClient.get<ApiResponse<T>>>): Promise<T> {
  const response = await promise;
  return response.data.data;
}

export const reportsService = {
  async getOverview(): Promise<ReportsOverview> {
    return unwrap(apiClient.get<ApiResponse<ReportsOverview>>(API_ENDPOINTS.reports.overview));
  },

  async getTestHistory(params?: Record<string, string | number>): Promise<ReportTestHistoryItem[]> {
    return unwrap(
      apiClient.get<ApiResponse<ReportTestHistoryItem[]>>(API_ENDPOINTS.reports.tests, { params }),
    );
  },

  async getModuleProgress(): Promise<ReportModuleProgress[]> {
    return unwrap(
      apiClient.get<ApiResponse<ReportModuleProgress[]>>(API_ENDPOINTS.reports.modules),
    );
  },

  async getWeakTopics(): Promise<ReportTopicStrength[]> {
    return unwrap(
      apiClient.get<ApiResponse<ReportTopicStrength[]>>(API_ENDPOINTS.reports.weakTopics),
    );
  },

  async getStrongTopics(): Promise<ReportTopicStrength[]> {
    return unwrap(
      apiClient.get<ApiResponse<ReportTopicStrength[]>>(API_ENDPOINTS.reports.strongTopics),
    );
  },

  async getPerformance(): Promise<ReportsPerformance> {
    return unwrap(
      apiClient.get<ApiResponse<ReportsPerformance>>(API_ENDPOINTS.reports.performance),
    );
  },

  async getHrProgress(params?: Record<string, string | number>): Promise<ReportsHrProgress> {
    return unwrap(
      apiClient.get<ApiResponse<ReportsHrProgress>>(API_ENDPOINTS.reports.hr, { params }),
    );
  },

  async getTopicProgress(params?: Record<string, string | number>): Promise<ReportTopicItem[]> {
    return unwrap(
      apiClient.get<ApiResponse<ReportTopicItem[]>>(API_ENDPOINTS.reports.topics, { params }),
    );
  },
};
