"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function PublicNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center space-x-0.5">
          <span className="text-2xl font-bold tracking-tight text-[#1e293b]">
            Interview
          </span>
          <span className="text-2xl font-extrabold text-blue-600">
            IQ
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="rounded-lg border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[#3b52f6] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb] hover:shadow-md active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

