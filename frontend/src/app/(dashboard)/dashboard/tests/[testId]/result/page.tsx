"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { ErrorState, PageSkeleton } from "@/components/shared/states";
import { ROUTES } from "@/constants/routes";
import { useAttemptResultQuery } from "@/features/tests/hooks";
import { formatPercent } from "@/utils/format";

function TestResultContent() {
  const params = useParams<{ testId: string }>();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId") ?? "";

  const { data, isLoading, isError, refetch } = useAttemptResultQuery(attemptId);

  if (!attemptId) {
    return (
      <ErrorState
        title="Missing attempt"
        message="No attempt ID found. Complete a test to view results."
      />
    );
  }

  if (isLoading) {
    return <PageSkeleton rows={4} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const { results, test, questions } = data;
  const passed = results.passed;

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      <div>
        <Link
          href={ROUTES.dashboard.tests}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Tests
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
          {test.title} — Results
        </h1>
      </div>

      <div
        className={`rounded-2xl border p-6 text-center ${
          passed
            ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
            : "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {passed ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          ) : (
            <XCircle className="h-6 w-6 text-rose-600" />
          )}
          <span
            className={`text-sm font-bold ${passed ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}
          >
            {passed ? "Passed" : "Did not pass"}
          </span>
        </div>
        <p className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">
          {formatPercent(results.percentage, 1)}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Score: {results.score} / {results.totalPossibleMarks} • Accuracy:{" "}
          {formatPercent(results.accuracy, 1)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Correct", value: results.totalCorrect, color: "text-emerald-600" },
          { label: "Wrong", value: results.totalWrong, color: "text-rose-600" },
          { label: "Unanswered", value: results.unanswered, color: "text-slate-500" },
          { label: "Pass mark", value: `${test.passingMarks}%`, color: "text-[#5D50EB]" },
        ].map((stat) => (
          <DashboardCard key={stat.label}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {stat.label}
            </p>
            <p className={`mt-1 text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard title="Answer Review">
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={q.questionId}
              className="rounded-xl border border-slate-100 p-4 dark:border-slate-800"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Q{index + 1}. {q.question.question}
                </p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-rose-500" />
                )}
              </div>

              <div className="mt-2 space-y-1 text-[11px]">
                <p className="text-slate-500">
                  Your answer:{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {Array.isArray(q.selectedOption)
                      ? q.selectedOption.join(", ")
                      : q.selectedOption || "Not answered"}
                  </span>
                </p>
                <p className="text-slate-500">
                  Correct answer:{" "}
                  <span className="font-semibold text-emerald-600">
                    {Array.isArray(q.correctAnswer)
                      ? q.correctAnswer.join(", ")
                      : q.correctAnswer}
                  </span>
                </p>
                {q.explanation && (
                  <p className="mt-1 italic text-slate-400">{q.explanation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      <div className="flex justify-center">
        <Link
          href={`${ROUTES.dashboard.tests}/${params.testId}/instructions`}
          className="rounded-xl bg-[#5D50EB] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#4d40db]"
        >
          Retake Test
        </Link>
      </div>
    </div>
  );
}

export default function TestResultPage() {
  return (
    <Suspense fallback={<PageSkeleton rows={4} />}>
      <TestResultContent />
    </Suspense>
  );
}
