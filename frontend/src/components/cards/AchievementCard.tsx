"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Lock, Sparkles } from "lucide-react";

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
      whileHover={{ y: -3, scale: 1.02 }}
      className={`relative flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
        unlocked
          ? "border-purple-200/80 bg-gradient-to-r from-purple-50/50 via-white to-indigo-50/30 shadow-sm dark:border-purple-900/50 dark:from-purple-950/20 dark:via-slate-900/60 dark:to-indigo-950/20"
          : "border-slate-200/60 bg-slate-50/50 opacity-60 dark:border-slate-800/60 dark:bg-slate-900/30"
      }`}
    >
      <div
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
          unlocked
            ? "bg-[#5D50EB] text-white shadow-md shadow-purple-500/20"
            : "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
        }`}
      >
        <Icon className="h-6 w-6" />
        {unlocked && (
          <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-pulse" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {title}
          </h4>
          {!unlocked && <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />}
        </div>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
          {description}
        </p>
        {unlocked && date && (
          <span className="mt-1 block text-[10px] font-semibold text-purple-600 dark:text-purple-400">
            Unlocked {date}
          </span>
        )}
      </div>
    </motion.div>
  );
}
