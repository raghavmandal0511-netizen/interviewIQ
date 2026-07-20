"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is InterviewIQ free to use?",
    a: "Yes! You can sign up for free and access aptitude content, mock tests, HR questions, and basic analytics. Premium features may be added in the future.",
  },
  {
    q: "What aptitude topics are covered?",
    a: "We cover Arithmetic, Logical Reasoning, and Verbal Ability — including percentages, time & work, puzzles, reading comprehension, and more.",
  },
  {
    q: "How do mock tests work?",
    a: "Each mock test is timed like a real placement exam. Your answers are auto-saved, and you get a detailed score breakdown with explanations after submission.",
  },
  {
    q: "What is the AI Interview feature?",
    a: "AI Interview connects you to our dedicated AI platform where you can practice voice-based mock interviews and receive instant feedback.",
  },
  {
    q: "Can I track my progress over time?",
    a: "Absolutely. The Reports dashboard shows your overall progress, test history, topic-wise accuracy, weak/strong areas, and HR answer history.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-slate-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="border-t border-slate-100 px-5 py-4">
                    <p className="text-sm leading-relaxed text-slate-500">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
