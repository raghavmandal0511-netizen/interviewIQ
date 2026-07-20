"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "outline";
}

export function QuickActionCard({
  title,
  description,
  href,
  icon: Icon,
  variant = "primary",
}: QuickActionCardProps) {
  const isPrimary = variant === "primary";

  return (
    <Link href={href} className="block group">
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-300 ${
          isPrimary
            ? "bg-[#5D50EB] text-white shadow-purple-500/20 hover:bg-[#4d40db] hover:shadow-lg hover:shadow-purple-500/30"
            : "border border-slate-200/80 bg-white text-slate-900 hover:border-purple-300 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-white dark:hover:border-purple-800"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              isPrimary
                ? "bg-white/15 text-white"
                : "bg-purple-50 text-[#5D50EB] dark:bg-purple-950/50 dark:text-purple-400"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <ArrowRight
            className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${
              isPrimary ? "text-white/80" : "text-slate-400 group-hover:text-[#5D50EB]"
            }`}
          />
        </div>

        <div className="mt-4">
          <h4
            className={`text-base font-bold tracking-tight ${
              isPrimary ? "text-white" : "text-slate-900 dark:text-white"
            }`}
          >
            {title}
          </h4>
          <p
            className={`mt-1 text-xs leading-relaxed ${
              isPrimary ? "text-purple-100" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
