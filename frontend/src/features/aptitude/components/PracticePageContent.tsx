"use client";

import { useCallback, useRef } from "react";

import { EmptyState, ErrorState, PageSkeleton } from "@/components/shared/states";
import { aptitudeModulePath, topicPath } from "@/constants/routes";
import { QuestionPlayer } from "@/features/aptitude/components/QuestionPlayer";
import {
  useExercisesByTopic,
  useMarkExerciseComplete,
  useModuleByKey,
  useQuestionsByExercise,
  useTopicBySlug,
  type AptitudeModuleKey,
} from "@/features/aptitude/hooks";

type PracticePageContentProps = {
  moduleKey: AptitudeModuleKey;
  topicSlug: string;
};

export function PracticePageContent({ moduleKey, topicSlug }: PracticePageContentProps) {
  const completionSent = useRef(false);
  const { data: moduleData, isLoading: moduleLoading } = useModuleByKey(moduleKey);
  const {
    data: topic,
    isLoading: topicLoading,
    isError: topicError,
    refetch: refetchTopic,
  } = useTopicBySlug(topicSlug, moduleData?._id);
  const {
    data: exercises,
    isLoading: exercisesLoading,
    isError: exercisesError,
    refetch: refetchExercises,
  } = useExercisesByTopic(topic?._id);

  const primaryExercise = exercises?.[0];
  const {
    data: questions,
    isLoading: questionsLoading,
    isError: questionsError,
    refetch: refetchQuestions,
  } = useQuestionsByExercise(primaryExercise?._id);

  const markExerciseComplete = useMarkExerciseComplete(topic?._id);

  const handleComplete = useCallback(() => {
    if (completionSent.current || !topic?._id) {
      return;
    }
    completionSent.current = true;
    markExerciseComplete.mutate();
  }, [markExerciseComplete, topic?._id]);

  const isLoading =
    moduleLoading || topicLoading || exercisesLoading || questionsLoading;
  const isError = topicError || exercisesError || questionsError;

  if (isLoading) {
    return <PageSkeleton rows={2} className="pb-12 max-w-3xl mx-auto" />;
  }

  if (isError || !topic) {
    return (
      <ErrorState
        title="Could not load practice"
        message="Practice questions for this topic could not be loaded."
        onRetry={() => {
          void refetchTopic();
          void refetchExercises();
          void refetchQuestions();
        }}
      />
    );
  }

  if (!primaryExercise || !questions?.length) {
    return (
      <EmptyState
        title="No practice questions yet"
        description="Questions for this topic have not been published yet. Check back later or review the theory section."
      />
    );
  }

  return (
    <QuestionPlayer
      topicName={topic.name}
      questions={questions}
      backHref={topicPath(moduleKey, topicSlug)}
      moduleHref={aptitudeModulePath(moduleKey)}
      onComplete={handleComplete}
      isCompleting={markExerciseComplete.isPending}
    />
  );
}
