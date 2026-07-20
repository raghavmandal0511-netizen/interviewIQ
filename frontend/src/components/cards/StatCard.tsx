"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

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
  iconBg = "bg-purple-50 dark:bg-purple-950/40",
  iconColor = "text-[#5D50EB] dark:text-purple-400",
  badgeText,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-900/60 dark:backdrop-blur-md dark:shadow-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {typeof value === "number" ? (
              <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
            ) : (
              <span>
                {prefix}
                {value}
                {suffix}
              </span>
            )}
          </div>
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {(change || badgeText) && (
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800/60">
          {change && (
            <div
              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                isPositive
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
              }`}
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
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
