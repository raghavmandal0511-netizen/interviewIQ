"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

const weakAreas = [
  {
    topic: "Probability & Combinatorics",
    accuracy: 45,
    suggestion: "Review basic formulas and solve 10 introductory practice questions.",
    href: `${ROUTES.dashboard.arithmetic}/probability`,
  },
  {
    topic: "Data Sufficiency",
    accuracy: 52,
    suggestion: "Focus on eliminations and evaluating statements independently.",
    href: `${ROUTES.dashboard.logical}/data-sufficiency`,
  },
  {
    topic: "Reading Comprehension",
    accuracy: 58,
    suggestion: "Practice identifying central themes and tone in passage questions.",
    href: `${ROUTES.dashboard.verbal}/reading-comprehension`,
  },
];

export function WeakTopics() {
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
      <div className="space-y-4">
        {weakAreas.map((item) => (
          <div
            key={item.topic}
            className="rounded-xl border border-rose-100 bg-rose-50/30 p-3.5 dark:border-rose-900/40 dark:bg-rose-950/20"
          >
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                {item.topic}
              </h5>
              <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                {item.accuracy}% Accuracy
              </span>
            </div>

            {/* Progress */}
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
                <span>{item.suggestion}</span>
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center text-xs font-bold text-[#5D50EB] hover:underline shrink-0 dark:text-purple-400"
              >
                <span>Practice</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
