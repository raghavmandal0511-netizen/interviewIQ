"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, Send } from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ErrorState, PageSkeleton } from "@/components/shared/states";
import { ROUTES, testResultPath } from "@/constants/routes";
import {
  useResumeAttemptQuery,
  useSaveAnswerMutation,
  useSubmitAttemptMutation,
} from "@/features/tests/hooks";
import type { AttemptQuestion } from "@/features/tests/types";
import { formatDuration } from "@/utils/format";

function TestAttemptContent() {
  const params = useParams<{ testId: string }>();
  const testId = params.testId;
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId") ?? "";
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useResumeAttemptQuery(attemptId);
  const saveAnswer = useSaveAnswerMutation(attemptId);
  const submitAttempt = useSubmitAttemptMutation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const questionStartRef = useRef(Date.now());
  const saveTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const questions = useMemo<AttemptQuestion[]>(() => {
    if (!data || data.autoSubmitted) return [];
    return data.questions ?? [];
  }, [data]);

  useEffect(() => {
    if (!data) return;

    if (data.autoSubmitted) {
      router.replace(`${testResultPath(testId)}?attemptId=${attemptId}`);
      return;
    }

    const initialAnswers: Record<string, string> = {};
    for (const q of data.questions) {
      if (q.selectedOption && typeof q.selectedOption === "string") {
        initialAnswers[q.questionId] = q.selectedOption;
      }
    }
    setAnswers(initialAnswers);
    setRemainingSeconds(data.timer.remainingSeconds);
    questionStartRef.current = Date.now();
  }, [data, attemptId, router, testId]);

  const handleSubmit = useCallback(async () => {
    if (!attemptId || submitting) return;
    setSubmitting(true);
    try {
      await submitAttempt.mutateAsync(attemptId);
      router.push(`${testResultPath(testId)}?attemptId=${attemptId}`);
    } finally {
      setSubmitting(false);
      setConfirmOpen(false);
    }
  }, [attemptId, submitting, submitAttempt, router, testId]);

  useEffect(() => {
    if (remainingSeconds === null || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          clearInterval(interval);
          void handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds, handleSubmit]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    if (saveTimersRef.current[questionId]) {
      clearTimeout(saveTimersRef.current[questionId]);
    }

    saveTimersRef.current[questionId] = setTimeout(() => {
      const timeTaken = Math.round((Date.now() - questionStartRef.current) / 1000);
      void saveAnswer.mutateAsync({ questionId, selectedOption: optionId, timeTaken });
    }, 400);
  };

  useEffect(() => {
    questionStartRef.current = Date.now();
  }, [currentIndex]);

  if (!attemptId) {
    return (
      <ErrorState
        title="Missing attempt"
        message="No attempt ID found. Please start the test from instructions."
      />
    );
  }

  if (isLoading) {
    return <PageSkeleton rows={3} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (data.autoSubmitted) {
    return <PageSkeleton rows={2} />;
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-4 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href={ROUTES.dashboard.tests}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Exit to Tests
          </Link>
          <h1 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
            {data.test.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold ${
              (remainingSeconds ?? 0) <= 60
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300"
                : "bg-purple-50 text-[#5D50EB] dark:bg-purple-950 dark:text-purple-300"
            }`}
          >
            <Clock className="h-4 w-4" />
            {formatDuration(remainingSeconds ?? 0)}
          </div>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white hover:bg-[#4d40db] disabled:opacity-70"
          >
            <Send className="h-3.5 w-3.5" />
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <DashboardCard>
            {currentQuestion ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#5D50EB]">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-slate-400">{currentQuestion.marks} marks</span>
                </div>

                <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">
                  {currentQuestion.question.question}
                </p>

                <div className="space-y-2">
                  {currentQuestion.question.options.map((option) => {
                    const selected = answers[currentQuestion.questionId] === option.optionId;
                    return (
                      <button
                        key={option.optionId}
                        type="button"
                        onClick={() =>
                          handleSelectOption(currentQuestion.questionId, option.optionId)
                        }
                        className={`w-full rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all ${
                          selected
                            ? "border-[#5D50EB] bg-purple-50 text-[#5D50EB] dark:bg-purple-950/40 dark:text-purple-300"
                            : "border-slate-200 bg-white text-slate-700 hover:border-purple-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                        }`}
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 disabled:opacity-40 dark:border-slate-800 dark:text-slate-400"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={currentIndex >= questions.length - 1}
                    onClick={() => setCurrentIndex((i) => i + 1)}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No questions available.</p>
            )}
          </DashboardCard>
        </div>

        <div className="lg:col-span-3">
          <DashboardCard title="Question Navigator">
            <p className="mb-3 text-[10px] font-semibold text-slate-400">
              {answeredCount} / {questions.length} answered
            </p>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const answered = Boolean(answers[q.questionId]);
                const active = index === currentIndex;
                return (
                  <button
                    key={q.questionId}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold transition-all ${
                      active
                        ? "bg-[#5D50EB] text-white"
                        : answered
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </DashboardCard>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setConfirmOpen(false)}>
            <DialogTitle>Submit test?</DialogTitle>
            <DialogDescription>
              You have answered {answeredCount} of {questions.length} questions. This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => void handleSubmit()}
              className="rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white hover:bg-[#4d40db] disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function TestAttemptPage() {
  return (
    <Suspense fallback={<PageSkeleton rows={3} />}>
      <TestAttemptContent />
    </Suspense>
  );
}
