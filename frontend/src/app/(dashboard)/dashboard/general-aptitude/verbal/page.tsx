"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Play } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const verbalTopics = [
  {
    slug: "reading-comprehension",
    title: "Reading Comprehension Strategy",
    desc: "Passage reading techniques, inferential questions, and tone identification.",
    questions: 20,
    accuracy: 72,
    status: "In Progress",
  },
  {
    slug: "synonyms-antonyms",
    title: "Vocabulary: Synonyms & Antonyms",
    desc: "High-frequency GRE/Placement vocabulary words with contextual usage.",
    questions: 35,
    accuracy: 88,
    status: "Mastered",
  },
  {
    slug: "sentence-correction",
    title: "Sentence Correction & Grammar",
    desc: "Subject-verb agreement, modifier errors, parallelism, and tense usage.",
    questions: 24,
    accuracy: 80,
    status: "Mastered",
  },
];

export default function VerbalPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-[#5D50EB]">
          <Link href={ROUTES.dashboard.generalAptitude} className="hover:underline">
            General Aptitude
          </Link>
          <span>/</span>
          <span>Verbal Ability</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
          Verbal Ability Topics
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {verbalTopics.map((t) => (
          <motion.div
            key={t.slug}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-[#5D50EB]" />
                  {t.title}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    t.status === "Mastered"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-purple-50 text-[#5D50EB] dark:bg-purple-950 dark:text-purple-300"
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
                href={`${ROUTES.dashboard.verbal}/${t.slug}`}
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
