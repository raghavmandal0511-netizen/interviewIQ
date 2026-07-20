"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Clock, FileCheck, Play, Target } from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { ErrorState, PageSkeleton } from "@/components/shared/states";
import { ROUTES, testAttemptPath } from "@/constants/routes";
import { useStartAttemptMutation, useTestQuery } from "@/features/tests/hooks";

export default function TestInstructionsPage() {
  const params = useParams<{ testId: string }>();
  const testId = params.testId;
  const router = useRouter();

  const { data: test, isLoading, isError, refetch } = useTestQuery(testId);
  const startAttempt = useStartAttemptMutation();

  const handleStart = async () => {
    const session = await startAttempt.mutateAsync(testId);
    router.push(`${testAttemptPath(testId)}?attemptId=${session.attempt._id}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <PageSkeleton rows={2} />
      </div>
    );
  }

  if (isError || !test) {
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
          href={ROUTES.dashboard.tests}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5D50EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Tests
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
          {test.title}
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Read the instructions carefully before starting the test.
        </p>
      </div>

      <DashboardCard title="Test Overview">
        <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#5D50EB]" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{test.duration} mins</p>
              <p className="text-slate-400">Duration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-[#5D50EB]" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{test.totalQuestions}</p>
              <p className="text-slate-400">Questions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#5D50EB]" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{test.passingMarks}%</p>
              <p className="text-slate-400">Pass mark</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-[#5D50EB]" />
            <div>
              <p className="font-bold capitalize text-slate-900 dark:text-white">
                {test.difficulty}
              </p>
              <p className="text-slate-400">Difficulty</p>
            </div>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Instructions">
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <li>• The timer starts immediately once you click Start Test.</li>
          <li>• You can navigate between questions using the question navigator.</li>
          <li>• Your answers are saved automatically when you select an option.</li>
          <li>• The test will auto-submit when the timer reaches zero.</li>
          <li>• Review your results and explanations after submission.</li>
        </ul>
        {test.description && (
          <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {test.description}
          </p>
        )}
      </DashboardCard>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={startAttempt.isPending}
          onClick={() => void handleStart()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-6 py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#4d40db] disabled:opacity-70"
        >
          <Play className="h-4 w-4 fill-white" />
          {startAttempt.isPending ? "Starting..." : "Start Test"}
        </button>
      </div>
    </div>
  );
}
