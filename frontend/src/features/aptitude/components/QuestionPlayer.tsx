"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  RotateCcw,
} from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import type { Question } from "@/features/aptitude/types";

export type PracticeQuestion = Omit<Question, "correctAnswer">;

function stripCorrectAnswer(question: Question): PracticeQuestion {
  // Omit correctAnswer so it is never used client-side before submit.
  const { correctAnswer, ...safe } = question;
  void correctAnswer;
  return safe;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

type QuestionPlayerProps = {
  topicName: string;
  questions: Question[];
  backHref: string;
  moduleHref: string;
  onComplete: () => void;
  isCompleting?: boolean;
};

export function QuestionPlayer({
  topicName,
  questions: rawQuestions,
  backHref,
  moduleHref,
  onComplete,
  isCompleting = false,
}: QuestionPlayerProps) {
  const questions = useMemo(
    () => rawQuestions.map(stripCorrectAnswer),
    [rawQuestions],
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const totalSeconds = useMemo(() => {
    const sum = questions.reduce((acc, question) => acc + (question.timeLimit ?? 0), 0);
    return sum > 0 ? sum : 30 * 60;
  }, [questions]);

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    setSecondsLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (isFinished || questions.length === 0) {
      return;
    }

    if (secondsLeft <= 0) {
      setIsFinished(true);
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [secondsLeft, isFinished, questions.length, onComplete]);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (optionId: string) => {
    if (submitted) {
      return;
    }
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || submitted) {
      return;
    }
    setSubmitted(true);
    setAnsweredCount((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setSubmitted(false);
      return;
    }

    setIsFinished(true);
    onComplete();
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setSubmitted(false);
    setAnsweredCount(0);
    setIsFinished(false);
    setSecondsLeft(totalSeconds);
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div>
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Topic</span>
        </Link>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
          Practice: {topicName}
        </h1>
      </div>

      {!isFinished ? (
        <DashboardCard>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-bold text-[#5D50EB] dark:bg-purple-950">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <div className="flex items-center space-x-1 text-xs font-bold text-slate-500">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>{formatTime(secondsLeft)}</span>
              </div>
            </div>

            <h3 className="text-base font-bold leading-relaxed text-slate-900 dark:text-white">
              {currentQuestion.question}
            </h3>

            <div className="space-y-2.5">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.optionId;
                let optionStyle =
                  "border-slate-200 bg-white hover:bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200";

                if (submitted && isSelected) {
                  optionStyle =
                    "border-[#5D50EB] bg-purple-50 text-[#5D50EB] dark:border-purple-700 dark:bg-purple-950/60 dark:text-purple-200";
                } else if (isSelected) {
                  optionStyle =
                    "border-[#5D50EB]/60 bg-purple-50/70 text-[#5D50EB] dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-200";
                }

                return (
                  <button
                    key={option.optionId}
                    type="button"
                    disabled={submitted}
                    onClick={() => handleSelect(option.optionId)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-all ${optionStyle}`}
                  >
                    <span>{option.text}</span>
                    {submitted && isSelected && (
                      <CheckCircle2 className="h-4 w-4 text-[#5D50EB]" />
                    )}
                  </button>
                );
              })}
            </div>

            {submitted && currentQuestion.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1 rounded-xl bg-purple-50 p-4 text-xs dark:bg-purple-950/30"
              >
                <span className="block font-bold text-[#5D50EB] dark:text-purple-300">
                  Explanation:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              {!submitted ? (
                <button
                  type="button"
                  disabled={!selectedOptionId}
                  onClick={handleSubmitAnswer}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#4d40db] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#4d40db]"
                >
                  <span>
                    {currentIdx + 1 < questions.length
                      ? "Next Question"
                      : "View Final Results"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </DashboardCard>
      ) : (
        <DashboardCard className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
              <Award className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Practice Completed!
            </h2>
            <p className="text-sm text-slate-500">
              You answered{" "}
              <span className="font-bold text-[#5D50EB]">{answeredCount}</span> of{" "}
              <span className="font-bold">{questions.length}</span> questions.
            </p>
            {isCompleting && (
              <p className="text-xs text-slate-400">Saving your progress…</p>
            )}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retry Quiz</span>
              </button>
              <Link
                href={moduleHref}
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
