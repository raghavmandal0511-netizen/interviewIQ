import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: ReactNode;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function DashboardCard({
  title,
  subtitle,
  action,
  children,
  className = "",
  hoverEffect = false,
}: DashboardCardProps) {
  return (
    <div
      data-motion-card
      className={cn(
        "surface-card rounded-xl p-5 sm:p-6",
        hoverEffect && "surface-card-interactive",
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-zinc-100 pb-4 dark:border-white/[0.06]">
          <div>
            {typeof title === "string" ? (
              <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-slate-50">
                {title}
              </h3>
            ) : (
              title
            )}
            {subtitle && (
              <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
