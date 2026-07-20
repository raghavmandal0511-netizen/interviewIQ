"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  Sparkles,
} from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/shared/states";
import {
  aptitudeModulePath,
  topicPracticePath,
  topicTheoryPath,
} from "@/constants/routes";
import {
  useModuleByKey,
  useTheoryByTopic,
  useTopicBySlug,
  useTopicProgress,
  type AptitudeModuleKey,
} from "@/features/aptitude/hooks";
import { MODULE_LABELS } from "@/features/aptitude/components/ModuleTopicsPage";

type TopicOverviewPageProps = {
  moduleKey: AptitudeModuleKey;
  topicSlug: string;
};

export function TopicOverviewPage({ moduleKey, topicSlug }: TopicOverviewPageProps) {
  const moduleLabel = MODULE_LABELS[moduleKey];
  const { data: moduleData, isLoading: moduleLoading } = useModuleByKey(moduleKey);
  const {
    data: topic,
    isLoading: topicLoading,
    isError: topicError,
    refetch: refetchTopic,
  } = useTopicBySlug(topicSlug, moduleData?._id);
  const { data: theory, isLoading: theoryLoading } = useTheoryByTopic(topic?._id);
  const { data: progress } = useTopicProgress(topic?._id);

  const isLoading = moduleLoading || topicLoading || theoryLoading;

  if (isLoading) {
    return <PageSkeleton rows={2} className="pb-12 max-w-4xl" />;
  }

  if (topicError || !topic) {
    return (
      <ErrorState
        title="Topic not found"
        message="This topic may have been removed or is not published yet."
        onRetry={() => void refetchTopic()}
      />
    );
  }

  const theoryPreview =
    theory?.introduction?.slice(0, 220) ??
    theory?.explanation?.slice(0, 220) ??
    topic.description ??
    "Review core concepts, formulas, and solved examples before practicing questions.";

  return (
    <div className="space-y-6 pb-12">
      <div>
        <Link
          href={aptitudeModulePath(moduleKey)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to {moduleLabel} Topics</span>
        </Link>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
          {topic.name}
        </h1>
        {topic.description && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {topic.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DashboardCard title="Theory & Concepts">
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p className="leading-relaxed">{theoryPreview}</p>
            {theory?.formulas?.[0] && (
              <div className="rounded-xl bg-purple-50 p-3 font-mono text-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
                {theory.formulas[0].title ? `${theory.formulas[0].title}: ` : ""}
                {theory.formulas[0].content}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {progress?.completedTheory && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" />
                  Theory complete
                </span>
              )}
              {topic.estimatedTime && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                  <Clock className="h-3 w-3" />
                  ~{topic.estimatedTime} min
                </span>
              )}
            </div>
            <Link
              href={topicTheoryPath(moduleKey, topicSlug)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#5D50EB]/30 bg-purple-50 px-5 py-2.5 text-xs font-bold text-[#5D50EB] transition-all hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/40 dark:hover:bg-purple-950/60"
            >
              <BookOpen className="h-4 w-4" />
              <span>Read Theory</span>
            </Link>
          </div>
        </DashboardCard>

        <DashboardCard title="Topic Practice">
          <div className="space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Work through MCQs for this topic and track your completion progress.
            </p>
            {progress?.completedExercise && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                <Sparkles className="h-3 w-3" />
                Practice complete
              </span>
            )}
            <Link
              href={topicPracticePath(moduleKey, topicSlug)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#4d40db]"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Start Practice</span>
            </Link>
          </div>
        </DashboardCard>
      </div>

      {!theory && (
        <EmptyState
          title="Theory coming soon"
          description="Theory content for this topic is not available yet. You can still start practice questions."
          action={
            <Link
              href={topicPracticePath(moduleKey, topicSlug)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white hover:bg-[#4d40db]"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              Go to Practice
            </Link>
          }
        />
      )}
    </div>
  );
}
