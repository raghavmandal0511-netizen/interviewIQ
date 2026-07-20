"use client";

import { use } from "react";

import { PracticePageContent } from "@/features/aptitude/components/PracticePageContent";

export default function PracticePage({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const { topicSlug } = use(params);
  return <PracticePageContent moduleKey="verbal" topicSlug={topicSlug} />;
}
