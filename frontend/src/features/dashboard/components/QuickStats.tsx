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

export function QuickStats() {
  const stats = [
    {
      title: "Tests Taken",
      value: 24,
      change: "+4 this week",
      isPositive: true,
      icon: FileCheck,
      iconBg: "bg-blue-50 dark:bg-blue-950/40",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Accuracy",
      value: 78,
      suffix: "%",
      change: "+5.2%",
      isPositive: true,
      icon: Target,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Topics Completed",
      value: 56,
      change: "+2 today",
      isPositive: true,
      icon: CheckCircle2,
      iconBg: "bg-purple-50 dark:bg-purple-950/40",
      iconColor: "text-[#5D50EB] dark:text-purple-400",
    },
    {
      title: "Current Streak",
      value: 7,
      suffix: " Days",
      change: "Personal Best!",
      isPositive: true,
      icon: Flame,
      iconBg: "bg-amber-50 dark:bg-amber-950/40",
      iconColor: "text-amber-500 dark:text-amber-400",
    },
    {
      title: "Problems Solved",
      value: 342,
      change: "+18 overall",
      isPositive: true,
      icon: Code2,
      iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Mock Interviews",
      value: 12,
      change: "+3 completed",
      isPositive: true,
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
