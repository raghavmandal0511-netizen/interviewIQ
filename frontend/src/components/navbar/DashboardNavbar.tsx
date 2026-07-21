"use client";

import Link from "next/link";
import { Search, Menu, PanelLeftClose, PanelLeft } from "lucide-react";
import { useUiStore } from "@/store/ui.store";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import { ProfileMenu } from "@/components/navbar/ProfileMenu";
import { NotificationDropdown } from "@/components/navbar/NotificationDropdown";
import { ROUTES } from "@/constants/routes";

export function DashboardNavbar() {
  const {
    isSidebarCollapsed,
    toggleSidebarCollapsed,
    toggleSidebar,
    searchQuery,
    setSearchQuery,
  } = useUiStore();

  return (
    <header className="glass-panel sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/[0.06] dark:bg-[#111827]/90">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 md:hidden dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08]"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            onClick={toggleSidebarCollapsed}
            className="hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 md:flex dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400 dark:hover:bg-white/[0.08] dark:hover:text-slate-100"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>

          <Link href={ROUTES.dashboard.root} className="flex items-center space-x-0.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Interview
            </span>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
              IQ
            </span>
          </Link>
        </div>

        <div className="mx-2 hidden max-w-lg flex-1 sm:flex">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, questions, mock tests..."
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-[#5D50EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500/50 dark:focus:bg-white/[0.06] dark:focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <NotificationDropdown />
          <ThemeToggle />
          <div className="hidden h-5 w-px bg-slate-200 sm:block dark:bg-white/[0.08]" />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
