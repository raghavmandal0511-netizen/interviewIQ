"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DashboardCardProps {
  title?: ReactNode;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function DashboardCard({
  title,
  subtitle,
  action,
  children,
  className = "",
  hoverEffect = true,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={
        hoverEffect
          ? { y: -3, transition: { duration: 0.2, ease: "easeOut" } }
          : undefined
      }
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-900/60 dark:backdrop-blur-md dark:shadow-xl dark:shadow-purple-950/10 ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800/60">
          <div>
            {typeof title === "string" ? (
              <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h3>
            ) : (
              title
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </motion.div>
  );
}
