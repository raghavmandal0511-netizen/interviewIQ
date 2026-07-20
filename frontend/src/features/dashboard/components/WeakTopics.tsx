"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Lightbulb, Target } from "lucide-react";
import Link from "next/link";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useDashboardQuery } from "@/features/dashboard/hooks";

function weakSuggestion(accuracy: number): string {
  if (accuracy < 50) {
    return "Review basic formulas and solve introductory practice questions.";
  }
  if (accuracy < 70) {
    return "Focus on core concepts and attempt more practice exercises.";
  }
  return "Keep practicing to push accuracy above 80%.";
}

export function WeakTopics() {
  const { data: dashboard } = useDashboardQuery();
  const weakAreas = dashboard?.weakTopics ?? [];

  return (
    <DashboardCard
      title={
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-rose-500" />
          <span>Weak Topics Requiring Attention</span>
        </div>
      }
      subtitle="Focus on these high-leverage areas to boost your overall accuracy"
    >
      {weakAreas.length > 0 ? (
        <div className="space-y-4">
          {weakAreas.map((item) => (
            <div
              key={item.topicId}
              className="rounded-xl border border-rose-100 bg-rose-50/30 p-3.5 dark:border-rose-900/40 dark:bg-rose-950/20"
            >
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  {item.topicName}
                </h5>
                <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                  {Math.round(item.accuracy)}% Accuracy
                </span>
              </div>

              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200/60 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.accuracy}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-rose-500"
                />
              </div>

              <div className="mt-2.5 flex items-start justify-between gap-2">
                <p className="flex items-start gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{weakSuggestion(item.accuracy)}</span>
                </p>
                <Link
                  href={ROUTES.dashboard.generalAptitude}
                  className="inline-flex items-center text-xs font-bold text-[#5D50EB] hover:underline shrink-0 dark:text-indigo-400"
                >
                  <span>Practice</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-slate-50/50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-slate-800">
          <Target className="h-8 w-8 text-slate-400 mb-2" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            No Performance Data Yet
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mt-1">
            Solve questions in Aptitude or Mock Tests to identify your weak topics automatically.
          </p>
          <Link
            href={ROUTES.dashboard.generalAptitude}
            className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#5D50EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db]"
          >
            <span>Start Practice Quiz</span>
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
