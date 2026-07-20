"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  badgeText?: string;
}

export function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  isPositive = true,
  icon: Icon,
  iconBg = "bg-indigo-50 dark:bg-indigo-500/10",
  iconColor = "text-indigo-600 dark:text-indigo-400",
  badgeText,
}: StatCardProps) {
  return (
    <motion.div
      data-motion-card
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "surface-card surface-card-interactive relative flex flex-col justify-between overflow-hidden rounded-xl p-5",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-slate-400">
            {title}
          </span>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-slate-50 sm:text-3xl">
            <span>
              {prefix}
              {value}
              {suffix}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            iconBg,
            iconColor,
          )}
        >
          <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
        </div>
      </div>

      {(change || badgeText) && (
        <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-white/[0.06]">
          {change && (
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold",
                isPositive
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {change}
            </div>
          )}
          {badgeText && (
            <span className="text-[11px] text-zinc-400 dark:text-slate-500">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
