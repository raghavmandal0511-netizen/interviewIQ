"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Users } from "lucide-react";

import { ROUTES } from "@/constants/routes";

const highlights = [
  "Sample answers curated by placement experts",
  "Key points, common mistakes, and interviewer tips",
  "Separate tracks for freshers and experienced candidates",
  "Save and review your practice answers",
];

export function HrInterviewSection() {
  return (
    <section className="bg-gradient-to-br from-purple-50/50 to-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-purple-100 bg-white p-8 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5D50EB] text-white">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#5D50EB]">HR Interview Prep</p>
                <p className="text-sm font-extrabold text-slate-900">Behavioral Questions Bank</p>
              </div>
            </div>
            <blockquote className="mt-6 border-l-4 border-[#5D50EB] pl-4 text-sm italic text-slate-600">
              &quot;Tell me about yourself&quot; — the question everyone dreads. We help you craft a
              compelling 90-second pitch that interviewers remember.
            </blockquote>
            <div className="mt-6 flex gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-[10px] font-bold text-[#5D50EB]">
                <GraduationCap className="h-3 w-3" /> Freshers
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-[10px] font-bold text-[#5D50EB]">
                <Users className="h-3 w-3" /> Experienced
              </span>
            </div>
          </motion.div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
              Ace HR & Behavioral Rounds
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Technical skills get you shortlisted — HR rounds get you hired. Practice the most
              frequently asked behavioral questions with structured sample answers.
            </p>
            <ul className="mt-6 space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={ROUTES.signup}
              className="mt-8 inline-flex rounded-xl bg-[#5D50EB] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#4d40db]"
            >
              Explore HR Questions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
