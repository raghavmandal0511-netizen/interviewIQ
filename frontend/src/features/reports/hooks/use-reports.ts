"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { reportsService } from "@/features/reports/api";

export function useReportsOverviewQuery() {
  return useQuery({
    queryKey: queryKeys.reports.overview,
    queryFn: () => reportsService.getOverview(),
  });
}

export function useReportsTestsQuery(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: queryKeys.reports.tests(params),
    queryFn: () => reportsService.getTestHistory(params),
  });
}

export function useReportsModulesQuery() {
  return useQuery({
    queryKey: queryKeys.reports.modules,
    queryFn: () => reportsService.getModuleProgress(),
  });
}

export function useReportsWeakTopicsQuery() {
  return useQuery({
    queryKey: queryKeys.reports.weakTopics,
    queryFn: () => reportsService.getWeakTopics(),
  });
}

export function useReportsStrongTopicsQuery() {
  return useQuery({
    queryKey: queryKeys.reports.strongTopics,
    queryFn: () => reportsService.getStrongTopics(),
  });
}

export function useReportsPerformanceQuery() {
  return useQuery({
    queryKey: queryKeys.reports.performance,
    queryFn: () => reportsService.getPerformance(),
  });
}

export function useReportsHrQuery() {
  return useQuery({
    queryKey: queryKeys.reports.hr(),
    queryFn: () => reportsService.getHrProgress(),
  });
}

export function useReportsTopicsQuery() {
  return useQuery({
    queryKey: queryKeys.reports.topics(),
    queryFn: () => reportsService.getTopicProgress(),
  });
}
