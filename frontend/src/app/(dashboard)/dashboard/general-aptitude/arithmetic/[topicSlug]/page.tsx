"use client";

import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";
import { Calculator, Play, BookOpen, Clock, ArrowLeft, CheckCircle2, Award } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

export default function TopicPage({ params }: { params: Promise<{ topicSlug: string }> }) {
  const { topicSlug } = use(params);
  const formattedTitle = topicSlug.replace(/-/g, " ").toUpperCase();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <Link
          href={ROUTES.dashboard.arithmetic}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Arithmetic Topics</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 capitalize">
          {topicSlug.replace(/-/g, " ")}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Master core formulas, shortcut tricks, and practice topic-wise questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Formula & Concept Summary">
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p className="leading-relaxed">
              Understand relative speed, average speed equations, and key shortcuts for placement tests.
            </p>
            <div className="rounded-xl bg-purple-50 p-3 dark:bg-purple-950/40 font-mono text-purple-900 dark:text-purple-200">
              Average Speed = (2 × s1 × s2) / (s1 + s2)
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Topic Practice Quizzes">
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Take a 15-question practice quiz to test your speed & accuracy.
            </p>
            <Link
              href={`${ROUTES.dashboard.arithmetic}/${topicSlug}/practice`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Start Topic Quiz</span>
            </Link>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
