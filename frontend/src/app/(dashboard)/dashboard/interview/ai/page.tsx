"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Mic, MicOff, Video, CheckCircle2 } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";

export default function AiInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-[#5D50EB]" />
            AI Mock Interview Room
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time AI voice & technical interview simulation. Respond naturally to AI questions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">AI Interviewer Active</span>
        </div>
      </div>

      {/* Main Video & Transcript Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI & User Video Feed (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Top Bar Overlay */}
            <div className="flex items-center justify-between text-xs font-bold text-white z-10">
              <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                <Video className="h-3.5 w-3.5 text-emerald-400" />
                HD WebCam Feed
              </span>
              <span className="bg-[#5D50EB] px-3 py-1 rounded-full text-white text-[10px]">
                Question {currentStep} of 5
              </span>
            </div>

            {/* AI Avatar Center Visual */}
            <div className="flex flex-col items-center justify-center text-center my-auto z-10">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#5D50EB] to-indigo-500 text-white shadow-xl shadow-purple-500/30">
                <Bot className="h-12 w-12" />
                {isRecording && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full border-2 border-purple-400/60"
                  />
                )}
              </div>
              <p className="mt-3 text-xs font-bold text-slate-300">
                AI Interviewer is listening...
              </p>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-center space-x-4 z-10">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all ${
                  isRecording
                    ? "bg-rose-600 hover:bg-rose-700 animate-pulse"
                    : "bg-[#5D50EB] hover:bg-[#4d40db]"
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isRecording ? "Stop Recording Answer" : "Start Speaking Answer"}</span>
              </button>

              <button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
              >
                <span>Next Question</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Question & Live Transcript (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <DashboardCard title="Current AI Question">
            <div className="space-y-3">
              <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                  &quot;Can you explain the difference between client-side rendering (CSR) and server-side rendering (SSR) in Next.js, and when would you choose one over the other?&quot;
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  AI Key Evaluation Criteria:
                </span>
                <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Clarity of SSR vs CSR execution models</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>SEO & initial page load performance implications</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Real-world practical engineering choices</span>
                  </li>
                </ul>
              </div>
            </div>
          </DashboardCard>
        </div>

      </div>
    </div>
  );
}
