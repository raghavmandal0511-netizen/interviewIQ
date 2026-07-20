"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { testsService } from "@/features/tests/api";
import { ApiError } from "@/lib/axios";

export function useTestsQuery() {
  return useQuery({
    queryKey: queryKeys.tests.all(),
    queryFn: () => testsService.listTests(),
  });
}

export function useTestQuery(testId: string) {
  return useQuery({
    queryKey: queryKeys.tests.detail(testId),
    queryFn: () => testsService.getTest(testId),
    enabled: Boolean(testId),
  });
}

export function useStartAttemptMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (testId: string) => testsService.startAttempt(testId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.attempts.list() });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof ApiError ? error.message : "Could not start test");
    },
  });
}

export function useSaveAnswerMutation(attemptId: string) {
  return useMutation({
    mutationFn: (payload: {
      questionId: string;
      selectedOption: string;
      timeTaken?: number;
    }) => testsService.saveAnswer(attemptId, payload),
    onError: (error: unknown) => {
      toast.error(error instanceof ApiError ? error.message : "Could not save answer");
    },
  });
}

export function useSubmitAttemptMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (attemptId: string) => testsService.submitAttempt(attemptId),
    onSuccess: (_data, attemptId) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.attempts.result(attemptId),
      });
      toast.success("Test submitted");
    },
    onError: (error: unknown) => {
      toast.error(error instanceof ApiError ? error.message : "Submit failed");
    },
  });
}

export function useResumeAttemptQuery(attemptId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.attempts.resume(attemptId),
    queryFn: () => testsService.resumeAttempt(attemptId),
    enabled: Boolean(attemptId) && enabled,
    retry: false,
  });
}

export function useAttemptResultQuery(attemptId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.attempts.result(attemptId),
    queryFn: () => testsService.getResult(attemptId),
    enabled: Boolean(attemptId) && enabled,
  });
}
