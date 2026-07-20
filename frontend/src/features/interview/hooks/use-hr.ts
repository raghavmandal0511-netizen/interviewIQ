"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { hrService } from "@/features/interview/api";
import { ApiError } from "@/lib/axios";

export function useHrCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.hr.categories,
    queryFn: () => hrService.getCategories(),
  });
}

export function useHrQuestionsQuery(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: queryKeys.hr.questions(params),
    queryFn: () => hrService.getQuestions(params),
  });
}

export function useHrQuestionQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.hr.question(id),
    queryFn: () => hrService.getQuestion(id),
    enabled: Boolean(id),
  });
}

export function useSubmitHrAnswerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { questionId: string; answer: string }) =>
      hrService.submitAnswer(payload.questionId, payload.answer),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.reports.hr() });
      toast.success("Answer saved");
    },
    onError: (error: unknown) => {
      toast.error(error instanceof ApiError ? error.message : "Could not save answer");
    },
  });
}
