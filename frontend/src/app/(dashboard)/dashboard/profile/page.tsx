"use client";

import Link from "next/link";
import { Edit, Globe } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const targetRole = useAuthStore((state) => state.targetRole);

  const userName = user?.name || "John Doe";
  const userEmail = user?.email || "john.doe@example.com";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "JD";

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#5D50EB] to-indigo-500 font-extrabold text-2xl text-white shadow-lg">
            {initials}
          </div>
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold">{userName}</h1>
              <span className="rounded-full bg-purple-500/20 border border-purple-400/30 px-3 py-0.5 text-xs font-bold text-purple-300">
                Pro Plan
              </span>
            </div>
            <p className="text-xs text-slate-300 font-semibold">
              {targetRole || "Software Engineer Candidate"}
            </p>
            <p className="text-xs text-slate-400">
              {userEmail} • Active Candidate
            </p>
          </div>
          <div>
            <Link
              href={ROUTES.dashboard.profileEdit}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Career Target & Skills">
          <div className="space-y-4 text-xs">
            <div>
              <span className="font-bold text-slate-400 block uppercase tracking-wider text-[10px]">
                Target Role
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {targetRole || "Senior Fullstack Engineer"}
              </span>
            </div>

            <div>
              <span className="font-bold text-slate-400 block uppercase tracking-wider text-[10px] mb-2">
                Key Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js 15", "TypeScript", "React 19", "Node.js", "Express", "MongoDB", "System Design", "Tailwind CSS"].map((s) => (
                  <span
                    key={s}
                    className="rounded-lg bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 text-xs font-semibold text-[#5D50EB] dark:text-purple-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Social Links & Portfolio">
          <div className="space-y-3 text-xs">
            <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <GithubIcon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
              <span className="font-semibold text-slate-800 dark:text-white">
                github.com/{userName.toLowerCase().replace(/\s+/g, "")}
              </span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <LinkedinIcon className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-slate-800 dark:text-white">
                linkedin.com/in/{userName.toLowerCase().replace(/\s+/g, "")}
              </span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <Globe className="h-4 w-4 text-[#5D50EB]" />
              <span className="font-semibold text-slate-800 dark:text-white">
                {userName.toLowerCase().replace(/\s+/g, "")}.dev
              </span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
