"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { Brain, BookOpen } from "lucide-react";
import { useDashboardQuery } from "@/features/dashboard/hooks";
import {
  moduleChartColor,
  moduleChartColorDark,
} from "@/features/dashboard/utils/dashboard-helpers";

const MODULE_ICONS: Record<string, typeof Brain> = {
  "Arithmetic Aptitude": Brain,
  "Logical Reasoning": Brain,
  "Verbal Reasoning": BookOpen,
};

export function LearningProgress() {
  const { resolvedTheme } = useTheme();
  const { data: dashboard } = useDashboardQuery();
  const overall = dashboard?.overallProgress.completionPercentage ?? 0;
  const learningProgress = dashboard?.learningProgress ?? [];
  const isZero = overall === 0;
  const isDark = resolvedTheme === "dark";
  const ringColor = isDark ? "#6366F1" : "#5D50EB";

  const domains = learningProgress.map((item, index) => ({
    title: item.moduleName,
    progress: item.percentage,
    color: isDark ? moduleChartColorDark(index) : moduleChartColor(index),
    icon: MODULE_ICONS[item.moduleName] ?? Brain,
    detail: `${item.completed}/${item.total} topics`,
  }));

  return (
    <DashboardCard
      title="Overall Placement Preparedness"
      subtitle="Track your overall readiness across core interview modules"
    >
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-purple-100 bg-purple-50/50 p-5 md:col-span-5 dark:border-indigo-500/15 dark:bg-indigo-500/[0.07]">
          <ProgressRing
            progress={overall}
            size={140}
            strokeWidth={12}
            color={ringColor}
            trackClassName="text-slate-100 dark:text-slate-800"
            label={`${overall}%`}
            sublabel={isZero ? "Not Started Yet" : "Ready for Placements"}
          />
          <p className="mt-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300">
            {isZero
              ? "Complete practice quizzes & tests to increase score!"
              : "High Chance of Placement Clearance"}
          </p>
        </div>

        <div className="space-y-5 md:col-span-7">
          {domains.length > 0 ? (
            domains.map((d) => (
              <div key={d.title} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 font-bold text-slate-800 dark:text-slate-200">
                    <d.icon className="h-4 w-4 text-[#5D50EB] dark:text-indigo-400" />
                    <span>{d.title}</span>
                  </div>
                  <span className="font-extrabold text-[#5D50EB] dark:text-indigo-400">
                    {d.progress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{d.detail}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No module progress yet. Start practicing to see your readiness breakdown.
            </p>
          )}
        </div>
      </div>
    </DashboardCard>
  );
}

export function OverallProgress() {
  return <LearningProgress />;
}
