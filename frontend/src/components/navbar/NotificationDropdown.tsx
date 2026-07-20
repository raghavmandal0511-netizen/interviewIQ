"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sparkles, Trophy, FileText } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "test" | "streak" | "tip" | "system";
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Mock Test Evaluated!",
    message: "You scored 88% in Logical Reasoning Test #4.",
    time: "10m ago",
    unread: true,
    type: "test",
  },
  {
    id: "2",
    title: "7 Day Streak Reached 🔥",
    message: "Awesome consistency! You unlocked the Consistency Badge.",
    time: "2h ago",
    unread: true,
    type: "streak",
  },
  {
    id: "3",
    title: "AI Interview Tip",
    message: "Practice STAR methodology for behavioral questions.",
    time: "1d ago",
    unread: false,
    type: "tip",
  },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400 dark:hover:bg-white/[0.08] dark:hover:text-white"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#5D50EB] dark:bg-indigo-400" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:w-88 dark:border-white/[0.08] dark:bg-[#161B22]/95 dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]"
          >
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                  Notifications
                </h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-[#5D50EB] dark:bg-indigo-500/15 dark:text-indigo-300">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-[#5D50EB] hover:underline dark:text-indigo-400"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-72 space-y-2 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 rounded-xl p-2.5 transition-colors ${
                    n.unread
                      ? "bg-purple-50/50 dark:bg-indigo-500/[0.08]"
                      : "hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm dark:border-white/[0.06] dark:bg-[#1F2937]">
                    {n.type === "test" && <FileText className="h-4 w-4 text-emerald-500" />}
                    {n.type === "streak" && <Trophy className="h-4 w-4 text-amber-500" />}
                    {n.type === "tip" && (
                      <Sparkles className="h-4 w-4 text-[#5D50EB] dark:text-indigo-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">
                        {n.title}
                      </p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {n.time}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                      {n.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
