"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, Play, type LucideIcon } from "lucide-react";

import { EmptyState, ErrorState, PageSkeleton } from "@/components/shared/states";
import { ROUTES, topicPath, topicPracticePath } from "@/constants/routes";
import {
  useModuleByKey,
  useTopicsByModule,
  type AptitudeModuleKey,
} from "@/features/aptitude/hooks";

const MODULE_LABELS: Record<AptitudeModuleKey, string> = {
  arithmetic: "Arithmetic",
  logical: "Logical Reasoning",
  verbal: "Verbal Ability",
};

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
  medium: "bg-purple-50 text-[#5D50EB] dark:bg-purple-950 dark:text-purple-300",
  hard: "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300",
};

type ModuleTopicsPageProps = {
  moduleKey: AptitudeModuleKey;
  icon: LucideIcon;
};

export function ModuleTopicsPage({ moduleKey, icon: Icon }: ModuleTopicsPageProps) {
  const moduleLabel = MODULE_LABELS[moduleKey];
  const {
    data: moduleData,
    isLoading: moduleLoading,
    isError: moduleError,
    refetch: refetchModule,
  } = useModuleByKey(moduleKey);
  const {
    data: topics,
    isLoading: topicsLoading,
    isError: topicsError,
    refetch: refetchTopics,
  } = useTopicsByModule(moduleData?._id);

  const isLoading = moduleLoading || topicsLoading;
  const isError = moduleError || topicsError;

  if (isLoading) {
    return <PageSkeleton rows={6} className="pb-12" />;
  }

  if (isError) {
    return (
      <ErrorState
        message={`Could not load ${moduleLabel.toLowerCase()} topics.`}
        onRetry={() => {
          void refetchModule();
          void refetchTopics();
        }}
      />
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-[#5D50EB]">
          <Link href={ROUTES.dashboard.generalAptitude} className="hover:underline">
            General Aptitude
          </Link>
          <span>/</span>
          <span>{moduleLabel}</span>
        </div>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
          {moduleLabel} Topics
        </h1>
      </div>

      {!topics?.length ? (
        <EmptyState
          title="No topics yet"
          description={`${moduleLabel} topics will appear here once they are published.`}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {topics.map((topic) => {
            const difficultyStyle =
              DIFFICULTY_STYLES[topic.difficulty ?? "medium"] ??
              DIFFICULTY_STYLES.medium;

            return (
              <motion.div
                key={topic._id}
                whileHover={{ y: -3 }}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <Icon className="h-4 w-4 text-[#5D50EB]" />
                      {topic.name}
                    </span>
                    {topic.difficulty && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${difficultyStyle}`}
                      >
                        {topic.difficulty}
                      </span>
                    )}
                  </div>

                  {topic.description && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {topic.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                    {topic.estimatedTime ? (
                      <>
                        <Clock className="h-3 w-3" />
                        {topic.estimatedTime} min
                      </>
                    ) : (
                      "Topic overview"
                    )}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      href={topicPath(moduleKey, topic.slug)}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <BookOpen className="h-3 w-3" />
                      <span>Learn</span>
                    </Link>
                    <Link
                      href={topicPracticePath(moduleKey, topic.slug)}
                      className="inline-flex items-center gap-1 rounded-xl bg-[#5D50EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#4d40db]"
                    >
                      <Play className="h-3 w-3 fill-white" />
                      <span>Practice</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { MODULE_LABELS };
