"use client";

import { motion } from "framer-motion";
import { BookOpen, ClipboardCheck, LineChart, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Sign Up & Set Goals",
    desc: "Create your free account and set your target role to personalize your prep journey.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Learn & Practice",
    desc: "Study aptitude theory, solve practice questions, and take timed mock tests.",
    icon: BookOpen,
  },
  {
    step: "03",
    title: "Interview Prep",
    desc: "Master HR questions and launch AI mock interviews to build confidence.",
    icon: ClipboardCheck,
  },
  {
    step: "04",
    title: "Track & Improve",
    desc: "Use detailed analytics to find weak topics and measure placement readiness.",
    icon: LineChart,
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
            How InterviewIQ Works
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            A structured path from first login to interview-ready — built for placement season.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="text-xs font-extrabold text-[#5D50EB]">{item.step}</span>
              <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                <item.icon className="h-5 w-5 text-[#5D50EB]" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
