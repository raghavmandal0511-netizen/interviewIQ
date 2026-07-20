"use client";

import { Bot, Mic, Sparkles, Video } from "lucide-react";

import { env } from "@/config/env";

const capabilities = [
  { icon: Bot, label: "Adaptive AI questions based on your role" },
  { icon: Mic, label: "Voice-based natural conversation" },
  { icon: Video, label: "Optional video for realistic simulation" },
  { icon: Sparkles, label: "Instant scoring and improvement tips" },
];

export function AiInterviewSection() {
  return (
    <section className="border-y border-slate-100 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
              AI-Powered
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Practice with an AI Interviewer
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Step into a realistic mock interview powered by AI. Answer technical and behavioral
              questions out loud, get instant feedback, and build the confidence you need on
              interview day.
            </p>
            <ul className="mt-6 space-y-3">
              {capabilities.map((cap) => (
                <li key={cap.label} className="flex items-center gap-3 text-sm text-slate-600">
                  <cap.icon className="h-4 w-4 shrink-0 text-blue-600" />
                  {cap.label}
                </li>
              ))}
            </ul>
            <a
              href={env.aiInterviewUrl}
              className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-500"
            >
              Try AI Interview
            </a>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
                <Bot className="h-10 w-10 text-white" />
              </div>
              <p className="mt-4 text-sm font-bold text-slate-800">AI Interviewer Ready</p>
              <p className="mt-1 text-xs text-slate-500">Launch when you&apos;re prepared</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
