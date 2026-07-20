"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, ShieldCheck } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";

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
    </DashboardCard>
  );
}
