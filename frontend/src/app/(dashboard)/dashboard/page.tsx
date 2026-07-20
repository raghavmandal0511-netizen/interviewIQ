"use client";

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
  return (
    <div className="space-y-6 pb-12">
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
