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
import { useAuthStore } from "@/store/auth.store";

export function QuickStats() {
  const progress = useAuthStore((state) => state.progress);

  const stats = [
    {
      title: "Tests Taken",
      value: progress.testsTaken,
      change: progress.testsTaken === 0 ? "Start first test" : "+4 this week",
      isPositive: progress.testsTaken > 0,
      icon: FileCheck,
      iconBg: "bg-blue-50 dark:bg-blue-950/40",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Accuracy",
      value: progress.accuracyRate,
      suffix: "%",
      change: progress.accuracyRate === 0 ? "No data yet" : "+5.2%",
      isPositive: progress.accuracyRate > 0,
      icon: Target,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Topics Completed",
      value: progress.topicsCompleted,
      change: progress.topicsCompleted === 0 ? "0 completed" : "+2 today",
      isPositive: progress.topicsCompleted > 0,
      icon: CheckCircle2,
      iconBg: "bg-purple-50 dark:bg-purple-950/40",
      iconColor: "text-[#5D50EB] dark:text-purple-400",
    },
    {
      title: "Current Streak",
      value: progress.streakDays,
      suffix: " Days",
      change: progress.streakDays === 0 ? "Start streak today!" : "Active Streak",
      isPositive: progress.streakDays > 0,
      icon: Flame,
      iconBg: "bg-amber-50 dark:bg-amber-950/40",
      iconColor: "text-amber-500 dark:text-amber-400",
    },
    {
      title: "Problems Solved",
      value: progress.problemsSolved,
      change: progress.problemsSolved === 0 ? "0 solved" : "+18 overall",
      isPositive: progress.problemsSolved > 0,
      icon: Code2,
      iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Mock Interviews",
      value: progress.mockInterviews,
      change: progress.mockInterviews === 0 ? "0 mock interviews" : "+3 completed",
      isPositive: progress.mockInterviews > 0,
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
