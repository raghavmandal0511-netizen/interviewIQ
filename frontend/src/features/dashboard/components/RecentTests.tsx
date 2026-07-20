"use client";

import Link from "next/link";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { FileText, ArrowRight, Play, Target, Trophy } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useDashboardQuery } from "@/features/dashboard/hooks";

export function RecentTests() {
  const { data: dashboard } = useDashboardQuery();
  const testStats = dashboard?.testStatistics;
  const hasTests = (testStats?.testsAttempted ?? 0) > 0;

  return (
    <DashboardCard
      title="Recent Mock Tests"
      subtitle="View your latest exam attempt results & detailed solution reviews"
      action={
        <Link
          href={ROUTES.dashboard.tests}
          className="text-xs font-bold text-[#5D50EB] hover:underline dark:text-indigo-400"
        >
          View All Tests →
        </Link>
      }
    >
      {hasTests ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 text-[#5D50EB] mb-2">
              <FileText className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Attempted</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white">
              {testStats?.testsAttempted ?? 0}
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Target className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Completed</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white">
              {testStats?.testsCompleted ?? 0}
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <Trophy className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Avg Score</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white">
              {Math.round(testStats?.averageScore ?? 0)}%
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <ArrowRight className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Best Score</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white">
              {testStats?.highestScore ?? 0}%
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-indigo-500/15 text-[#5D50EB] mb-3">
            <FileText className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Mock Tests Attempted Yet</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            You haven&apos;t taken any mock exams yet. Start your first timed test to evaluate your skills.
          </p>
          <Link
            href={ROUTES.dashboard.tests}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Take First Mock Test</span>
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
