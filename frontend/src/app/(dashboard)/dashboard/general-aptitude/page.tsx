"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, Brain, BookOpen, ArrowRight, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

const categories = [
  {
    title: "Arithmetic Aptitude",
    desc: "Master quantitative aptitude topics including Time & Distance, Percentages, Profit & Loss, Ratios, and Permutations.",
    topicsCount: 18,
    completedCount: 14,
    accuracy: 84,
    href: ROUTES.dashboard.arithmetic,
    icon: Calculator,
    color: "bg-[#15803d]",
    accentBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  },
  {
    title: "Logical Reasoning",
    desc: "Sharpen your logical deduction skills with Blood Relations, Syllogisms, Seating Arrangements, and Data Sufficiency.",
    topicsCount: 16,
    completedCount: 11,
    accuracy: 78,
    href: ROUTES.dashboard.logical,
    icon: Brain,
    color: "bg-[#5D50EB]",
    accentBg: "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
  },
  {
    title: "Verbal Ability",
    desc: "Enhance your English language proficiency, Reading Comprehension, Sentence Correction, Synonyms, and Grammar rules.",
    topicsCount: 14,
    completedCount: 10,
    accuracy: 72,
    href: ROUTES.dashboard.verbal,
    icon: BookOpen,
    color: "bg-[#c2410c]",
    accentBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
];

export default function GeneralAptitudePage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            General Aptitude Preparation
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose a core module to practice concepts, formulas, and topic-wise practice quizzes.
          </p>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const progressPercent = Math.round((cat.completedCount / cat.topicsCount) * 100);

          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 transition-all hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cat.accentBg}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {cat.completedCount}/{cat.topicsCount} Topics
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {cat.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cat.desc}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    <span>Overall Progress</span>
                    <span className="text-[#5D50EB]">{progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={cat.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
                >
                  <span>Explore {cat.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
