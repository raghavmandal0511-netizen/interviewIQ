"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export function CtaSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5D50EB] via-indigo-600 to-[#5D50EB] px-8 py-14 text-center text-white shadow-2xl sm:px-16"
        >
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to Crack Your Dream Placement?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-indigo-100">
              Join thousands of students preparing smarter with InterviewIQ. Start your free
              account today and take the first step toward your offer letter.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.signup}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[#5D50EB] shadow-lg transition-all hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={ROUTES.features}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
