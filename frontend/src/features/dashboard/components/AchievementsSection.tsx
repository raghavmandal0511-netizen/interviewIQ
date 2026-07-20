"use client";

import { Trophy, Flame, Zap, Star } from "lucide-react";
import { AchievementCard } from "@/components/cards/AchievementCard";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { useDashboardQuery } from "@/features/dashboard/hooks";

export function AchievementsSection() {
  const { data: dashboard } = useDashboardQuery();

  const streak = dashboard?.dailyStreak.currentStreak ?? 0;
  const questionsSolved = dashboard?.dashboardSummary.questionsSolved ?? 0;
  const highestScore = dashboard?.testStatistics.highestScore ?? 0;
  const hrAnswered = dashboard?.hrStatistics.questionsAnswered ?? 0;

  const hasAnyProgress =
    streak > 0 || questionsSolved > 0 || highestScore > 0 || hrAnswered > 0;

  const achievements = [
    {
      id: "ach-1",
      title: "Consistency Master",
      description: "Maintain a 7-day daily learning streak",
      icon: Flame,
      unlocked: streak >= 7,
    },
    {
      id: "ach-2",
      title: "Speed Arithmetic Ace",
      description: "Solve 10 practice questions",
      icon: Zap,
      unlocked: questionsSolved >= 10,
    },
    {
      id: "ach-3",
      title: "Mock Exam Champion",
      description: "Score 85%+ in a full length placement test",
      icon: Trophy,
      unlocked: highestScore >= 85,
    },
    {
      id: "ach-4",
      title: "HR Interview Prodigy",
      description: "Answer 5 HR interview practice questions",
      icon: Star,
      unlocked: hrAnswered >= 5,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <DashboardCard
      title={
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-amber-500 fill-amber-400" />
          <span>Unlocked Achievements</span>
        </div>
      }
      subtitle={
        hasAnyProgress
          ? `${unlockedCount} of ${achievements.length} milestones earned during your placement preparation`
          : "Milestones & badges earned during your placement preparation"
      }
    >
      {hasAnyProgress ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item) => (
            <AchievementCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800">
          <Trophy className="h-8 w-8 text-slate-400 mb-2" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            No Achievements Unlocked Yet
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mt-1">
            Start practicing, take mock tests, and build your streak to earn badges.
          </p>
        </div>
      )}
    </DashboardCard>
  );
}
