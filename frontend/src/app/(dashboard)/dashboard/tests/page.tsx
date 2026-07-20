"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileCheck, Clock, Award, Play, CheckCircle2 } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

const mockTests = [
  {
    id: "test-1",
    title: "Full Length Placement Exam #1",
    category: "All-in-One Mock",
    duration: "60 mins",
    questions: 50,
    difficulty: "Hard",
    completed: true,
    lastScore: "88/100",
  },
  {
    id: "test-2",
    title: "Logical Reasoning Speed Test",
    category: "Logical",
    duration: "30 mins",
    questions: 25,
    difficulty: "Medium",
    completed: true,
    lastScore: "42/50",
  },
  {
    id: "test-3",
    title: "Quantitative Aptitude Mastery Test",
    category: "Arithmetic",
    duration: "45 mins",
    questions: 35,
    difficulty: "Hard",
    completed: false,
    lastScore: "-",
  },
  {
    id: "test-4",
    title: "Verbal & Grammar Accuracy Test",
    category: "Verbal",
    duration: "25 mins",
    questions: 30,
    difficulty: "Medium",
    completed: false,
    lastScore: "-",
  },
];

export default function TestsPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Mock Tests & Exam Simulations
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Take full-length timed mock tests designed by industry experts to simulate company placement exams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTests.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 text-xs font-bold text-[#5D50EB] dark:text-purple-300">
                  {t.category}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {t.difficulty}
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                {t.title}
              </h3>

              <div className="mt-3 flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {t.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FileCheck className="h-3.5 w-3.5 text-slate-400" />
                  {t.questions} Questions
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                {t.completed ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Passed ({t.lastScore})
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-400">Not Attempted Yet</span>
                )}
              </div>

              <Link
                href={`${ROUTES.dashboard.tests}/${t.id}/instructions`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>{t.completed ? "Retake Test" : "Start Test"}</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
