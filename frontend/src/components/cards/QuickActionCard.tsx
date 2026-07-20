import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

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
    <Link href={href} className="group block">
      <div
        data-motion-card
        className={cn(
          "relative flex flex-col justify-between overflow-hidden rounded-xl p-5 transition-all duration-300",
          isPrimary
            ? "bg-[#5D50EB] text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#4d40db] dark:bg-indigo-500 dark:shadow-[0_8px_24px_-8px_rgba(99,102,241,0.45)] dark:hover:bg-indigo-400"
            : "surface-card surface-card-interactive text-zinc-900 dark:text-slate-50",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              isPrimary
                ? "bg-white/15 text-white"
                : "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <ArrowRight
            className={cn(
              "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5",
              isPrimary
                ? "text-white/80"
                : "text-zinc-400 group-hover:text-indigo-500 dark:text-slate-500 dark:group-hover:text-indigo-400",
            )}
          />
        </div>

        <div className="mt-5">
          <h4
            className={cn(
              "text-base font-semibold tracking-tight",
              isPrimary ? "text-white" : "text-zinc-900 dark:text-slate-50",
            )}
          >
            {title}
          </h4>
          <p
            className={cn(
              "mt-1.5 text-xs leading-relaxed",
              isPrimary
                ? "text-indigo-100"
                : "text-zinc-500 dark:text-slate-400",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
