"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
};

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={className} data-value={value} data-on-change={onValueChange.name}>
      {children}
    </div>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  activeValue,
  onClick,
  children,
}: {
  value: string;
  activeValue: string;
  onClick: (value: string) => void;
  children: ReactNode;
}) {
  const active = value === activeValue;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-bold transition-all",
        active
          ? "bg-[#5D50EB] text-white shadow-sm"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  activeValue,
  children,
  className,
}: {
  value: string;
  activeValue: string;
  children: ReactNode;
  className?: string;
}) {
  if (value !== activeValue) return null;
  return <div className={cn("mt-6", className)}>{children}</div>;
}
