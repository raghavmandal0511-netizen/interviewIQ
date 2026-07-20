"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

const strongAreas = [
  {
    topic: "Percentages & Ratios",
    accuracy: 94,
    level: "Mastered",
    badge: "Top 5% Learner",
  },
  {
    topic: "Coding-Decoding & Series",
    accuracy: 90,
    level: "Expert",
    badge: "Speed Demon",
  },
  {
    topic: "Vocabulary & Analogies",
    accuracy: 88,
    level: "Proficient",
    badge: "High Accuracy",
  },
];

export function StrongTopics() {
  const testsTaken = useAuthStore((state) => state.progress.testsTaken);
  const isZero = testsTaken === 0;

  return (
    <DashboardCard
      title={
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <span>Strong Topics & Achievements</span>
        </div>
      }
      subtitle="Your highest performing topics ready for placement tests"
    >
      {!isZero ? (
        <div className="space-y-4">
          {strongAreas.map((item) => (
            <div
              key={item.topic}
              className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20"
            >
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{item.topic}</span>
                </h5>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  {item.accuracy}% Accuracy
                </span>
              </div>

              {/* Progress */}
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200/60 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.accuracy}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  Status: <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.level}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Award className="h-3 w-3" />
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800">
          <ShieldCheck className="h-8 w-8 text-slate-400 mb-2" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            No Mastered Topics Yet
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mt-1">
            Score &gt;85% accuracy in your practice tests to unlock your strong topic badges!
          </p>
          <Link
            href={ROUTES.dashboard.generalAptitude}
            className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#5D50EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db]"
          >
            <span>Start Practice Quiz</span>
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
