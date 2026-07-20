"use client";

import { use } from "react";

import { TheoryView } from "@/features/aptitude/components/TheoryView";

export default function TheoryPage({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const { topicSlug } = use(params);
  return <TheoryView moduleKey="logical" topicSlug={topicSlug} />;
}
