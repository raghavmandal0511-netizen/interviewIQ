"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Play, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

const hrQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and your background.",
    category: "Freshers & Experienced",
    difficulty: "Easy",
    sampleTip: "Keep it under 2 minutes. Focus on education, core technical projects, and career aspiration.",
  },
  {
    id: 2,
    question: "What is your biggest weakness and how are you addressing it?",
    category: "Behavioral",
    difficulty: "Medium",
    sampleTip: "Share a real professional skill you've actively improved. Avoid fake weaknesses like 'I work too hard'.",
  },
  {
    id: 3,
    question: "Describe a situation where you faced a conflict in a team project.",
    category: "STAR Methodology",
    difficulty: "Medium",
    sampleTip: "Use Situation -> Task -> Action -> Result format. Highlight active listening and resolution.",
  },
  {
    id: 4,
    question: "Why do you want to join our company?",
    category: "Company Specific",
    difficulty: "Easy",
    sampleTip: "Reference recent company achievements, tech stack alignment, and cultural values.",
  },
];

export default function HrInterviewPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-[#5D50EB]">
          <Link href={ROUTES.dashboard.interview} className="hover:underline">
            Interview Prep
          </Link>
          <span>/</span>
          <span>HR Behavioral Questions</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
          HR Interview Questions & Sample Answers
        </h1>
      </div>

      <div className="space-y-4">
        {hrQuestions.map((q) => (
          <DashboardCard key={q.id} className="hover:border-purple-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-[#5D50EB] dark:bg-purple-950 dark:text-purple-300">
                    {q.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{q.difficulty}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {q.question}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  💡 Strategy: {q.sampleTip}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => alert(`Launching practice recorder for: "${q.question}"`)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#4d40db] transition-colors"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Practice Video Response</span>
                </button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
