"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, Lightbulb, Save } from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { Textarea } from "@/components/ui/textarea";
import { ErrorState, PageSkeleton } from "@/components/shared/states";
import { ROUTES } from "@/constants/routes";
import { useHrQuestionQuery, useSubmitHrAnswerMutation } from "@/features/interview/hooks";

export default function HrQuestionPage() {
  const params = useParams<{ questionId: string }>();
  const questionId = params.questionId;

  const { data: question, isLoading, isError, refetch } = useHrQuestionQuery(questionId);
  const submitAnswer = useSubmitHrAnswerMutation();
  const [practiceAnswer, setPracticeAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!practiceAnswer.trim()) return;
    submitAnswer.mutate({ questionId, answer: practiceAnswer.trim() });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <PageSkeleton rows={3} />
      </div>
    );
  }

  if (isError || !question) {
    return (
      <div className="space-y-6 pb-12">
        <ErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-12">
      <div>
        <Link
          href={ROUTES.dashboard.interviewHr}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to HR Questions
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-[#5D50EB] dark:bg-purple-950 dark:text-purple-300">
            {question.categoryId?.title}
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
          {question.question}
        </h1>
      </div>

      <DashboardCard title="Sample Answer">
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {question.sampleAnswer}
        </p>
      </DashboardCard>

      {question.keyPoints?.length > 0 && (
        <DashboardCard title="Key Points">
          <ul className="space-y-1.5">
            {question.keyPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                {point}
              </li>
            ))}
          </ul>
        </DashboardCard>
      )}

      {question.commonMistakes?.length > 0 && (
        <DashboardCard title="Common Mistakes">
          <ul className="space-y-1.5">
            {question.commonMistakes.map((mistake) => (
              <li
                key={mistake}
                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
              >
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                {mistake}
              </li>
            ))}
          </ul>
        </DashboardCard>
      )}

      {question.interviewerTips?.length > 0 && (
        <DashboardCard title="Interviewer Tips">
          <ul className="space-y-1.5">
            {question.interviewerTips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
              >
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5D50EB]" />
                {tip}
              </li>
            ))}
          </ul>
        </DashboardCard>
      )}

      <DashboardCard title="Practice Your Answer">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            rows={5}
            value={practiceAnswer}
            onChange={(e) => setPracticeAnswer(e.target.value)}
            placeholder="Write your practice answer here..."
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitAnswer.isPending || !practiceAnswer.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#4d40db] disabled:opacity-70"
            >
              <Save className="h-4 w-4" />
              {submitAnswer.isPending ? "Saving..." : "Save Practice Answer"}
            </button>
          </div>
        </form>
      </DashboardCard>
    </div>
  );
}
