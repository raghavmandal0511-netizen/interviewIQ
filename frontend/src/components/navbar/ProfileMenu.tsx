"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

export function ProfileMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const userName = user?.name || "John Doe";
  const userEmail = user?.email || "john.doe@example.com";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "JD";

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
    logout();
    router.push(ROUTES.login);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 rounded-xl border border-slate-200/80 bg-white p-1.5 pr-3 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800"
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#5D50EB] to-indigo-500 font-extrabold text-white text-xs shadow-sm">
          {initials}
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
            {userName}
          </span>
          <span className="text-[10px] text-slate-400 font-medium leading-tight">
            Pro Plan
          </span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xl z-50 dark:border-slate-800 dark:bg-slate-900/95"
          >
            {/* User Info Header */}
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{userName}</p>
              <p className="text-[11px] text-slate-400 truncate">{userEmail}</p>
            </div>

            {/* Menu Items */}
            <div className="space-y-0.5">
              <Link
                href={ROUTES.dashboard.profile}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
              >
                <User className="h-4 w-4 text-slate-400" />
                <span>Profile</span>
              </Link>

              <Link
                href={ROUTES.dashboard.profileEdit}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                <span>Settings</span>
              </Link>

              <a
                href="#help"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  alert("Support team: support@interviewiq.com");
                }}
                className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
              >
                <HelpCircle className="h-4 w-4 text-slate-400" />
                <span>Help & Support</span>
              </a>

              <div className="border-t border-slate-100 dark:border-slate-800 my-1 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
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
