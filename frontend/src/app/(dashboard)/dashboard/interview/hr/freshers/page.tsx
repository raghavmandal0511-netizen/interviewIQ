"use client";

import { HrBreadcrumb, HrQuestionsList } from "@/features/interview/components/HrQuestionsList";
import { ROUTES } from "@/constants/routes";

export default function HrFreshersPage() {
  return (
    <div className="space-y-6 pb-12">
      <HrQuestionsList
        categorySlug="freshers"
        title="HR Questions for Freshers"
        breadcrumb={
          <HrBreadcrumb
            items={[
              { label: "Interview Prep", href: ROUTES.dashboard.interview },
              { label: "HR Questions", href: ROUTES.dashboard.interviewHr },
              { label: "Freshers" },
            ]}
          />
        }
      />
    </div>
  );
}
