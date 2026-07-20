"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Video, MessageSquare, ArrowRight, Bot } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useDashboardQuery } from "@/features/dashboard/hooks";

export function RecentInterviews() {
  const { data: dashboard } = useDashboardQuery();
  const hrStats = dashboard?.hrStatistics;
  const questionsAnswered = hrStats?.questionsAnswered ?? 0;
  const hasInterviews = questionsAnswered > 0;

  return (
    <DashboardCard
      title="Recent Mock Interviews & AI Feedback"
      subtitle="Review AI-analyzed voice and technical interview sessions"
      action={
        <Link
          href={ROUTES.dashboard.interview}
          className="text-xs font-bold text-[#5D50EB] hover:underline dark:text-indigo-400"
        >
          View All Interviews →
        </Link>
      }
    >
      {hasInterviews ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ y: -3 }}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all dark:border-white/[0.06] dark:bg-[#161B22] dark:shadow-[var(--shadow-card)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-indigo-400">
                  <Video className="h-3 w-3" />
                  HR Interview Prep
                </span>
                {hrStats?.latestAnswerDate && (
                  <span className="text-[10px] font-semibold text-slate-400">
                    {new Date(hrStats.latestAnswerDate).toLocaleDateString()}
                  </span>
                )}
              </div>

              <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                HR Practice Summary
              </h4>

              <div className="mt-2 flex items-center space-x-1 text-xs font-bold text-amber-500">
                <MessageSquare className="h-4 w-4 text-amber-400" />
                <span>{questionsAnswered} questions answered</span>
              </div>

              <div className="mt-3 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/50">
                <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                  Keep practicing HR questions to improve confidence and delivery in real interviews.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Link
                href={ROUTES.dashboard.interviewHr}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
              >
                <span>Continue HR Prep</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all dark:border-white/[0.06] dark:bg-[#161B22] dark:shadow-[var(--shadow-card)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-indigo-400">
                  <Bot className="h-3 w-3" />
                  AI Interview
                </span>
              </div>

              <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                AI Mock Interview
              </h4>

              <div className="mt-3 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/50">
                <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                  Launch an AI-powered mock interview for real-time voice and technical practice.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Link
                href={ROUTES.dashboard.interviewAi}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
              >
                <span>Launch AI Interview</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-indigo-500/15 text-[#5D50EB] mb-3">
            <Bot className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Mock Interviews Conducted Yet</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Launch our real-time AI mock interviewer to practice voice & video technical interview questions.
          </p>
          <Link
            href={ROUTES.dashboard.interviewAi}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all"
          >
            <Bot className="h-4 w-4" />
            <span>Launch AI Mock Interview</span>
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
