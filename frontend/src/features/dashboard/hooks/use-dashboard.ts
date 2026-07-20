"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/features/dashboard/api/dashboard.service";
import type { DashboardData } from "@/features/dashboard/types";

export const dashboardQueryKey = ["dashboard"] as const;

export function useDashboardQuery() {
  return useQuery<DashboardData, Error>({
    queryKey: dashboardQueryKey,
    queryFn: () => dashboardService.fetchDashboard(),
  });
}
