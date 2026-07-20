"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { ROUTES } from "@/constants/routes";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40">
        <AlertTriangle className="h-8 w-8 text-rose-500" />
      </div>
      <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">
        Dashboard Error
      </h1>
      <p className="mt-2 max-w-md text-xs text-slate-500 dark:text-slate-400">
        {error.message || "Something went wrong while loading this page."}
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#4d40db]"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
        <Link
          href={ROUTES.dashboard.root}
          className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-400"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
