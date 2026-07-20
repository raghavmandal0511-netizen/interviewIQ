import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { DashboardData } from "@/features/dashboard/types";

type DashboardResponse = {
  success: boolean;
  data: DashboardData;
};

export const dashboardService = {
  async fetchDashboard(): Promise<DashboardData> {
    const response = await apiClient.get<DashboardResponse>(
      API_ENDPOINTS.dashboard,
    );
    if (!response.data?.data) {
      throw new Error("Dashboard data not found");
    }
    return response.data.data;
  },
};
