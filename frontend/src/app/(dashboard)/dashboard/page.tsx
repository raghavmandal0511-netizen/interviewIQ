"use client";

import { Sparkles, RotateCcw, Database } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import {
  WelcomeBanner,
  QuickStats,
  DailyStreak,
  LearningProgress,
  ContinueLearning,
  QuickActions,
  RecommendedTopics,
  RecentActivity,
  PerformanceSummary,
  WeakTopics,
  StrongTopics,
  RecentTests,
  RecentInterviews,
  AchievementsSection,
  MotivationalQuote,
  ReportShortcut,
} from "@/features/dashboard/components";

export default function DashboardHomePage() {
  const progress = useAuthStore((state) => state.progress);
  const resetProgressToZero = useAuthStore((state) => state.resetProgressToZero);
  const loadDemoProgress = useAuthStore((state) => state.loadDemoProgress);

  const isZero = progress.testsTaken === 0;

  return (
    <div className="space-y-6 pb-12">
      {/* 0. New User Onboarding Banner / Mode Switcher */}
      {isZero ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-purple-200/80 bg-purple-50/70 p-4 dark:border-purple-900/50 dark:bg-purple-950/30">
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5D50EB] text-white shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                New User Account (Clean Slate: 0 Progress)
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                All stats start at 0. Start a practice test or launch an AI interview to track real progress.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={loadDemoProgress}
            className="inline-flex items-center gap-1.5 rounded-xl border border-purple-300 bg-white px-3.5 py-1.5 text-xs font-bold text-[#5D50EB] shadow-sm hover:bg-purple-50 shrink-0 dark:border-purple-800 dark:bg-slate-900 dark:text-purple-300"
          >
            <Database className="h-3.5 w-3.5" />
            <span>Load Sample Demo Data</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs px-1 text-slate-400">
          <span>Viewing Active Account Progress</span>
          <button
            type="button"
            onClick={resetProgressToZero}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Stats to 0 (New User Slate)</span>
          </button>
        </div>
      )}

      {/* 1. Welcome Banner */}
      <WelcomeBanner />

      {/* 2. Motivational Quote */}
      <MotivationalQuote />

      {/* 3. Quick Stats (6 metrics) */}
      <QuickStats />

      {/* 4. Main Two Column Grid (Streak & Learning Progress) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <LearningProgress />
          <ContinueLearning />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <DailyStreak />
          <RecentActivity />
        </div>
      </div>

      {/* 5. Quick Actions */}
      <QuickActions />

      {/* 6. Performance Summary Charts */}
      <PerformanceSummary />

      {/* 7. Recommended Topics */}
      <RecommendedTopics />

      {/* 8. Weak Topics & Strong Topics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeakTopics />
        <StrongTopics />
      </div>

      {/* 9. Recent Tests Table */}
      <RecentTests />

      {/* 10. Recent Interviews Feedback */}
      <RecentInterviews />

      {/* 11. Achievements Section */}
      <AchievementsSection />

      {/* 12. Report Shortcut Banner */}
      <ReportShortcut />
    </div>
  );
}
