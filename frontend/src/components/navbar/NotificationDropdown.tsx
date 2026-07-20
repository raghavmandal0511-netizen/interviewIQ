"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Sparkles, Trophy, FileText, CheckCircle2 } from "lucide-react";

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
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5D50EB]"></span>
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-4 shadow-xl z-50 dark:border-slate-800 dark:bg-slate-900/95"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Notifications
                </h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-[#5D50EB] dark:bg-purple-950 dark:text-purple-300">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-[#5D50EB] hover:underline dark:text-purple-400"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                    n.unread
                      ? "bg-purple-50/50 dark:bg-purple-950/20"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                    {n.type === "test" && <FileText className="h-4 w-4 text-emerald-500" />}
                    {n.type === "streak" && <Trophy className="h-4 w-4 text-amber-500" />}
                    {n.type === "tip" && <Sparkles className="h-4 w-4 text-[#5D50EB]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {n.title}
                      </p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
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
