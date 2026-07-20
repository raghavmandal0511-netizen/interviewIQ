"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Lock, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface AchievementCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  date?: string;
}

export function AchievementCard({
  title,
  description,
  icon: Icon,
  unlocked,
  date,
}: AchievementCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative flex items-center gap-4 rounded-xl border p-4 transition-all duration-300",
        unlocked
          ? "border-purple-200/80 bg-gradient-to-r from-purple-50/50 via-white to-indigo-50/30 shadow-sm dark:border-indigo-500/20 dark:from-indigo-500/[0.08] dark:via-[#161B22] dark:to-violet-500/[0.06] dark:shadow-[var(--shadow-card)]"
          : "border-slate-200/60 bg-slate-50/50 opacity-60 dark:border-white/[0.05] dark:bg-white/[0.02]",
      )}
    >
      <div
        className={cn(
          "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
          unlocked
            ? "bg-[#5D50EB] text-white shadow-md shadow-purple-500/20 dark:bg-indigo-500 dark:shadow-[0_8px_20px_-8px_rgba(99,102,241,0.5)]"
            : "bg-slate-200 text-slate-400 dark:bg-[#1F2937] dark:text-slate-500",
        )}
      >
        <Icon className="h-6 w-6" />
        {unlocked && (
          <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-amber-300 text-amber-300" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="truncate text-sm font-bold text-slate-900 dark:text-slate-50">
            {title}
          </h4>
          {!unlocked && <Lock className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
        {unlocked && date && (
          <span className="mt-1 block text-[10px] font-semibold text-purple-600 dark:text-indigo-300">
            Unlocked {date}
          </span>
        )}
      </div>
    </motion.div>
  );
}
