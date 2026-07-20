"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Calculator, Brain, MessageSquare, Clock } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

const recentTopics = [
  {
    id: "arithmetic-1",
    category: "Arithmetic Aptitude",
    title: "Time, Speed & Distance",
    progress: 75,
    questionsLeft: 4,
    estTime: "10 mins left",
    icon: Calculator,
    color: "bg-[#15803d]",
    bg: "bg-emerald-50/70 border-emerald-200/80 dark:bg-emerald-950/30 dark:border-emerald-900/50",
    text: "text-emerald-700 dark:text-emerald-300",
    href: `${ROUTES.dashboard.arithmetic}/time-speed-distance`,
  },
  {
    id: "logical-1",
    category: "Logical Reasoning",
    title: "Blood Relations & Family Tree",
    progress: 40,
    questionsLeft: 8,
    estTime: "15 mins left",
    icon: Brain,
    color: "bg-[#5D50EB]",
    bg: "bg-purple-50/70 border-purple-200/80 dark:bg-purple-950/30 dark:border-purple-900/50",
    text: "text-purple-700 dark:text-purple-300",
    href: `${ROUTES.dashboard.logical}/blood-relations`,
  },
  {
    id: "hr-1",
    category: "HR Interview Prep",
    title: "Tell Me About Yourself (Freshers)",
    progress: 90,
    questionsLeft: 1,
    estTime: "5 mins left",
    icon: MessageSquare,
    color: "bg-[#c2410c]",
    bg: "bg-amber-50/70 border-amber-200/80 dark:bg-amber-950/30 dark:border-amber-900/50",
    text: "text-amber-700 dark:text-amber-300",
    href: `${ROUTES.dashboard.interviewHr}/freshers`,
  },
];

export function ContinueLearning() {
  return (
    <DashboardCard
      title="Continue Learning"
      subtitle="Pick up right where you left off"
      action={
        <Link
          href={ROUTES.dashboard.generalAptitude}
          className="text-xs font-bold text-[#5D50EB] hover:underline dark:text-purple-400"
        >
          View All Topics →
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentTopics.map((topic) => {
          const Icon = topic.icon;

          return (
            <motion.div
              key={topic.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all ${topic.bg}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${topic.text}`}>
                    {topic.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    <Clock className="h-3 w-3" />
                    {topic.estTime}
                  </span>
                </div>

                <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {topic.title}
                </h4>

                {/* Progress Bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    <span>{topic.progress}% Completed</span>
                    <span>{topic.questionsLeft} questions left</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200/70 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${topic.color}`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Resume CTA Button */}
              <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                <Link
                  href={topic.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] active:scale-95 transition-all"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Resume Practice</span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
