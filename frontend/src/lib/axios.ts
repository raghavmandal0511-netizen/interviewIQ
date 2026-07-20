import axios from "axios";

import { env } from "@/config/env";

/**
 * Shared Axios instance.
 * Components must never import axios directly — use services.
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

apiClient.interceptors.request.use((config) => {
  // TODO: Attach auth token from store/cookie when auth is implemented.
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // TODO: Centralize error mapping / toast notifications.
    return Promise.reject(error);
  },
);

export default apiClient;
