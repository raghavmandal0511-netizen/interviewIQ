import { ROUTES } from "@/constants/routes";

/**
 * Dashboard sidebar items (structure only).
 * TODO: Wire icons and active states in DashboardSidebar UI.
 */
export const sidebarItems = [
  { title: "Dashboard", href: ROUTES.dashboard.root },
  { title: "General Aptitude", href: ROUTES.dashboard.generalAptitude },
  { title: "Interview", href: ROUTES.dashboard.interview },
  { title: "Reports", href: ROUTES.dashboard.reports },
  { title: "Profile", href: ROUTES.dashboard.profile },
] as const;

export const sidebarActions = [
  { title: "Theme Toggle", action: "theme-toggle" },
  { title: "Logout", action: "logout" },
] as const;
