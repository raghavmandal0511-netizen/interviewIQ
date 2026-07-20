"use client";

import Link from "next/link";
import { Clock, FileCheck, Play } from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/shared/states";
import { testInstructionsPath } from "@/constants/routes";
import { useTestsQuery } from "@/features/tests/hooks";
import { formatPercent } from "@/utils/format";

export default function TestsPage() {
  const { data: tests, isLoading, isError, refetch } = useTestsQuery();

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <PageSkeleton rows={4} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6 pb-12">
        <ErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Mock Tests & Exam Simulations
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Take full-length timed mock tests designed to simulate company placement exams.
        </p>
      </div>

      {!tests?.length ? (
        <EmptyState
          title="No tests available yet"
          description="Check back soon for new mock tests."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tests.map((test) => (
            <DashboardCard key={test._id} hoverEffect>
              <div className="flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-bold text-[#5D50EB] dark:bg-purple-950/40 dark:text-purple-300">
                      {test.category?.name ?? "General"}
                    </span>
                    <span className="text-xs font-bold capitalize text-slate-400">
                      {test.difficulty}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {test.title}
                  </h3>

                  {test.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                      {test.description}
                    </p>
                  )}

                  <div className="mt-3 flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {test.duration} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <FileCheck className="h-3.5 w-3.5 text-slate-400" />
                      {test.totalQuestions} Questions
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] font-semibold text-slate-400">
                    Pass mark: {formatPercent(test.passingMarks, 0)} of total score
                  </p>
                </div>

                <div className="flex items-center justify-end border-t border-slate-100 pt-3 dark:border-slate-800">
                  <Link
                    href={testInstructionsPath(test._id)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#4d40db]"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>View Instructions</span>
                  </Link>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      )}
    </div>
  );
}
