"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Target, Flame } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardQuery } from "@/features/dashboard/hooks";

export function WelcomeBanner() {
  const user = useAuthStore((state) => state.user);
  const { data: dashboard } = useDashboardQuery();

  const welcome = dashboard?.welcome;
  const streakDays = dashboard?.dailyStreak.currentStreak ?? 0;
  const firstName =
    welcome?.userName?.split(" ")[0] || user?.name?.split(" ")[0] || "Candidate";
  const targetRole = user?.targetRole;
  const isZeroStreak = streakDays === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#5D50EB] via-indigo-600 to-purple-700 p-6 text-white shadow-xl shadow-purple-500/20 sm:p-8 dark:from-[#1e1b4b] dark:via-[#312e81] dark:to-[#1e293b] dark:shadow-[0_16px_48px_-16px_rgba(99,102,241,0.35)] dark:ring-1 dark:ring-indigo-500/20"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl dark:bg-indigo-400/10" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-indigo-400/20 blur-2xl dark:bg-violet-500/10" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold backdrop-blur-md dark:bg-white/10">
            <Sparkles className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            <span>Target Role: {targetRole || "Software Engineer Candidate"}</span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {welcome?.greeting
              ? `${welcome.greeting}, ${firstName}!`
              : `Welcome back, ${firstName}!`}{" "}
            👋
          </h1>

          <p className="text-sm leading-relaxed text-purple-100 dark:text-indigo-100/90">
            {welcome?.message ? (
              <span>{welcome.message}</span>
            ) : isZeroStreak ? (
              <span>
                Start your placement preparation journey today. Complete your first practice
                module to build your streak!
              </span>
            ) : (
              <span>
                You&apos;re on a{" "}
                <span className="font-bold text-amber-300">{streakDays}-day streak</span>! Keep
                pushing your boundaries today to crack your placement interviews.
              </span>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2 rounded-xl bg-black/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm dark:bg-black/30">
              <Target className="h-4 w-4 text-emerald-400" />
              <span>Today&apos;s Goal: Complete 1 Mock Test & 5 Practice Questions</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Flame className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{isZeroStreak ? "Start Streak Today" : "Streak Bonus Active"}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <Link href={ROUTES.dashboard.interviewAi}>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-xs font-extrabold text-[#5D50EB] shadow-lg shadow-black/10 transition-all hover:bg-slate-50 sm:text-sm dark:bg-slate-50 dark:text-indigo-600 dark:hover:bg-white"
            >
              <span>Start AI Practice Interview</span>
              <ArrowRight className="h-4 w-4 text-[#5D50EB] dark:text-indigo-600" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
