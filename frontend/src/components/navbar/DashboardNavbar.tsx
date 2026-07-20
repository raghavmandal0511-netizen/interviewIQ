"use client";

import Link from "next/link";
import { Search, Menu, PanelLeftClose, PanelLeft } from "lucide-react";
import { motion } from "framer-motion";
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left Side: Logo & Collapse Toggle */}
        <div className="flex items-center space-x-3">
          {/* Mobile Drawer Trigger */}
          <button
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={toggleSidebarCollapsed}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>

          {/* Logo (shown on mobile or when collapsed) */}
          <Link href={ROUTES.dashboard.root} className="flex items-center space-x-0.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Interview
            </span>
            <span className="text-xl font-extrabold text-[#5D50EB]">
              IQ
            </span>
          </Link>
        </div>

        {/* Center: Search Box */}
        <div className="hidden sm:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, questions, mock tests..."
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-[#5D50EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder-slate-500 dark:focus:border-purple-500"
            />
          </div>
        </div>

        {/* Right Side: Utilities & User Menu */}
        <div className="flex items-center space-x-3">
          <NotificationDropdown />
          <ThemeToggle />
          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <ProfileMenu />
        </div>

      </div>
    </header>
  );
}
