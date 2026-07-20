"use client";

import type { ComponentType, SVGProps } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

type SettingsRowProps = {
  icon: IconComponent;
  label: string;
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function SettingsRow({
  icon: Icon,
  label,
  value,
  onClick,
  disabled,
}: SettingsRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || !onClick}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors",
        "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
        "disabled:cursor-default disabled:opacity-60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-inset",
      )}
    >
      <Icon
        className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500"
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {label}
        </p>
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {value?.trim() ? value : "Not set"}
        </p>
      </div>
      {onClick ? (
        <ChevronRight
          className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500"
          aria-hidden
        />
      ) : null}
    </button>
  );
}

export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-white/[0.06] dark:bg-[#161B22] dark:shadow-[var(--shadow-card)]">
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {children}
        </div>
      </div>
    </section>
  );
}
