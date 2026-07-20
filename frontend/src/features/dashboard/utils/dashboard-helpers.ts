import { ROUTES } from "@/constants/routes";

const QUICK_ACTION_ROUTE_MAP: Record<string, string> = {
  "/learning": ROUTES.dashboard.generalAptitude,
  "/tests": ROUTES.dashboard.tests,
  "/hr": ROUTES.dashboard.interviewHr,
  "/ai-interview": ROUTES.dashboard.interviewAi,
  "/reports": ROUTES.dashboard.reports,
};

export function mapQuickActionRoute(route: string): string {
  return QUICK_ACTION_ROUTE_MAP[route] ?? route;
}

export function modulePathFromName(moduleName: string): string {
  const lower = moduleName.toLowerCase();
  if (lower.includes("arithmetic")) return ROUTES.dashboard.arithmetic;
  if (lower.includes("logical")) return ROUTES.dashboard.logical;
  if (lower.includes("verbal")) return ROUTES.dashboard.verbal;
  return ROUTES.dashboard.generalAptitude;
}

export function formatRelativeTime(timestamp: string): string {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

const MODULE_COLORS = ["#5D50EB", "#10b981", "#f59e0b", "#8B5CF6"];

export function moduleChartColor(index: number): string {
  return MODULE_COLORS[index % MODULE_COLORS.length] ?? "#5D50EB";
}

/** Dark-theme chart accents (indigo / success / warning / violet) */
const MODULE_COLORS_DARK = ["#6366F1", "#22C55E", "#F59E0B", "#8B5CF6"];

export function moduleChartColorDark(index: number): string {
  return MODULE_COLORS_DARK[index % MODULE_COLORS_DARK.length] ?? "#6366F1";
}

export function getWeekDays(currentStreak: number, todayCompleted: boolean) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() + mondayOffset);

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return labels.map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const isToday = date.toDateString() === today.toDateString();
    const daysBeforeToday = Math.floor(
      (today.getTime() - date.getTime()) / 86_400_000,
    );
    const completed =
      (isToday && todayCompleted) ||
      (daysBeforeToday > 0 && daysBeforeToday <= currentStreak);

    return {
      day,
      date: String(date.getDate()),
      isToday,
      completed,
    };
  });
}
