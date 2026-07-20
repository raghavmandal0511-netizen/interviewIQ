"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { ROUTES } from "@/constants/routes";
import { useLoginMutation } from "@/features/auth/hooks";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? undefined;
  const loginMutation = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password, redirect });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <Link href={ROUTES.home} className="inline-flex items-center space-x-0.5">
          <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Interview
          </span>
          <span className="text-3xl font-extrabold text-[#5D50EB]">IQ</span>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Welcome back!
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Sign in to access your placement preparation dashboard.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-xl shadow-purple-500/5 backdrop-blur-md dark:border-white/[0.08] dark:bg-[#161B22]/95 dark:shadow-[var(--shadow-card)]">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-[#5D50EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-[#5D50EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:focus:border-indigo-500"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5D50EB] py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:bg-[#4d40db] dark:bg-indigo-500 dark:shadow-[0_8px_24px_-8px_rgba(99,102,241,0.45)] dark:hover:bg-indigo-400 transition-all disabled:opacity-70 mt-2"
          >
            {loginMutation.isPending ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.signup}
            className="font-bold text-[#5D50EB] hover:underline dark:text-indigo-400"
          >
            Create an account
          </Link>
        </div>

        <p className="mt-4 text-center text-[10px] text-slate-400">
          Social sign-in is not available yet.{" "}
          <button
            type="button"
            className="underline"
            onClick={() => toast.message("Use email and password to continue.")}
          >
            Learn more
          </button>
        </p>
      </div>
    </motion.div>
  );
}
