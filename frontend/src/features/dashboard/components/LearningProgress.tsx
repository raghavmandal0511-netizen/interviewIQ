"use client";

import { motion } from "framer-motion";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { Brain, FileCheck, Video, BookOpen } from "lucide-react";

export function LearningProgress() {
  const domains = [
    { title: "General Aptitude", progress: 82, color: "#5D50EB", icon: Brain },
    { title: "Mock Tests", progress: 65, color: "#10b981", icon: FileCheck },
    { title: "HR Interview Prep", progress: 74, color: "#f59e0b", icon: BookOpen },
    { title: "AI Interview Simulation", progress: 58, color: "#ec4899", icon: Video },
  ];

  return (
    <DashboardCard
      title="Overall Placement Preparedness"
      subtitle="Track your overall readiness across core interview modules"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Circular Progress Ring (Span 5) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
          <ProgressRing
            progress={72}
            size={140}
            strokeWidth={12}
            color="#5D50EB"
            label="72%"
            sublabel="Ready for Placements"
          />
          <p className="mt-3 text-xs font-semibold text-center text-slate-600 dark:text-slate-300">
            High Chance of Placement Clearance
          </p>
        </div>

        {/* Linear Progress Bars per domain (Span 7) */}
        <div className="md:col-span-7 space-y-4">
          {domains.map((d) => (
            <div key={d.title} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 font-bold text-slate-800 dark:text-slate-200">
                  <d.icon className="h-4 w-4 text-[#5D50EB]" />
                  <span>{d.title}</span>
                </div>
                <span className="font-extrabold text-[#5D50EB]">{d.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: d.color }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardCard>
  );
}

export function OverallProgress() {
  return <LearningProgress />;
}
