"use client";

import { HrBreadcrumb, HrQuestionsList } from "@/features/interview/components/HrQuestionsList";
import { ROUTES } from "@/constants/routes";

export default function HrExperiencedPage() {
  return (
    <div className="space-y-6 pb-12">
      <HrQuestionsList
        categorySlug="experienced"
        title="HR Questions for Experienced Candidates"
        breadcrumb={
          <HrBreadcrumb
            items={[
              { label: "Interview Prep", href: ROUTES.dashboard.interview },
              { label: "HR Questions", href: ROUTES.dashboard.interviewHr },
              { label: "Experienced" },
            ]}
          />
        }
      />
    </div>
  );
}
