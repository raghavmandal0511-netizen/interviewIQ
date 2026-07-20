"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { ROUTES } from "@/constants/routes";
import { authService } from "@/features/auth/api";
import { ApiError } from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";

export function useProfileQuery(enabled = true) {
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const user = await authService.fetchProfile();
      setUser(user);
      return user;
    },
    enabled,
    retry: false,
  });
}

export function useLoginMutation() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string; redirect?: string }) => {
      await authService.login({ email: payload.email, password: payload.password });
      const user = await authService.fetchProfile();
      return { user, redirect: payload.redirect };
    },
    onSuccess: ({ user, redirect }) => {
      setUser(user);
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success("Welcome back!");
      router.push(redirect || ROUTES.dashboard.root);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError ? error.message : "Login failed. Please try again.";
      toast.error(message);
    },
  });
}

export function useRegisterMutation() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      userName: string;
      email: string;
      password: string;
    }) => {
      await authService.register(payload);
      const user = await authService.fetchProfile();
      return user;
    },
    onSuccess: (user) => {
      setUser(user);
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success("Account created successfully!");
      router.push(ROUTES.dashboard.root);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ApiError
          ? error.message
          : "Registration failed. Please try again.";
      toast.error(message);
    },
  });
}

export function useLogoutMutation() {
  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearSession();
      queryClient.clear();
      toast.success("Logged out");
      router.push(ROUTES.login);
    },
    onError: () => {
      clearSession();
      queryClient.clear();
      router.push(ROUTES.login);
    },
  });
}
