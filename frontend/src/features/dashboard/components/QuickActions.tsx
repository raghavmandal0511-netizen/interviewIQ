"use client";

import {
  Brain,
  FileCheck,
  MessageSquare,
  Bot,
  BarChart3,
  UserCheck,
  BookOpen,
  Briefcase,
  ClipboardCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { QuickActionCard } from "@/components/cards/QuickActionCard";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useDashboardQuery } from "@/features/dashboard/hooks";
import { mapQuickActionRoute } from "@/features/dashboard/utils/dashboard-helpers";

const ICON_MAP: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  "clipboard-check": ClipboardCheck,
  briefcase: Briefcase,
  bot: Bot,
  "chart-bar": BarChart3,
};

const API_DESCRIPTIONS: Record<string, string> = {
  "Continue Learning": "Pick up where you left off in aptitude modules",
  "Start Mock Test": "Timed full-length exam simulations",
  "HR Interview": "Sample answers & behavioral questions",
  "AI Interview": "Interactive voice & video interview simulator",
  "View Reports": "Detailed analytics & strength analysis",
};

export function QuickActions() {
  const { data: dashboard } = useDashboardQuery();
  const apiActions = dashboard?.quickActions ?? [];

  const mappedApiActions = apiActions.map((action, index) => ({
    title: action.title,
    description: API_DESCRIPTIONS[action.title] ?? "Jump into your preparation workflow",
    href: mapQuickActionRoute(action.route),
    icon: ICON_MAP[action.icon] ?? Brain,
    variant: (index % 2 === 0 ? "primary" : "outline") as "primary" | "outline",
  }));

  const profileAction = {
    title: "Edit Profile & Target Role",
    description: "Update resume, target company & skills",
    href: ROUTES.dashboard.profileEdit,
    icon: UserCheck,
    variant: "outline" as const,
  };

  const fallbackActions = [
    {
      title: "Start Aptitude Practice",
      description: "Solve Quantitative, Logical & Verbal questions",
      href: ROUTES.dashboard.generalAptitude,
      icon: Brain,
      variant: "primary" as const,
    },
    {
      title: "Take Mock Test",
      description: "Timed full-length exam simulations",
      href: ROUTES.dashboard.tests,
      icon: FileCheck,
      variant: "outline" as const,
    },
    {
      title: "HR Interview Prep",
      description: "Sample answers & behavioral questions",
      href: ROUTES.dashboard.interviewHr,
      icon: MessageSquare,
      variant: "outline" as const,
    },
    {
      title: "Start AI Interview",
      description: "Interactive voice & video interview simulator",
      href: ROUTES.dashboard.interviewAi,
      icon: Bot,
      variant: "primary" as const,
    },
    {
      title: "View Performance Reports",
      description: "Detailed analytics & strength analysis",
      href: ROUTES.dashboard.reports,
      icon: BarChart3,
      variant: "outline" as const,
    },
    profileAction,
  ];

  const actions =
    mappedApiActions.length > 0
      ? [...mappedApiActions, profileAction]
      : fallbackActions;

  return (
    <DashboardCard
      title="Quick Actions"
      subtitle="Jump directly into your key preparation workflows"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <QuickActionCard key={action.title} {...action} />
        ))}
      </div>
    </DashboardCard>
  );
}
