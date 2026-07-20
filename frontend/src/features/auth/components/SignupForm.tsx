"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Briefcase } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    useAuthStore.getState().login({
      user: {
        id: "user-" + Date.now(),
        name: fullName.trim() || "New Candidate",
        email: email.trim() || "candidate@example.com",
        role: "user",
      },
      accessToken: "demo_token",
    });

    setTimeout(() => {
      router.push(ROUTES.dashboard.root);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href={ROUTES.home} className="inline-flex items-center space-x-0.5">
          <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Interview
          </span>
          <span className="text-3xl font-extrabold text-[#5D50EB]">
            IQ
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Create your free account
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Start practicing Aptitude, Mock Tests & AI Interviews in seconds.
        </p>
      </div>

      {/* Auth Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-xl shadow-purple-500/5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        
        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => {
              document.cookie = "interviewiq_access_token=demo_token; path=/; max-age=86400";
              router.push(ROUTES.dashboard.root);
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <GoogleIcon />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => {
              document.cookie = "interviewiq_access_token=demo_token; path=/; max-age=86400";
              router.push(ROUTES.dashboard.root);
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <GithubIcon className="h-4 w-4" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 font-semibold text-slate-400 dark:bg-slate-900 dark:text-slate-500">
              Or sign up with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-[#5D50EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-[#5D50EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Must be at least 8 characters"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-[#5D50EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              defaultChecked
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#5D50EB] focus:ring-[#5D50EB]"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
              I agree to InterviewIQ&apos;s{" "}
              <a href="#terms" className="font-bold text-[#5D50EB] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" className="font-bold text-[#5D50EB] hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5D50EB] py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:bg-[#4d40db] transition-all disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Create Free Account</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link href={ROUTES.login} className="font-bold text-[#5D50EB] hover:underline dark:text-purple-400">
            Sign In
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
