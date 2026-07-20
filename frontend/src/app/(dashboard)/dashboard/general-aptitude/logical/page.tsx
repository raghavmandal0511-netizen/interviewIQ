"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Play } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const logicalTopics = [
  {
    slug: "blood-relations",
    title: "Blood Relations & Family Tree",
    desc: "Decipher family structures, coded relations, and direct puzzle statements.",
    questions: 22,
    accuracy: 90,
    status: "Mastered",
  },
  {
    slug: "syllogisms",
    title: "Syllogisms & Venn Diagrams",
    desc: "Evaluate statements & conclusions using Euler circles and Venn diagram logic.",
    questions: 25,
    accuracy: 82,
    status: "In Progress",
  },
  {
    slug: "seating-arrangements",
    title: "Seating Arrangements (Linear & Circular)",
    desc: "Complex positional puzzles, facing inside/outside, and multi-variable grids.",
    questions: 20,
    accuracy: 70,
    status: "In Progress",
  },
  {
    slug: "data-sufficiency",
    title: "Data Sufficiency",
    desc: "Evaluate whether statement 1 alone or statement 2 alone is sufficient.",
    questions: 15,
    accuracy: 52,
    status: "Needs Practice",
  },
];

export default function LogicalPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-[#5D50EB]">
          <Link href={ROUTES.dashboard.generalAptitude} className="hover:underline">
            General Aptitude
          </Link>
          <span>/</span>
          <span>Logical Reasoning</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
          Logical Reasoning Topics
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logicalTopics.map((t) => (
          <motion.div
            key={t.slug}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Brain className="h-4 w-4 text-[#5D50EB]" />
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
              <Link
                href={`${ROUTES.dashboard.logical}/${t.slug}`}
                className="inline-flex items-center gap-1 rounded-xl bg-[#5D50EB] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
              >
                <Play className="h-3 w-3 fill-white" />
                <span>Practice</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
