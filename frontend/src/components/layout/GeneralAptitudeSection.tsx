"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Calculator, MessageCircle } from "lucide-react";

import { ROUTES } from "@/constants/routes";

const modules = [
  {
    title: "Arithmetic Aptitude",
    desc: "Percentages, time & work, profit & loss, permutations, probability, and 20+ core topics.",
    icon: Calculator,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Logical Reasoning",
    desc: "Seating arrangements, blood relations, puzzles, syllogisms, and pattern recognition.",
    icon: Brain,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Verbal Ability",
    desc: "Reading comprehension, grammar, sentence correction, and vocabulary for placements.",
    icon: MessageCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export function GeneralAptitudeSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
              Master General Aptitude
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              InterviewIQ covers the three pillars of placement aptitude — Arithmetic, Logical, and
              Verbal. Each topic includes theory, worked examples, and practice exercises with
              instant feedback.
            </p>
            <Link
              href={ROUTES.signup}
              className="mt-6 inline-flex rounded-xl bg-[#5D50EB] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#4d40db]"
            >
              Start Practicing Free
            </Link>
          </div>

          <div className="space-y-4">
            {modules.map((mod, index) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 p-5"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${mod.bg}`}>
                  <mod.icon className={`h-5 w-5 ${mod.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{mod.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
