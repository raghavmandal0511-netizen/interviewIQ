"use client";

import Link from "next/link";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { FileText, ArrowRight, Play } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

export function RecentTests() {
  const recentTests = useAuthStore((state) => state.progress.recentTests);

  return (
    <DashboardCard
      title="Recent Mock Tests"
      subtitle="View your latest exam attempt results & detailed solution reviews"
      action={
        <Link
          href={ROUTES.dashboard.tests}
          className="text-xs font-bold text-[#5D50EB] hover:underline dark:text-purple-400"
        >
          View All Tests →
        </Link>
      }
    >
      {recentTests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-3 pl-1">Test Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Score</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-1">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
              {recentTests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pl-1 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#5D50EB] shrink-0" />
                    <span>{test.name}</span>
                  </td>
                  <td className="py-3.5">
                    <span className="rounded-md bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 font-semibold text-purple-700 dark:text-purple-300">
                      {test.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500">{test.date}</td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{test.score}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {test.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-1">
                    <Link
                      href={`${ROUTES.dashboard.tests}/${test.id}/result`}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#5D50EB] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
                    >
                      <span>View Result</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950 text-[#5D50EB] mb-3">
            <FileText className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Mock Tests Attempted Yet</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            You haven&apos;t taken any mock exams yet. Start your first timed test to evaluate your skills.
          </p>
          <Link
            href={ROUTES.dashboard.tests}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Take First Mock Test</span>
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
