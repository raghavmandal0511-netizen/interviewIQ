import type { ReactNode } from "react";

import { MainContent } from "@/components/layout";
import { DashboardNavbar } from "@/components/navbar";
import { DashboardSidebar } from "@/components/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col">
      {/* Sticky Top Navbar */}
      <DashboardNavbar />

      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
