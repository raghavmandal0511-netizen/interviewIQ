"use client";

import { Trophy, Flame, Zap, Award, Target, Star } from "lucide-react";
import { AchievementCard } from "@/components/cards/AchievementCard";
import { DashboardCard } from "@/components/cards/DashboardCard";

export function AchievementsSection() {
  const achievements = [
    {
      title: "Consistency Master",
      description: "Maintained a 7-day daily learning streak",
      icon: Flame,
      unlocked: true,
      date: "Jul 20",
    },
    {
      title: "Speed Arithmetic Ace",
      description: "Solved 10 math questions under 5 minutes",
      icon: Zap,
      unlocked: true,
      date: "Jul 18",
    },
    {
      title: "Mock Exam Champion",
      description: "Scored 85%+ in a full length placement test",
      icon: Trophy,
      unlocked: true,
      date: "Jul 15",
    },
    {
      title: "AI Interview Prodigy",
      description: "Achieved a 4.8 rating in AI Technical Interview",
      icon: Star,
      unlocked: false,
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
