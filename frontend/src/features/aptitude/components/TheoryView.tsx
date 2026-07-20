"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Play,
  Sigma,
} from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/shared/states";
import { topicPath, topicPracticePath } from "@/constants/routes";
import {
  useMarkTheoryComplete,
  useModuleByKey,
  useTheoryByTopic,
  useTopicBySlug,
  useTopicProgress,
  type AptitudeModuleKey,
} from "@/features/aptitude/hooks";

type TheoryViewProps = {
  moduleKey: AptitudeModuleKey;
  topicSlug: string;
};

export function TheoryView({ moduleKey, topicSlug }: TheoryViewProps) {
  const { data: moduleData, isLoading: moduleLoading } = useModuleByKey(moduleKey);
  const {
    data: topic,
    isLoading: topicLoading,
    isError: topicError,
    refetch: refetchTopic,
  } = useTopicBySlug(topicSlug, moduleData?._id);
  const {
    data: theory,
    isLoading: theoryLoading,
    isError: theoryError,
    refetch: refetchTheory,
  } = useTheoryByTopic(topic?._id);
  const { data: progress } = useTopicProgress(topic?._id);
  const markComplete = useMarkTheoryComplete(topic?._id);

  const isLoading = moduleLoading || topicLoading || theoryLoading;
  const isError = topicError || theoryError;

  if (isLoading) {
    return <PageSkeleton rows={3} className="pb-12 max-w-3xl mx-auto" />;
  }

  if (isError || !topic) {
    return (
      <ErrorState
        title="Could not load theory"
        message="This topic or its theory content could not be loaded."
        onRetry={() => {
          void refetchTopic();
          void refetchTheory();
        }}
      />
    );
  }

  if (!theory) {
    return (
      <div className="space-y-6 pb-12 max-w-3xl mx-auto">
        <BackLink moduleKey={moduleKey} topicSlug={topicSlug} topicName={topic.name} />
        <EmptyState
          title="No theory available"
          description="Theory content for this topic has not been published yet."
          action={
            <Link
              href={topicPracticePath(moduleKey, topicSlug)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white hover:bg-[#4d40db]"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              Start Practice
            </Link>
          }
        />
      </div>
    );
  }

  const theoryDone = progress?.completedTheory ?? false;

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <BackLink moduleKey={moduleKey} topicSlug={topicSlug} topicName={topic.name} />

      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {topic.name} — Theory
        </h1>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Study concepts, formulas, and worked examples before practicing questions.
        </p>
      </div>

      {theory.introduction && (
        <DashboardCard title="Introduction">
          <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {theory.introduction}
          </p>
        </DashboardCard>
      )}

      {theory.explanation && (
        <DashboardCard title="Explanation">
          <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {theory.explanation}
          </p>
        </DashboardCard>
      )}

      {!!theory.formulas?.length && (
        <DashboardCard
          title={
            <span className="flex items-center gap-2">
              <Sigma className="h-4 w-4 text-[#5D50EB]" />
              Formulas
            </span>
          }
        >
          <div className="space-y-3">
            {theory.formulas.map((formula, index) => (
              <div
                key={`${formula.title ?? "formula"}-${index}`}
                className="rounded-xl bg-purple-50 p-3 dark:bg-purple-950/40"
              >
                {formula.title && (
                  <p className="text-[11px] font-bold text-[#5D50EB] dark:text-purple-300">
                    {formula.title}
                  </p>
                )}
                <p className="mt-1 font-mono text-xs text-purple-900 dark:text-purple-100">
                  {formula.content}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}

      {!!theory.shortcutTips?.length && (
        <DashboardCard
          title={
            <span className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-[#5D50EB]" />
              Shortcut Tips
            </span>
          }
        >
          <ul className="space-y-2">
            {theory.shortcutTips.map((item, index) => (
              <li
                key={`${item.title ?? "tip"}-${index}`}
                className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-900/50"
              >
                {item.title && (
                  <span className="font-bold text-slate-900 dark:text-white">
                    {item.title}:{" "}
                  </span>
                )}
                <span className="text-slate-600 dark:text-slate-300">{item.tip}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>
      )}

      {!!theory.solvedExamples?.length && (
        <DashboardCard title="Solved Examples">
          <div className="space-y-4">
            {theory.solvedExamples.map((example, index) => (
              <motion.div
                key={`example-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-slate-100 p-4 dark:border-slate-800"
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Problem {index + 1}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {example.problem}
                </p>
                {!!example.steps?.length && (
                  <ol className="mt-3 list-decimal space-y-1 pl-4 text-xs text-slate-500 dark:text-slate-400">
                    {example.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ol>
                )}
                <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                  <span className="font-bold">Solution: </span>
                  {example.solution}
                </div>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          disabled={theoryDone || markComplete.isPending}
          onClick={() => markComplete.mutate()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#4d40db] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CheckCircle2 className="h-4 w-4" />
          {theoryDone ? "Theory Completed" : "Mark Theory Complete"}
        </button>
        <Link
          href={topicPracticePath(moduleKey, topicSlug)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        >
          <Play className="h-4 w-4" />
          Continue to Practice
        </Link>
      </div>
    </div>
  );
}

function BackLink({
  moduleKey,
  topicSlug,
  topicName,
}: {
  moduleKey: AptitudeModuleKey;
  topicSlug: string;
  topicName: string;
}) {
  return (
    <Link
      href={topicPath(moduleKey, topicSlug)}
      className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      <span>Back to {topicName}</span>
    </Link>
  );
}
