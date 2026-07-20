"use client";

import { motion } from "framer-motion";
import { Download, BarChart3, TrendingUp, Target, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { PerformanceSummary } from "@/features/dashboard/components/PerformanceSummary";
import { DashboardCard } from "@/components/cards/DashboardCard";

export default function ReportsPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Performance & Skill Analytics Reports
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deep dive into your speed, accuracy, weak topics, and placement readiness scores.
          </p>
        </div>
        <button
          onClick={() => alert("Downloading PDF Performance Report...")}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>Download Full Report (PDF)</span>
        </button>
      </div>

      {/* Analytics Charts */}
      <PerformanceSummary />

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Speed vs Accuracy">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Avg Time per Question</span>
              <span className="font-bold text-slate-900 dark:text-white">54 seconds</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Accuracy Rate</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">78% (Above Average)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Percentile Rank</span>
              <span className="font-bold text-[#5D50EB] dark:text-purple-400">Top 8%</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Placement Probability">
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <span className="text-4xl font-extrabold text-[#5D50EB] dark:text-purple-400">
              88.5%
            </span>
            <span className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              High Chance for Top Tier Tech Companies
            </span>
          </div>
        </DashboardCard>

        <DashboardCard title="AI Recommendations">
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30">
              <Sparkles className="h-4 w-4 text-[#5D50EB] shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                Focus next 3 sessions on <strong>Permutations & Probability</strong> to boost quant percentile above 90%.
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
