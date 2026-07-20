"use client";

import { use } from "react";

import { TopicOverviewPage } from "@/features/aptitude/components/TopicOverviewPage";

export default function TopicPage({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const { topicSlug } = use(params);
  return <TopicOverviewPage moduleKey="logical" topicSlug={topicSlug} />;
}
