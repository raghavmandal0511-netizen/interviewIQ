"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Calculator, Brain, MessageSquare, Clock, BookOpen } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useDashboardQuery } from "@/features/dashboard/hooks";
import {
  formatRelativeTime,
  modulePathFromName,
} from "@/features/dashboard/utils/dashboard-helpers";

function moduleStyle(moduleName: string) {
  const lower = moduleName.toLowerCase();
  if (lower.includes("arithmetic")) {
    return {
      icon: Calculator,
      bg: "bg-emerald-50/70 border-emerald-200/80 dark:bg-emerald-950/30 dark:border-emerald-900/50",
      text: "text-emerald-700 dark:text-emerald-300",
      color: "bg-[#15803d]",
    };
  }
  if (lower.includes("logical")) {
    return {
      icon: Brain,
      bg: "bg-purple-50/70 border-purple-200/80 dark:bg-indigo-500/10 dark:border-indigo-500/20",
      text: "text-purple-700 dark:text-purple-300",
      color: "bg-[#5D50EB]",
    };
  }
  if (lower.includes("hr") || lower.includes("interview")) {
    return {
      icon: MessageSquare,
      bg: "bg-amber-50/70 border-amber-200/80 dark:bg-amber-950/30 dark:border-amber-900/50",
      text: "text-amber-700 dark:text-amber-300",
      color: "bg-[#c2410c]",
    };
  }
  return {
    icon: BookOpen,
    bg: "bg-slate-50/70 border-slate-200/80 dark:bg-slate-950/30 dark:border-slate-800/50",
    text: "text-slate-700 dark:text-slate-300",
    color: "bg-[#5D50EB]",
  };
}

export function ContinueLearning() {
  const { data: dashboard } = useDashboardQuery();
  const continueItem = dashboard?.continueLearning;

  return (
    <DashboardCard
      title="Continue Learning"
      subtitle="Pick up right where you left off"
      action={
        <Link
          href={ROUTES.dashboard.generalAptitude}
          className="text-xs font-bold text-[#5D50EB] hover:underline dark:text-indigo-400"
        >
          View All Topics →
        </Link>
      }
    >
      {continueItem ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(() => {
            const style = moduleStyle(continueItem.moduleName);
            const Icon = style.icon;
            const href = modulePathFromName(continueItem.moduleName);

            return (
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all ${style.bg}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
                      {continueItem.categoryName || continueItem.moduleName}
                    </span>
                    {continueItem.lastVisited && (
                      <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        <Clock className="h-3 w-3" />
                        {formatRelativeTime(continueItem.lastVisited)}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {continueItem.topicName}
                  </h4>

                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      <span>{continueItem.moduleName}</span>
                      <span className="flex items-center gap-1">
                        <Icon className="h-3 w-3" />
                        Resume
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200/70 dark:bg-slate-800 overflow-hidden">
                      <div className={`h-full rounded-full ${style.color} w-1/3`} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                  <Link
                    href={href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] active:scale-95 transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Resume Practice</span>
                  </Link>
                </div>
              </motion.div>
            );
          })()}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800">
          <BookOpen className="h-8 w-8 text-slate-400 mb-2" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Active Learning Modules</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Select any General Aptitude or Interview topic to start your preparation journey.
          </p>
          <Link
            href={ROUTES.dashboard.generalAptitude}
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Explore Aptitude Topics</span>
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
