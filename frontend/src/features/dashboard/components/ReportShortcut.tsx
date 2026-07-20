"use client";

import Link from "next/link";
import { BarChart3, ArrowRight } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

export function ReportShortcut() {
  return (
    <DashboardCard className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-500/[0.08] dark:to-violet-500/[0.05]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5D50EB] text-white shadow-sm dark:bg-indigo-500 dark:shadow-[0_8px_20px_-8px_rgba(99,102,241,0.45)]">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">
              Want a comprehensive skill breakdown report?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Download or view full analytics report with AI recommendations.
            </p>
          </div>
        </div>
        <Link
          href={ROUTES.dashboard.reports}
          className="btn-primary-premium inline-flex shrink-0 items-center gap-2"
        >
          <span>Open Full Reports</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </DashboardCard>
  );
}
