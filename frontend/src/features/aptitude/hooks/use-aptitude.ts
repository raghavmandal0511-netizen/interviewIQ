"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { aptitudeService } from "@/features/aptitude/api/aptitude.service";

export type AptitudeModuleKey = "arithmetic" | "logical" | "verbal";

export const MODULE_SLUGS: Record<AptitudeModuleKey, string> = {
  arithmetic: "arithmetic-aptitude",
  logical: "logical-reasoning",
  verbal: "verbal-reasoning",
};

export function useModuleByKey(moduleKey: AptitudeModuleKey) {
  const slug = MODULE_SLUGS[moduleKey];

  return useQuery({
    queryKey: queryKeys.modules.slug(slug),
    queryFn: () => aptitudeService.getModuleBySlug(slug),
  });
}

export function useTopicsByModule(moduleId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.topics.all({ moduleId }),
    queryFn: () => aptitudeService.getTopics({ moduleId }),
    enabled: Boolean(moduleId),
  });
}

export function useTopicBySlug(
  topicSlug: string,
  moduleId: string | undefined,
) {
  return useQuery({
    queryKey: queryKeys.topics.slug(`${moduleId ?? "none"}:${topicSlug}`),
    queryFn: () => aptitudeService.getTopicBySlug(topicSlug, moduleId),
    enabled: Boolean(topicSlug && moduleId),
  });
}

export function useTheoryByTopic(topicId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.theories.byTopic(topicId ?? ""),
    queryFn: () => aptitudeService.getTheoryByTopic(topicId!),
    enabled: Boolean(topicId),
  });
}

export function useExercisesByTopic(topicId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.exercises.byTopic(topicId ?? ""),
    queryFn: () => aptitudeService.getExercisesByTopic(topicId!),
    enabled: Boolean(topicId),
  });
}

export function useQuestionsByExercise(exerciseId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.questions.byExercise(exerciseId ?? ""),
    queryFn: () => aptitudeService.getQuestionsByExercise(exerciseId!),
    enabled: Boolean(exerciseId),
  });
}

export function useTopicProgress(topicId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.topicProgress.byTopic(topicId ?? ""),
    queryFn: () => aptitudeService.getTopicProgress(topicId!),
    enabled: Boolean(topicId),
    retry: false,
  });
}

export function useMarkTheoryComplete(topicId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => aptitudeService.markTheoryComplete(topicId!),
    onSuccess: () => {
      if (topicId) {
        void queryClient.invalidateQueries({
          queryKey: queryKeys.topicProgress.byTopic(topicId),
        });
      }
      toast.success("Theory marked as complete");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Could not update theory progress");
    },
  });
}

export function useMarkExerciseComplete(topicId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => aptitudeService.markExerciseComplete(topicId!),
    onSuccess: () => {
      if (topicId) {
        void queryClient.invalidateQueries({
          queryKey: queryKeys.topicProgress.byTopic(topicId),
        });
      }
      toast.success("Practice marked as complete");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Could not update practice progress");
    },
  });
}
