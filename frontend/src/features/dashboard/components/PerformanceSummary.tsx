"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { useDashboardQuery } from "@/features/dashboard/hooks";
import { moduleChartColor } from "@/features/dashboard/utils/dashboard-helpers";

const PerformanceCharts = dynamic(
  () => import("@/features/dashboard/components/PerformanceCharts"),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 w-full pt-2 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
    ),
  },
);

export function PerformanceSummary() {
  const [chartType, setChartType] = useState<"area" | "bar" | "pie" | "line">("area");
  const { data: dashboard } = useDashboardQuery();

  const testStats = dashboard?.testStatistics;
  const learningProgress = dashboard?.learningProgress;
  const isZero =
    (testStats?.testsAttempted ?? 0) === 0 &&
    (learningProgress ?? []).every((m) => m.percentage === 0);

  const moduleChartData = useMemo(() => {
    const modules = learningProgress ?? [];
    return modules.map((item) => ({
      day: item.moduleName.split(" ")[0] ?? item.moduleName,
      score: item.percentage,
      accuracy: Math.round(testStats?.averageAccuracy ?? 0),
      tests: testStats?.testsCompleted ?? 0,
    }));
  }, [learningProgress, testStats]);

  const categoryDistribution = useMemo(() => {
    const modules = learningProgress ?? [];
    return modules.map((item, index) => ({
      name: item.moduleName.split(" ")[0] ?? item.moduleName,
      value: item.percentage,
      color: isZero ? "#94a3b8" : moduleChartColor(index),
    }));
  }, [learningProgress, isZero]);

  const weeklyPerformance =
    moduleChartData.length > 0
      ? moduleChartData
      : [{ day: "—", score: 0, accuracy: 0, tests: 0 }];

  return (
    <DashboardCard
      title="Performance Summary & Growth Analytics"
      subtitle={
        isZero
          ? "No test scores recorded yet. Complete mock tests to see performance analytics."
          : "Comprehensive view of test scores, accuracy trends, and module distribution"
      }
      action={
        <div className="flex items-center space-x-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800 text-xs font-semibold">
          {(["area", "bar", "line", "pie"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setChartType(type)}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                chartType === type
                  ? "bg-[#5D50EB] text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {type === "pie" ? "Distribution" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      }
    >
      <PerformanceCharts
        chartType={chartType}
        weeklyPerformance={weeklyPerformance}
        categoryDistribution={categoryDistribution}
        isZero={isZero}
      />
    </DashboardCard>
  );
}
