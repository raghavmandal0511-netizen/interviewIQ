"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Clock, Award, RotateCcw } from "lucide-react";
import { DashboardCard } from "@/components/cards/DashboardCard";
import { ROUTES } from "@/constants/routes";

const sampleQuestions = [
  {
    id: 1,
    question: "A train running at 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 metres", "150 metres", "180 metres", "324 metres"],
    correctIndex: 1,
    explanation: "Speed = 60 * (5/18) = 50/3 m/sec. Distance = Speed * Time = (50/3) * 9 = 150 metres.",
  },
  {
    id: 2,
    question: "If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:",
    options: ["50 km", "56 km", "70 km", "80 km"],
    correctIndex: 0,
    explanation: "Let actual distance be x. Then x/10 = (x+20)/14 => 14x = 10x + 200 => 4x = 200 => x = 50 km.",
  },
];

export default function PracticePage({ params }: { params: Promise<{ topicSlug: string }> }) {
  const { topicSlug } = use(params);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = (sampleQuestions[currentIdx] || sampleQuestions[0])!;

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    setShowExplanation(true);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < sampleQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div>
        <Link
          href={`${ROUTES.dashboard.arithmetic}/${topicSlug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Topic</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 capitalize">
          Practice Quiz: {topicSlug.replace(/-/g, " ")}
        </h1>
      </div>

      {!isFinished ? (
        <DashboardCard>
          <div className="space-y-6">
            {/* Header / Progress */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-[#5D50EB] bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-lg">
                Question {currentIdx + 1} of {sampleQuestions.length}
              </span>
              <div className="flex items-center space-x-1 text-xs font-bold text-slate-500">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Timer: 02:45</span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let optStyle =
                  "border-slate-200 bg-white hover:bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200";

                if (selectedOpt !== null) {
                  if (isCorrect) {
                    optStyle =
                      "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300";
                  } else if (isSelected) {
                    optStyle =
                      "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300";
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={selectedOpt !== null}
                    onClick={() => handleSelect(idx)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-xs font-semibold text-left transition-all ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt !== null && (
                      <div>
                        {isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                        {isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-600" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-purple-50 p-4 dark:bg-purple-950/30 text-xs space-y-1"
              >
                <span className="font-bold text-[#5D50EB] dark:text-purple-300 block">
                  Step-by-step Solution:
                </span>
                <p className="text-slate-700 dark:text-slate-300">{currentQ.explanation}</p>
              </motion.div>
            )}

            {/* Footer / Next */}
            {selectedOpt !== null && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4d40db] transition-all"
                >
                  <span>{currentIdx + 1 < sampleQuestions.length ? "Next Question" : "View Final Results"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </DashboardCard>
      ) : (
        <DashboardCard className="text-center p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
              <Award className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Quiz Completed!
            </h2>
            <p className="text-sm text-slate-500">
              You scored <span className="font-bold text-[#5D50EB]">{score}</span> out of{" "}
              <span className="font-bold">{sampleQuestions.length}</span> ({Math.round((score / sampleQuestions.length) * 100)}% Accuracy).
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retry Quiz</span>
              </button>
              <Link
                href={ROUTES.dashboard.arithmetic}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#4d40db]"
              >
                <span>Back to Topics</span>
              </Link>
            </div>
          </div>
        </DashboardCard>
      )}
    </div>
  );
}
