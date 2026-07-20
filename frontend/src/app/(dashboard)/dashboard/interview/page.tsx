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
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <MessageSquare className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              HR Behavioral Interview Prep
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Frequently asked HR questions for freshers and experienced candidates with sample answers, STAR framework tips, and video response recorder.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href={ROUTES.dashboard.interviewHr}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
            >
              <span>Explore HR Interview Questions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* AI Interview Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-purple-200/80 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 p-6 shadow-md dark:border-purple-900/50 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-indigo-950/30 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5D50EB] text-white shadow-md shadow-purple-500/20">
                <Bot className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/80 dark:text-amber-300">
                <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
                Interactive Simulator
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              AI Technical Mock Interview Simulator
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Real-time voice & video AI interviewer that asks adaptive technical & system design questions and evaluates posture, tone, and technical clarity.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <Link
              href={ROUTES.dashboard.interviewAi}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/20 hover:bg-[#4d40db] transition-all"
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
