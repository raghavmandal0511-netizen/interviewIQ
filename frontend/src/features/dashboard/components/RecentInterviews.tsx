"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Video, Star, ArrowRight, Bot } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

export function RecentInterviews() {
  const recentInterviews = useAuthStore((state) => state.progress.recentInterviews);

  return (
    <DashboardCard
      title="Recent Mock Interviews & AI Feedback"
      subtitle="Review AI-analyzed voice and technical interview sessions"
      action={
        <Link
          href={ROUTES.dashboard.interview}
          className="text-xs font-bold text-[#5D50EB] hover:underline dark:text-purple-400"
        >
          View All Interviews →
        </Link>
      }
    >
      {recentInterviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentInterviews.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    <Video className="h-3 w-3" />
                    {item.type}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{item.date}</span>
                </div>

                <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h4>

                <div className="mt-2 flex items-center space-x-1 text-xs font-bold text-amber-500">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>Overall Rating: {item.rating}</span>
                </div>

                <div className="mt-3 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/50">
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 italic line-clamp-2">
                    &quot;{item.feedback}&quot;
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Link
                  href={item.href || ROUTES.dashboard.interviewAi}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
                >
                  <span>View Full AI Feedback</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950 text-[#5D50EB] mb-3">
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
