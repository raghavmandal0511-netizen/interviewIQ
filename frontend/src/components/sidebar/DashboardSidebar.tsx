"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Brain,
  Video,
  BarChart3,
  User,
  Settings,
  LogOut,
  X,
  Sparkles,
  FileCheck,
} from "lucide-react";
import { useUiStore } from "@/store/ui.store";
import { ROUTES } from "@/constants/routes";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import { useAuthStore } from "@/store/auth.store";

interface SidebarNavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const navLinks: SidebarNavLink[] = [
  {
    title: "Dashboard",
    href: ROUTES.dashboard.root,
    icon: LayoutGrid,
  },
  {
    title: "General Aptitude",
    href: ROUTES.dashboard.generalAptitude,
    icon: Brain,
  },
  {
    title: "Mock Tests",
    href: ROUTES.dashboard.tests,
    icon: FileCheck,
    badge: "New",
  },
  {
    title: "Interview Prep",
    href: ROUTES.dashboard.interview,
    icon: Video,
  },
  {
    title: "Reports & Analytics",
    href: ROUTES.dashboard.reports,
    icon: BarChart3,
  },
  {
    title: "My Profile",
    href: ROUTES.dashboard.profile,
    icon: User,
  },
  {
    title: "Settings",
    href: ROUTES.dashboard.profileEdit,
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { isSidebarOpen, setSidebarOpen, isSidebarCollapsed } = useUiStore();

  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
    router.push(ROUTES.login);
  };

  const isLinkActive = (href: string) => {
    if (href === ROUTES.dashboard.root) {
      return pathname === ROUTES.dashboard.root;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ---------------- Desktop Sidebar ---------------- */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarCollapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col justify-between sticky top-16 h-[calc(100vh-4rem)] border-r border-slate-200/80 bg-white/90 backdrop-blur-md p-3 dark:border-slate-800/80 dark:bg-slate-900/90 z-30 shrink-0 select-none overflow-x-hidden"
      >
        {/* Navigation Items */}
        <div className="space-y-6">
          
          {/* Main Navigation List */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              const Icon = link.icon;

              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "bg-[#5D50EB] text-white shadow-md shadow-purple-500/25"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        active ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                      }`}
                    />

                    {!isSidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="truncate flex-1"
                      >
                        {link.title}
                      </motion.span>
                    )}

                    {!isSidebarCollapsed && link.badge && (
                      <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-300">
                        {link.badge}
                      </span>
                    )}

                    {/* Active Pill Indicator */}
                    {active && !isSidebarCollapsed && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white"
                      />
                    )}
                  </Link>

                  {/* Tooltip when Collapsed */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:block z-50 rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white shadow-lg dark:bg-slate-800 whitespace-nowrap">
                      {link.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions: Upgrade Promo & Logout */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {!isSidebarCollapsed && (
            <div className="rounded-xl bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-purple-600/10 border border-purple-500/20 p-3 text-center relative overflow-hidden dark:bg-purple-950/30">
              <div className="flex items-center justify-center space-x-1 text-xs font-bold text-[#5D50EB] dark:text-purple-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>InterviewIQ Pro</span>
              </div>
              <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                Unlimited AI Mock Interviews & Analytics
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors ${
                isSidebarCollapsed ? "justify-center w-full" : "flex-1"
              }`}
              title="Logout"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!isSidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ---------------- Mobile Drawer Overlay ---------------- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Mobile Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-md p-6 shadow-2xl dark:bg-slate-900/95 md:hidden flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Header Logo & Close Button */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <Link
                    href={ROUTES.dashboard.root}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center space-x-0.5"
                  >
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Interview
                    </span>
                    <span className="text-xl font-extrabold text-[#5D50EB]">IQ</span>
                  </Link>

                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-[#5D50EB] text-white shadow-md shadow-purple-500/20"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{link.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Theme</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 text-xs font-bold text-rose-600 dark:text-rose-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
