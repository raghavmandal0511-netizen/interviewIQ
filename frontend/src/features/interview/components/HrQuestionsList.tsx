"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/shared/states";
import { hrQuestionPath } from "@/constants/routes";
import { useHrQuestionsQuery } from "@/features/interview/hooks";
import type { HrQuestion } from "@/features/interview/api/hr.service";

type HrQuestionsListProps = {
  categorySlug?: string;
  title?: string;
  breadcrumb?: React.ReactNode;
};

export function HrQuestionsList({ categorySlug, title, breadcrumb }: HrQuestionsListProps) {
  const params: Record<string, string | number> = { limit: 50 };
  if (categorySlug) {
    params.category = categorySlug;
  }
  const { data: questions, isLoading, isError, refetch } = useHrQuestionsQuery(params);

  if (isLoading) {
    return <PageSkeleton rows={4} />;
  }

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-4">
      {breadcrumb}
      {title && (
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{title}</h1>
      )}

      {!questions?.length ? (
        <EmptyState
          title="No questions found"
          description="Try another category or check back later."
        />
      ) : (
        questions.map((q) => <HrQuestionCard key={q._id} question={q} />)
      )}
    </div>
  );
}

function HrQuestionCard({ question }: { question: HrQuestion }) {
  return (
    <DashboardCard className="hover:border-purple-200">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-[#5D50EB] dark:bg-purple-950 dark:text-purple-300">
              {question.categoryId?.title ?? "HR"}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{question.question}</h3>
          {question.keyPoints?.[0] && (
            <p className="text-xs italic text-slate-500 dark:text-slate-400">
              Tip: {question.keyPoints[0]}
            </p>
          )}
        </div>
        <Link
          href={hrQuestionPath(question._id)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#4d40db]"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          View & Practice
        </Link>
      </div>
    </DashboardCard>
  );
}

export function HrBreadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <div className="flex items-center space-x-2 text-xs font-bold text-[#5D50EB]">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center space-x-2">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
