"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useLogoutMutation } from "@/features/auth/hooks";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoutMutation = useLogoutMutation();

  const user = useAuthStore((state) => state.user);

  const userName = user?.name || "Candidate";
  const userEmail = user?.email || "Not signed in";
  const initials =
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "IQ";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logoutMutation.mutate();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 rounded-xl border border-slate-200/80 bg-white p-1.5 pr-3 shadow-sm transition-colors hover:bg-slate-50 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#5D50EB] to-indigo-500 text-xs font-extrabold text-white shadow-sm dark:from-indigo-500 dark:to-violet-500">
          {initials}
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#111827]" />
        </div>
        <div className="hidden flex-col text-left sm:flex">
          <span className="text-xs font-bold leading-tight text-slate-800 dark:text-slate-100">
            {userName}
          </span>
          <span className="text-[10px] font-medium leading-tight text-slate-400 dark:text-slate-500">
            Pro Plan
          </span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-md dark:border-white/[0.08] dark:bg-[#161B22]/95 dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]"
          >
            <div className="mb-1 border-b border-slate-100 px-3 py-2 dark:border-white/[0.06]">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-50">{userName}</p>
              <p className="truncate text-[11px] text-slate-400 dark:text-slate-500">{userEmail}</p>
            </div>

            <div className="space-y-0.5">
              <Link
                href={ROUTES.dashboard.profile}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
              >
                <User className="h-4 w-4 text-slate-400" />
                <span>Profile</span>
              </Link>

              <Link
                href={ROUTES.dashboard.profileEdit}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                <span>Settings</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  toast.message("Support: support@interviewiq.com");
                }}
                className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
              >
                <HelpCircle className="h-4 w-4 text-slate-400" />
                <span>Help & Support</span>
              </button>

              <div className="my-1 border-t border-slate-100 pt-1 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
