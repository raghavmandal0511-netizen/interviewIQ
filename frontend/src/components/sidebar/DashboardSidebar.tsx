import { sidebarActions, sidebarItems } from "@/components/sidebar/sidebar-items";

/**
 * Placeholder: DashboardSidebar
 * TODO: Implement dashboard sidebar navigation UI.
 *
 * Items:
 * - Dashboard
 * - General Aptitude
 * - Interview
 * - Reports
 * - Profile
 * - Theme Toggle
 * - Logout
 */
export function DashboardSidebar() {
  return (
    <aside data-slot="dashboard-sidebar">
      <p>DashboardSidebar Placeholder</p>
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.href}>{item.title}</li>
        ))}
      </ul>
      <ul>
        {sidebarActions.map((item) => (
          <li key={item.action}>{item.title}</li>
        ))}
      </ul>
    </aside>
  );
}
