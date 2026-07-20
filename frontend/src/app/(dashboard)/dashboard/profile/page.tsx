"use client";

import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  Briefcase,
  Edit,
  FileCheck,
  Globe,
  GraduationCap,
  LogOut,
  MessageSquare,
  BookOpen,
  Target,
} from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { StatCard } from "@/components/cards/StatCard";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { ErrorState, PageSkeleton, EmptyState } from "@/components/shared/states";
import { ROUTES } from "@/constants/routes";
import { useLogoutMutation, useProfileQuery } from "@/features/auth/hooks";
import { useReportsOverviewQuery } from "@/features/reports/hooks";
import { formatPercent } from "@/utils/format";

function formatRange(start?: string, end?: string, ongoing?: boolean) {
  const fmt = (v?: string) => {
    if (!v) return "";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };
  const s = fmt(start);
  if (!s) return "";
  if (ongoing) return `${s} – Present`;
  const e = fmt(end);
  return e ? `${s} – ${e}` : s;
}

export default function ProfilePage() {
  const { data: user, isLoading: profileLoading, isError, refetch } = useProfileQuery();
  const { data: overview, isLoading: overviewLoading } = useReportsOverviewQuery();
  const logout = useLogoutMutation();

  if (profileLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 pb-12">
        <PageSkeleton rows={3} />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 pb-12">
        <ErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  const initials =
    user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-white/[0.06] dark:bg-[#161B22] dark:shadow-[var(--shadow-card)]">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-semibold text-white">
            {initials}
          </div>
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {user.targetRole || "Placement Candidate"}
            </p>
            <p className="text-xs text-zinc-400">{user.email}</p>
            {user.userName ? (
              <p className="text-xs text-zinc-500">@{user.userName}</p>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Link
              href={ROUTES.dashboard.profileEdit}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              <Edit className="h-4 w-4" />
              Settings
            </Link>
            <button
              type="button"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 disabled:opacity-70"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {overviewLoading ? (
        <PageSkeleton rows={2} />
      ) : overview ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard title="Overall Progress" value={formatPercent(overview.overallProgress ?? 0, 0)} icon={Target} />
          <StatCard title="Tests Completed" value={overview.testsCompleted ?? 0} icon={FileCheck} />
          <StatCard title="Topics Completed" value={overview.completedTopics ?? 0} icon={BookOpen} />
          <StatCard title="HR Answers" value={overview.hrQuestionsAnswered ?? 0} icon={MessageSquare} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DashboardCard title="About" hoverEffect={false}>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {user.bio || "Add a bio in Settings to tell recruiters about your goals."}
          </p>
        </DashboardCard>

        <DashboardCard title="Career" hoverEffect={false}>
          <div className="space-y-3 text-sm">
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Target Role
              </span>
              <span className="font-medium text-zinc-900 dark:text-white">
                {user.targetRole || "Not set"}
              </span>
            </div>
            <div>
              <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Skills
              </span>
              {user.skills && user.skills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500">No skills added yet.</p>
              )}
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DashboardCard title="Education" hoverEffect={false}>
          {!user.education?.length ? (
            <EmptyState
              title="No education added"
              description="Add your school and degree from Settings."
            />
          ) : (
            <ul className="space-y-3">
              {user.education.map((edu) => (
                <li key={edu._id} className="flex gap-3 text-sm">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{edu.degree}</p>
                    <p className="text-xs text-zinc-500">{edu.institute}</p>
                    <p className="text-[11px] text-zinc-400">
                      {formatRange(edu.startDate, edu.endDate, edu.currentlyStudying)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>

        <DashboardCard title="Work Experience" hoverEffect={false}>
          {!user.experience?.length ? (
            <EmptyState
              title="No work experience"
              description="Add internships or jobs from Settings."
            />
          ) : (
            <ul className="space-y-3">
              {user.experience.map((exp) => (
                <li key={exp._id} className="flex gap-3 text-sm">
                  <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{exp.jobTitle}</p>
                    <p className="text-xs text-zinc-500">{exp.company}</p>
                    <p className="text-[11px] text-zinc-400">
                      {formatRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>
      </div>

      <DashboardCard title="Social Links" hoverEffect={false}>
        <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-4">
          <SocialLink icon={GitHubIcon} label="GitHub" href={user.socialLinks?.github} />
          <SocialLink icon={LinkedInIcon} label="LinkedIn" href={user.socialLinks?.linkedIn} />
          <SocialLink icon={Globe} label="Portfolio" href={user.socialLinks?.portfolio} />
        </div>
      </DashboardCard>
    </div>
  );
}

function SocialLink({
  icon: Icon,
  label,
  href,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  label: string;
  href?: string;
}) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 text-xs text-zinc-500">
        <Icon className="h-4 w-4" />
        {label}: Not set
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-xs font-medium text-blue-500 hover:underline"
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}
