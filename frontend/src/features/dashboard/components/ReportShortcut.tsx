"use client";

import Link from "next/link";
import { BarChart3, ArrowRight } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

export function ReportShortcut() {
  return (
    <DashboardCard className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-slate-900/80 dark:to-purple-950/20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5D50EB] text-white shadow-sm">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Want a comprehensive skill breakdown report?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Download or view full analytics report with AI recommendations.
            </p>
          </div>
        </div>
        <Link
          href={ROUTES.dashboard.reports}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all shrink-0"
        >
          <span>Open Full Reports</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </DashboardCard>
  );
}
