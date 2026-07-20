"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, CheckCircle2, Play, BookOpen, Clock } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

const arithmeticTopics = [
  {
    slug: "time-speed-distance",
    title: "Time, Speed & Distance",
    desc: "Relative speed, train problems, boats & streams, and average speed calculations.",
    questions: 25,
    accuracy: 85,
    status: "Mastered",
  },
  {
    slug: "percentages",
    title: "Percentages & Fractions",
    desc: "Percentage change, successive discounts, population growth, and election problems.",
    questions: 30,
    accuracy: 94,
    status: "Mastered",
  },
  {
    slug: "profit-and-loss",
    title: "Profit, Loss & Discount",
    desc: "Marked price, cost price, fraudulent dealers, and partnership profit distribution.",
    questions: 20,
    accuracy: 78,
    status: "In Progress",
  },
  {
    slug: "permutations-combinations",
    title: "Permutations & Combinations",
    desc: "Arrangements, selections, probability basics, and circular permutations.",
    questions: 18,
    accuracy: 45,
    status: "Needs Practice",
  },
];

export default function ArithmeticPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-[#5D50EB]">
          <Link href={ROUTES.dashboard.generalAptitude} className="hover:underline">
            General Aptitude
          </Link>
          <span>/</span>
          <span>Arithmetic</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
          Arithmetic Aptitude Topics
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {arithmeticTopics.map((t) => (
          <motion.div
            key={t.slug}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calculator className="h-4 w-4 text-[#5D50EB]" />
                  {t.title}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    t.status === "Mastered"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
                      : t.status === "In Progress"
                      ? "bg-purple-50 text-[#5D50EB] dark:bg-purple-950 dark:text-purple-300"
                      : "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300"
                  }`}
                >
                  {t.status} ({t.accuracy}%)
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">
                {t.questions} Practice Questions
              </span>
              <div className="flex space-x-2">
                <Link
                  href={`${ROUTES.dashboard.arithmetic}/${t.slug}/practice`}
                  className="inline-flex items-center gap-1 rounded-xl bg-[#5D50EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
                >
                  <Play className="h-3 w-3 fill-white" />
                  <span>Practice</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
