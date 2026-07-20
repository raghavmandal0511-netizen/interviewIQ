"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileCheck, MessageSquare, BookOpen, Clock, Activity } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { useAuthStore } from "@/store/auth.store";

const activities = [
  {
    id: 1,
    title: "Arithmetic Test Completed",
    description: "Scored 85% in Time & Work test module",
    time: "2h ago",
    icon: FileCheck,
    dotColor: "bg-emerald-500",
    badge: "+50 XP",
  },
  {
    id: 2,
    title: "Logical Reasoning Practice",
    description: "Completed 10 questions on Syllogisms",
    time: "5h ago",
    icon: BookOpen,
    dotColor: "bg-blue-500",
    badge: "+30 XP",
  },
  {
    id: 3,
    title: "HR Interview Question Answered",
    description: "Practiced 'What is your biggest weakness?'",
    time: "1d ago",
    icon: MessageSquare,
    dotColor: "bg-indigo-500",
    badge: "+25 XP",
  },
  {
    id: 4,
    title: "Verbal Ability Practice",
    description: "Reviewed Synonyms & Antonyms flashcards",
    time: "1d ago",
    icon: CheckCircle2,
    dotColor: "bg-purple-500",
    badge: "+20 XP",
  },
];

export function RecentActivity() {
  const testsTaken = useAuthStore((state) => state.progress.testsTaken);
  const isZero = testsTaken === 0;

  return (
    <DashboardCard
      title="Recent Activity"
      subtitle="Your latest learning sessions & test submissions"
    >
      {!isZero ? (
        <div className="relative space-y-4 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
          {activities.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="relative flex items-start space-x-3.5 pl-1"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-slate-900 dark:ring-slate-900">
                <span className={`h-2.5 w-2.5 rounded-full ${act.dotColor}`} />
              </div>

              {/* Activity Body */}
              <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800/80 dark:bg-slate-900/40">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {act.title}
                  </h5>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                    <Clock className="h-3 w-3" />
                    {act.time}
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {act.description}
                </p>

                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {act.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800">
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
