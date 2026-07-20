import {
  ContinueLearning,
  DailyStreak,
  LearningProgress,
  OverallProgress,
  PerformanceSummary,
  QuickActions,
  RecentActivity,
  RecommendedTopics,
  ReportShortcut,
  StrongTopics,
  WeakTopics,
  WelcomeBanner,
} from "@/features/dashboard/components";

export default function DashboardHomePage() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Dashboard home architecture placeholder.</p>
      <p>TODO: Implement dashboard home UI.</p>

      <WelcomeBanner />
      <DailyStreak />
      <OverallProgress />
      <ContinueLearning />
      <QuickActions />
      <LearningProgress />
      <RecentActivity />
      <WeakTopics />
      <StrongTopics />
      <PerformanceSummary />
      <RecommendedTopics />
      <ReportShortcut />
    </main>
  );
}
