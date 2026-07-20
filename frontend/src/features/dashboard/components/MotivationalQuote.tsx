"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

const quotes = [
  {
    text: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come.",
    author: "Dwayne Johnson",
  },
  {
    text: "Preparation is the key to leadership and cracking any technical interview.",
    author: "InterviewIQ Wisdom",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
];

export function MotivationalQuote() {
  const quote = quotes[0] || {
    text: "Success isn't always about greatness. It's about consistency.",
    author: "InterviewIQ Wisdom",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50/80 via-indigo-50/50 to-blue-50/80 p-5 shadow-sm dark:border-purple-900/40 dark:from-purple-950/30 dark:via-slate-900/60 dark:to-indigo-950/30 backdrop-blur-md"
    >
      <div className="flex items-start space-x-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5D50EB] text-white shadow-sm">
          <Quote className="h-5 w-5 fill-white" />
        </div>
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-semibold italic text-slate-800 dark:text-slate-200 leading-relaxed">
            &quot;{quote.text}&quot;
          </p>
          <span className="block text-[11px] font-bold text-[#5D50EB] dark:text-purple-400">
            — {quote.author}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
