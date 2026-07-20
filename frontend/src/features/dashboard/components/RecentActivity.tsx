"use client";

import { motion } from "framer-motion";
import { FileCheck, MessageSquare, BookOpen, Clock, Activity } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { useDashboardQuery } from "@/features/dashboard/hooks";
import { formatRelativeTime } from "@/features/dashboard/utils/dashboard-helpers";

const ACTIVITY_CONFIG: Record<
  string,
  { icon: typeof FileCheck; dotColor: string; badge: string }
> = {
  COMPLETED_TOPIC: {
    icon: BookOpen,
    dotColor: "bg-blue-500",
    badge: "Topic Completed",
  },
  COMPLETED_TEST: {
    icon: FileCheck,
    dotColor: "bg-emerald-500",
    badge: "Test Completed",
  },
  HR_ANSWER_SUBMITTED: {
    icon: MessageSquare,
    dotColor: "bg-indigo-500",
    badge: "HR Practice",
  },
};

const DEFAULT_ACTIVITY_CONFIG = {
  icon: BookOpen,
  dotColor: "bg-blue-500",
  badge: "Topic Completed",
} as const;

function activityDescription(
  type: string,
  meta?: Record<string, unknown>,
): string {
  if (type === "COMPLETED_TEST" && meta?.score != null) {
    return `Scored ${meta.score}% on this attempt`;
  }
  if (type === "COMPLETED_TOPIC" && meta?.completionPercentage != null) {
    return `${meta.completionPercentage}% completion reached`;
  }
  if (type === "HR_ANSWER_SUBMITTED") {
    return "Submitted an HR interview practice answer";
  }
  return "Recent learning activity";
}

export function RecentActivity() {
  const { data: dashboard } = useDashboardQuery();
  const activities = dashboard?.recentActivity ?? [];

  return (
    <DashboardCard
      title="Recent Activity"
      subtitle="Your latest learning sessions & test submissions"
    >
      {activities.length > 0 ? (
        <div className="relative space-y-4 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
          {activities.map((act, index) => {
            const config = ACTIVITY_CONFIG[act.type] ?? DEFAULT_ACTIVITY_CONFIG;

            return (
              <motion.div
                key={`${act.type}-${act.timestamp}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="relative flex items-start space-x-3.5 pl-1"
              >
                <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-[#161B22] dark:ring-[#09090B]">
                  <span className={`h-2.5 w-2.5 rounded-full ${config.dotColor}`} />
                </div>

                <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/50 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {act.title}
                    </h5>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 shrink-0">
                      <Clock className="h-3 w-3" />
                      {formatRelativeTime(act.timestamp)}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {activityDescription(act.type, act.meta)}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-purple-600 dark:text-indigo-400">
                      {config.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-slate-50/50 dark:bg-white/[0.03] border border-dashed border-slate-200 dark:border-slate-800">
          <Activity className="h-8 w-8 text-slate-400 mb-2" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            No Recent Activity
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mt-1">
            Your activity feed will update automatically as you attempt quizzes, tests, and AI interviews.
          </p>
        </div>
      )}
    </DashboardCard>
  );
}
