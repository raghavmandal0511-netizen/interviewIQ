"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Clock, ArrowRight, Target } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useDashboardQuery } from "@/features/dashboard/hooks";

function reasonLabel(reason: string, accuracy?: number | null): string {
  if (reason === "lowest_accuracy" && accuracy != null) {
    return `Low accuracy (${Math.round(accuracy)}%)`;
  }
  if (reason === "never_attempted") return "Not attempted yet";
  return "Recommended for you";
}

function reasonDifficulty(reason: string): {
  difficulty: string;
  diffColor: string;
} {
  if (reason === "lowest_accuracy") {
    return {
      difficulty: "Focus Area",
      diffColor:
        "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
    };
  }
  return {
    difficulty: "New Topic",
    diffColor:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  };
}

export function RecommendedTopics() {
  const { data: dashboard } = useDashboardQuery();
  const recommended = dashboard?.recommendations ?? [];

  return (
    <DashboardCard
      title={
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-[#5D50EB] dark:text-indigo-400" />
          <span>Recommended Topics for You</span>
        </div>
      }
      subtitle="AI-curated topics based on your weak areas and upcoming target company tests"
    >
      {recommended.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {recommended.slice(0, 3).map((item) => {
            const { difficulty, diffColor } = reasonDifficulty(item.reason);

            return (
              <motion.div
                key={item.topicId}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="surface-card surface-card-interactive flex flex-col justify-between rounded-xl p-5 dark:bg-gradient-to-b dark:from-[#1F2937] dark:to-[#161B22]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-indigo-300">
                      {reasonLabel(item.reason, item.accuracy)}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${diffColor}`}
                    >
                      {difficulty}
                    </span>
                  </div>

                  <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-50">
                    {item.topicName}
                  </h4>

                  <div className="mt-3 flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      Practice now
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3.5 w-3.5 text-slate-400" />
                      Topic
                    </span>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 dark:border-white/[0.06]">
                  <Link
                    href={ROUTES.dashboard.generalAptitude}
                    className="btn-primary-premium inline-flex w-full items-center justify-center gap-2"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center dark:border-white/[0.08] dark:bg-white/[0.02]">
          <Sparkles className="mb-2 h-8 w-8 text-slate-400" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            No Recommendations Yet
          </p>
          <p className="mt-1 max-w-xs text-[11px] text-slate-500 dark:text-slate-400">
            Complete a few practice sessions and we&apos;ll suggest topics tailored to your
            progress.
          </p>
        </div>
      )}
    </DashboardCard>
  );
}
