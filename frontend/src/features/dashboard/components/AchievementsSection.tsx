"use client";

import { Trophy, Flame, Zap, Star } from "lucide-react";
import { AchievementCard } from "@/components/cards/AchievementCard";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { useAuthStore } from "@/store/auth.store";

export function AchievementsSection() {
  const unlocked = useAuthStore((state) => state.progress.unlockedAchievements);

  const achievements = [
    {
      id: "ach-1",
      title: "Consistency Master",
      description: "Maintain a 7-day daily learning streak",
      icon: Flame,
      unlocked: unlocked.includes("ach-1"),
      date: unlocked.includes("ach-1") ? "Jul 20" : undefined,
    },
    {
      id: "ach-2",
      title: "Speed Arithmetic Ace",
      description: "Solve 10 math questions under 5 minutes",
      icon: Zap,
      unlocked: unlocked.includes("ach-2"),
      date: unlocked.includes("ach-2") ? "Jul 18" : undefined,
    },
    {
      id: "ach-3",
      title: "Mock Exam Champion",
      description: "Score 85%+ in a full length placement test",
      icon: Trophy,
      unlocked: unlocked.includes("ach-3"),
      date: unlocked.includes("ach-3") ? "Jul 15" : undefined,
    },
    {
      id: "ach-4",
      title: "AI Interview Prodigy",
      description: "Achieve a 4.8 rating in AI Technical Interview",
      icon: Star,
      unlocked: unlocked.includes("ach-4"),
    },
  ];

  return (
    <DashboardCard
      title={
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-amber-500 fill-amber-400" />
          <span>Unlocked Achievements</span>
        </div>
      }
      subtitle="Milestones & badges earned during your placement preparation"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((item) => (
          <AchievementCard key={item.title} {...item} />
        ))}
      </div>
    </DashboardCard>
  );
}
