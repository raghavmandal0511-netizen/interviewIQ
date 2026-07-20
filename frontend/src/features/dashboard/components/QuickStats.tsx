"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  Target,
  CheckCircle2,
  Flame,
  Code2,
  Video,
} from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { useDashboardQuery } from "@/features/dashboard/hooks";

export function QuickStats() {
  const { data: dashboard } = useDashboardQuery();

  const summary = dashboard?.dashboardSummary;
  const testStats = dashboard?.testStatistics;
  const overall = dashboard?.overallProgress;
  const streakDays = dashboard?.dailyStreak.currentStreak ?? 0;
  const hrStats = dashboard?.hrStatistics;

  const testsTaken = summary?.testsTaken ?? 0;
  const accuracyRate = Math.round(testStats?.averageAccuracy ?? 0);
  const topicsCompleted = overall?.completedTopics ?? 0;
  const problemsSolved = summary?.questionsSolved ?? 0;
  const mockInterviews = hrStats?.questionsAnswered ?? 0;

  const stats = [
    {
      title: "Tests Taken",
      value: testsTaken,
      change: testsTaken === 0 ? "Start first test" : `${testStats?.testsCompleted ?? 0} completed`,
      isPositive: testsTaken > 0,
      icon: FileCheck,
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Accuracy",
      value: accuracyRate,
      suffix: "%",
      change: accuracyRate === 0 ? "No data yet" : `Avg ${accuracyRate}%`,
      isPositive: accuracyRate > 0,
      icon: Target,
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Topics Completed",
      value: topicsCompleted,
      change:
        topicsCompleted === 0
          ? "0 completed"
          : `${overall?.completionPercentage ?? 0}% overall`,
      isPositive: topicsCompleted > 0,
      icon: CheckCircle2,
      iconBg: "bg-purple-50 dark:bg-indigo-500/10",
      iconColor: "text-[#5D50EB] dark:text-indigo-400",
    },
    {
      title: "Current Streak",
      value: streakDays,
      suffix: " Days",
      change: streakDays === 0 ? "Start streak today!" : "Active Streak",
      isPositive: streakDays > 0,
      icon: Flame,
      iconBg: "bg-amber-50 dark:bg-amber-500/10",
      iconColor: "text-amber-500 dark:text-amber-400",
    },
    {
      title: "Problems Solved",
      value: problemsSolved,
      change: problemsSolved === 0 ? "0 solved" : `${summary?.exercisesCompleted ?? 0} exercises`,
      isPositive: problemsSolved > 0,
      icon: Code2,
      iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Mock Interviews",
      value: mockInterviews,
      change: mockInterviews === 0 ? "0 mock interviews" : "HR questions answered",
      isPositive: mockInterviews > 0,
      icon: Video,
      iconBg: "bg-rose-50 dark:bg-rose-950/40",
      iconColor: "text-rose-500 dark:text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
}
