"use client";

import { motion } from "framer-motion";
import { Flame, Check, Sparkles } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";

const weekDays = [
  { day: "Mon", completed: true, date: "15" },
  { day: "Tue", completed: true, date: "16" },
  { day: "Wed", completed: true, date: "17" },
  { day: "Thu", completed: true, date: "18" },
  { day: "Fri", completed: true, date: "19" },
  { day: "Sat", completed: true, date: "20" },
  { day: "Sun", completed: true, date: "21", isToday: true },
];

export function DailyStreak() {
  return (
    <DashboardCard
      title={
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="text-base font-bold text-slate-900 dark:text-white">
            Daily Streak & Consistency
          </span>
        </div>
      }
      subtitle="Practice every day to keep your streak multiplier active"
    >
      <div className="space-y-4">
        {/* Streak Main Indicator */}
        <div className="flex items-center justify-between rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
              <Flame className="h-7 w-7 fill-white animate-bounce" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                7 Days Active
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
                You&apos;re 3 days away from the 10-Day Mastery Badge!
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl">
            <Sparkles className="h-4 w-4" />
            <span>2x XP Multiplier</span>
          </div>
        </div>

        {/* Weekly Days Bar */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((item) => (
            <motion.div
              key={item.day}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center justify-between p-2.5 rounded-xl border transition-all ${
                item.isToday
                  ? "border-[#5D50EB] bg-purple-500/10 dark:bg-purple-950/40 ring-2 ring-[#5D50EB]/30"
                  : item.completed
                  ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                  : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {item.day}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 my-1">
                {item.date}
              </span>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  item.completed
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                }`}
              >
                {item.completed ? <Check className="h-3 w-3 stroke-[3]" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
