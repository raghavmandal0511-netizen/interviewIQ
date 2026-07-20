"use client";

import { motion } from "framer-motion";
import { BarChart3, Target, TrendingDown, TrendingUp } from "lucide-react";

const metrics = [
  { icon: Target, label: "Overall Progress", desc: "Track completion across all modules" },
  { icon: TrendingUp, label: "Strong Topics", desc: "See where you consistently score high" },
  { icon: TrendingDown, label: "Weak Topics", desc: "Focus practice where it matters most" },
  { icon: BarChart3, label: "Performance Trends", desc: "Daily, weekly, and monthly analytics" },
];

export function ReportsSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
            Data-Driven Placement Prep
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Every test, exercise, and HR answer feeds into your personal analytics dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, index) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-slate-100 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                <m.icon className="h-6 w-6 text-[#5D50EB]" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">{m.label}</h3>
              <p className="mt-1 text-xs text-slate-500">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl bg-indigo-50/60 p-8"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { val: "78%", label: "Avg Accuracy" },
              { val: "24", label: "Tests Taken" },
              { val: "56", label: "Topics Done" },
              { val: "Top 8%", label: "Percentile" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-[#5D50EB]">{stat.val}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
