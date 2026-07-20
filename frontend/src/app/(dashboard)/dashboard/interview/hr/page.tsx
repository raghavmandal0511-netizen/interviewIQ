"use client";

import Link from "next/link";
import { GraduationCap, Briefcase, ChevronRight } from "lucide-react";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/shared/states";
import { ROUTES } from "@/constants/routes";
import {
  HrBreadcrumb,
  HrQuestionsList,
} from "@/features/interview/components/HrQuestionsList";
import { useHrCategoriesQuery } from "@/features/interview/hooks";

export default function HrInterviewPage() {
  const { data: categories, isLoading, isError, refetch } = useHrCategoriesQuery();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <HrBreadcrumb
          items={[
            { label: "Interview Prep", href: ROUTES.dashboard.interview },
            { label: "HR Behavioral Questions" },
          ]}
        />
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
          HR Interview Questions & Sample Answers
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Browse categories and practice commonly asked HR interview questions.
        </p>
      </div>

      {isLoading ? (
        <PageSkeleton rows={2} />
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : !categories?.length ? (
        <EmptyState title="No categories available" />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories.map((cat) => {
            const isFreshers = cat.slug === "freshers";
            const isExperienced = cat.slug === "experienced";
            const href = isFreshers
              ? ROUTES.dashboard.interviewHrFreshers
              : isExperienced
                ? ROUTES.dashboard.interviewHrExperienced
                : undefined;

            return (
              <DashboardCard key={cat._id}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/40">
                      {isFreshers ? (
                        <GraduationCap className="h-5 w-5 text-[#5D50EB]" />
                      ) : isExperienced ? (
                        <Briefcase className="h-5 w-5 text-[#5D50EB]" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-[#5D50EB]" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  {href && (
                    <Link
                      href={href}
                      className="shrink-0 rounded-lg bg-[#5D50EB] px-3 py-1.5 text-[10px] font-bold text-white hover:bg-[#4d40db]"
                    >
                      Browse
                    </Link>
                  )}
                </div>
              </DashboardCard>
            );
          })}
        </div>
      )}

      <div className="pt-4">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900 dark:text-white">
          All Questions
        </h2>
        <HrQuestionsList />
      </div>
    </div>
  );
}
