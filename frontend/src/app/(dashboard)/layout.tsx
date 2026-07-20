import type { ReactNode } from "react";

import { MainContent } from "@/components/layout";
import {
  DashboardNavbar,
  ProfileMenu,
  ThemeToggle,
} from "@/components/navbar";
import { DashboardSidebar } from "@/components/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

/**
 * Dashboard Layout
 * Placeholders for Navbar, Sidebar, Main Content, Theme Toggle, Profile Menu.
 * TODO: Implement dashboard chrome UI.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div data-layout="dashboard">
      <DashboardNavbar />
      <ThemeToggle />
      <ProfileMenu />
      <DashboardSidebar />
      <MainContent>{children}</MainContent>
    </div>
  );
}
