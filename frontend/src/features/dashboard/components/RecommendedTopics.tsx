"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Clock, ArrowRight, Zap, Target } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

const recommended = [
  {
    title: "Permutations & Combinations",
    category: "Arithmetic Aptitude",
    difficulty: "Medium",
    diffColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    estTime: "20 mins",
    questions: 15,
    href: `${ROUTES.dashboard.arithmetic}/permutations`,
  },
  {
    title: "Data Sufficiency",
    category: "Logical Reasoning",
    difficulty: "Hard",
    diffColor: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
    estTime: "25 mins",
    questions: 12,
    href: `${ROUTES.dashboard.logical}/data-sufficiency`,
  },
  {
    title: "Reading Comprehension Strategy",
    category: "Verbal Ability",
    difficulty: "Easy",
    diffColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
    estTime: "15 mins",
    questions: 10,
    href: `${ROUTES.dashboard.verbal}/reading-comprehension`,
  },
];

export function RecommendedTopics() {
  return (
    <DashboardCard
      title={
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-[#5D50EB]" />
          <span>Recommended Topics for You</span>
        </div>
      }
      subtitle="AI-curated topics based on your weak areas and upcoming target company tests"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommended.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900/80 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {item.category}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${item.diffColor}`}>
                  {item.difficulty}
                </span>
              </div>

              <h4 className="mt-2.5 text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </h4>

              <div className="mt-3 flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {item.estTime}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-3.5 w-3.5 text-slate-400" />
                  {item.questions} Qs
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link
                href={item.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] active:scale-95 transition-all"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardCard>
  );
}
