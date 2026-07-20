"use client";

import { cn } from "@/lib/utils";

type PageSkeletonProps = {
  className?: string;
  rows?: number;
};

export function PageSkeleton({ className, rows = 4 }: PageSkeletonProps) {
  return (
    <div className={cn("space-y-6 pb-12 animate-pulse", className)}>
      <div className="h-40 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="h-16 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="lg:col-span-5 h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={`row-${i}`}
            className="h-36 rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60"
          />
        ))}
      </div>
    </div>
  );
}
