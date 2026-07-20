"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Target, Flame } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

export function WelcomeBanner() {
  const user = useAuthStore((state) => state.user);
  const targetRole = useAuthStore((state) => state.targetRole);
  const streakDays = useAuthStore((state) => state.progress.streakDays);

  const firstName = user?.name ? user.name.split(" ")[0] : "Candidate";
  const isZeroStreak = streakDays === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5D50EB] via-indigo-600 to-purple-700 p-6 sm:p-8 text-white shadow-xl shadow-purple-500/20"
    >
      {/* Background Glows */}
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 bottom-0 h-40 w-40 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        {/* Left Side: Greeting & Message */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-pulse" />
            <span>Target Role: {targetRole || "Software Engineer Candidate"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {firstName}! 👋
          </h1>

          <p className="text-sm text-purple-100 leading-relaxed">
            {isZeroStreak ? (
              <span>
                Start your placement preparation journey today. Complete your first practice module to build your streak!
              </span>
            ) : (
              <span>
                You&apos;re on a <span className="font-bold text-amber-300">{streakDays}-day streak</span>! Keep pushing your boundaries today to crack your placement interviews.
              </span>
            )}
          </p>

          {/* Today's Goal Pill */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2 text-xs font-semibold bg-black/20 rounded-xl px-3 py-1.5 backdrop-blur-sm">
              <Target className="h-4 w-4 text-emerald-400" />
              <span>Today&apos;s Goal: Complete 1 Mock Test & 5 Practice Questions</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Flame className="h-4 w-4 fill-amber-400 text-amber-400 animate-bounce" />
              <span>{isZeroStreak ? "Start Streak Today" : "Streak Bonus Active"}</span>
            </div>
          </div>
        </div>

        {/* Right Side: CTA Button */}
        <div className="shrink-0 flex items-center">
          <Link href={ROUTES.dashboard.interviewAi}>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-xs sm:text-sm font-extrabold text-[#5D50EB] shadow-lg shadow-black/10 hover:bg-slate-50 transition-all"
            >
              <span>Start AI Practice Interview</span>
              <ArrowRight className="h-4 w-4 text-[#5D50EB]" />
            </motion.button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
