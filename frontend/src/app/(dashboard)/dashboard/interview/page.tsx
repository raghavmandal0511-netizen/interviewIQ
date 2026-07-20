"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Video, MessageSquare, Bot, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

export default function InterviewPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Interview Preparation Modules
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Master HR questions, practice behavioral storytelling, and simulate real-time AI technical interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HR Interview Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="surface-card surface-card-interactive flex flex-col justify-between rounded-xl p-6"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <MessageSquare className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              HR Behavioral Interview Prep
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Frequently asked HR questions for freshers and experienced candidates with sample answers, STAR framework tips, and video response recorder.
            </p>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/[0.06]">
            <Link
              href={ROUTES.dashboard.interviewHr}
              className="btn-primary-premium inline-flex w-full items-center justify-center gap-2"
            >
              <span>Explore HR Interview Questions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* AI Interview Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="flex flex-col justify-between rounded-xl border border-purple-200/80 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 p-6 shadow-md dark:border-indigo-500/20 dark:from-indigo-500/[0.1] dark:via-[#161B22] dark:to-violet-500/[0.06] dark:shadow-[var(--shadow-card)]"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5D50EB] text-white shadow-md shadow-purple-500/20 dark:bg-indigo-500 dark:shadow-[0_8px_20px_-8px_rgba(99,102,241,0.45)]">
                <Bot className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
                Interactive Simulator
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              AI Technical Mock Interview Simulator
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Real-time voice & video AI interviewer that asks adaptive technical & system design questions and evaluates posture, tone, and technical clarity.
            </p>
          </div>

          <div className="mt-6 border-t border-slate-200/60 pt-4 dark:border-white/[0.06]">
            <Link
              href={ROUTES.dashboard.interviewAi}
              className="btn-primary-premium inline-flex w-full items-center justify-center gap-2"
            >
              <span>Launch AI Mock Interview</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
