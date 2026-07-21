import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { AUTH_COOKIE_NAME } from "@/constants/api";
import { ROUTES } from "@/constants/routes";
import {
  clearAccessToken,
  getAccessToken,
} from "@/lib/auth-token";

export type ApiErrorBody = {
  success?: boolean;
  message?: string;
  error?: unknown;
};

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody | null;

  constructor(status: number, message: string, body: ApiErrorBody | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

/**
 * Shared Axios instance — all feature services must use this client.
 * Base URL points at the deployed Express API origin.
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status ?? 0;
    const body = error.response?.data ?? null;
    const message =
      body?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const isAuthPage = path === ROUTES.login || path === ROUTES.signup;

      if ((status === 401 || status === 403) && !isAuthPage) {
        clearAccessToken();
        void fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        }).finally(() => {
          if (!path.startsWith("/login")) {
            window.location.href = `${ROUTES.login}?redirect=${encodeURIComponent(path)}`;
          }
        });
      }
    }

    return Promise.reject(new ApiError(status, message, body));
  },
);

export { AUTH_COOKIE_NAME };
export default apiClient;
