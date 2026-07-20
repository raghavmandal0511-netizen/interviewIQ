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
import { useDashboardQuery } from "@/features/dashboard/hooks";
import { PageSkeleton, ErrorState } from "@/components/shared/states";

export default function DashboardHomePage() {
  const { isLoading, isError, error, refetch } = useDashboardQuery();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "We couldn't load your dashboard. Please try again."}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <WelcomeBanner />
      <MotivationalQuote />
      <QuickStats />

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

      <QuickActions />
      <PerformanceSummary />
      <RecommendedTopics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeakTopics />
        <StrongTopics />
      </div>

      <RecentTests />
      <RecentInterviews />
      <AchievementsSection />
      <ReportShortcut />
    </div>
  );
}
