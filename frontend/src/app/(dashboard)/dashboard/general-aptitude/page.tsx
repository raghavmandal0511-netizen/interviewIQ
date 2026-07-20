"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import {
  useModuleByKey,
  useTopicsByModule,
  type AptitudeModuleKey,
} from "@/features/aptitude/hooks";

type ModuleConfig = {
  moduleKey: AptitudeModuleKey;
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  color: string;
  accentBg: string;
  fallbackTopicsCount: number;
  fallbackCompletedCount: number;
};

const modules: ModuleConfig[] = [
  {
    moduleKey: "arithmetic",
    title: "Arithmetic Aptitude",
    desc: "Master quantitative aptitude topics including Time & Distance, Percentages, Profit & Loss, Ratios, and Permutations.",
    href: ROUTES.dashboard.arithmetic,
    icon: Calculator,
    color: "bg-[#15803d]",
    accentBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    fallbackTopicsCount: 18,
    fallbackCompletedCount: 0,
  },
  {
    moduleKey: "logical",
    title: "Logical Reasoning",
    desc: "Sharpen your logical deduction skills with Blood Relations, Syllogisms, Seating Arrangements, and Data Sufficiency.",
    href: ROUTES.dashboard.logical,
    icon: Brain,
    color: "bg-[#5D50EB]",
    accentBg: "bg-purple-50 text-purple-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    fallbackTopicsCount: 16,
    fallbackCompletedCount: 0,
  },
  {
    moduleKey: "verbal",
    title: "Verbal Ability",
    desc: "Enhance your English language proficiency, Reading Comprehension, Sentence Correction, Synonyms, and Grammar rules.",
    href: ROUTES.dashboard.verbal,
    icon: BookOpen,
    color: "bg-[#c2410c]",
    accentBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    fallbackTopicsCount: 14,
    fallbackCompletedCount: 0,
  },
];

function ModuleCard({
  config,
  index,
}: {
  config: ModuleConfig;
  index: number;
}) {
  const Icon = config.icon;
  const { data: moduleData } = useModuleByKey(config.moduleKey);
  const { data: topics } = useTopicsByModule(moduleData?._id);

  const topicsCount = topics?.length ?? config.fallbackTopicsCount;
  const completedCount = config.fallbackCompletedCount;
  const progressPercent =
    topicsCount > 0 ? Math.round((completedCount / topicsCount) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
    >
      <div>
        <div className="flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.accentBg}`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold text-slate-400">
            {topicsCount} Topics
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
          {config.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {config.desc}
        </p>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <span>Available Topics</span>
            <span className="text-[#5D50EB]">{topicsCount}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full rounded-full ${config.color}`}
              style={{ width: `${Math.max(progressPercent, topicsCount > 0 ? 8 : 0)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
        <Link
          href={config.href}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#4d40db]"
        >
          <span>Explore {config.title}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function GeneralAptitudePage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            General Aptitude Preparation
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Choose a core module to practice concepts, formulas, and topic-wise practice quizzes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {modules.map((config, index) => (
          <ModuleCard key={config.moduleKey} config={config} index={index} />
        ))}
      </div>
    </div>
  );
}
