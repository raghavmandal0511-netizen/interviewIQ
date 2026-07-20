"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useLogoutMutation } from "@/features/auth/hooks";
import { cn } from "@/lib/utils";

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
  const logoutMutation = useLogoutMutation();
  const { isSidebarOpen, setSidebarOpen, isSidebarCollapsed } = useUiStore();

  const handleLogout = () => {
    setSidebarOpen(false);
    logoutMutation.mutate();
  };

  const isLinkActive = (href: string) => {
    if (href === ROUTES.dashboard.root) {
      return pathname === ROUTES.dashboard.root;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isSidebarCollapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="z-30 sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 select-none flex-col justify-between overflow-x-hidden border-r border-zinc-200/80 bg-white/95 p-3 backdrop-blur-md dark:border-white/[0.06] dark:bg-[#0F172A] md:flex"
      >
        <div className="space-y-6">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              const Icon = link.icon;

              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200",
                      active
                        ? "bg-[#5D50EB] text-white shadow-md shadow-purple-500/20 dark:bg-indigo-500/15 dark:text-indigo-200 dark:shadow-[0_0_20px_-6px_rgba(99,102,241,0.45)] dark:ring-1 dark:ring-indigo-500/30"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-100",
                      isSidebarCollapsed && "justify-center px-2",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors duration-200",
                        active
                          ? "text-white dark:text-indigo-300"
                          : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-200",
                      )}
                    />

                    {!isSidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 truncate"
                      >
                        {link.title}
                      </motion.span>
                    )}

                    {!isSidebarCollapsed && link.badge && (
                      <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
                        {link.badge}
                      </span>
                    )}

                    {active && !isSidebarCollapsed && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white dark:bg-indigo-300"
                      />
                    )}
                  </Link>

                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white shadow-lg group-hover:block dark:bg-[#1F2937] dark:ring-1 dark:ring-white/10">
                      {link.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-4 dark:border-white/[0.06]">
          {!isSidebarCollapsed && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-center dark:border-indigo-500/20 dark:bg-indigo-500/[0.07]">
              <div className="flex items-center justify-center space-x-1 text-xs font-bold text-[#5D50EB] dark:text-indigo-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>InterviewIQ Pro</span>
              </div>
              <p className="mt-1 text-[10px] leading-tight text-slate-500 dark:text-slate-400">
                Unlimited AI Mock Interviews & Analytics
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10",
                isSidebarCollapsed ? "w-full justify-center" : "flex-1",
              )}
              title="Logout"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!isSidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm md:hidden dark:bg-black/60"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between bg-white/95 p-6 shadow-2xl backdrop-blur-md md:hidden dark:bg-[#0F172A]/98 dark:ring-1 dark:ring-white/[0.06]"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/[0.06]">
                  <Link
                    href={ROUTES.dashboard.root}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center space-x-0.5"
                  >
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Interview
                    </span>
                    <span className="text-xl font-extrabold text-[#5D50EB] dark:text-indigo-400">
                      IQ
                    </span>
                  </Link>

                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors",
                          active
                            ? "bg-[#5D50EB] text-white shadow-md shadow-purple-500/20 dark:bg-indigo-500/15 dark:text-indigo-200 dark:ring-1 dark:ring-indigo-500/30"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.04]",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{link.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Theme
                  </span>
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
