"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, CheckCircle2, ExternalLink, Mic, Sparkles, Video } from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { env } from "@/config/env";
import { ROUTES } from "@/constants/routes";

const features = [
  {
    title: "Real-time AI Interviewer",
    desc: "Practice with an AI that asks follow-up questions and adapts to your responses.",
    icon: Bot,
  },
  {
    title: "Voice & Video Ready",
    desc: "Simulate real interview conditions with voice-based responses and optional video.",
    icon: Video,
  },
  {
    title: "Instant Feedback",
    desc: "Get structured feedback on clarity, technical depth, and communication skills.",
    icon: Sparkles,
  },
  {
    title: "Role-based Questions",
    desc: "Questions tailored to your target role — from freshers to experienced professionals.",
    icon: Mic,
  },
];

export default function AiInterviewPage() {
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    window.location.href = env.aiInterviewUrl;
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-[#5D50EB]">
          <Link href={ROUTES.dashboard.interview} className="hover:underline">
            Interview Prep
          </Link>
          <span>/</span>
          <span>AI Interview</span>
        </div>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-extrabold text-slate-900 dark:text-white">
          <Bot className="h-6 w-6 text-[#5D50EB]" />
          AI Mock Interview
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Launch our dedicated AI interview platform for voice-based mock interviews with
          real-time feedback.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="relative z-10 max-w-xl space-y-4">
          <h2 className="text-xl font-extrabold">
            Practice interviews that feel real
          </h2>
          <p className="text-xs leading-relaxed text-slate-300">
            InterviewIQ AI Interview connects you to our external AI interview engine. Answer
            technical and behavioral questions naturally, receive instant scoring, and track
            improvement over time in your reports.
          </p>
          <button
            type="button"
            onClick={handleStart}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#4d40db] disabled:opacity-70"
          >
            <ExternalLink className="h-4 w-4" />
            {loading ? "Redirecting..." : "Start AI Interview"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <DashboardCard key={feature.title}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/40">
                <feature.icon className="h-5 w-5 text-[#5D50EB]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard title="Before you start">
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          {[
            "Use a quiet environment with a stable internet connection.",
            "Allow microphone access when prompted by the AI platform.",
            "Keep answers structured — context, action, and result.",
            "Review your HR and aptitude prep on InterviewIQ first.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              {tip}
            </li>
          ))}
        </ul>
      </DashboardCard>
    </div>
  );
}
