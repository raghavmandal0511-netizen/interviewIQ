"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileCheck,
  MessageSquare,
  Target,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { DashboardCard } from "@/components/cards/DashboardCard";
import { StatCard } from "@/components/cards/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/shared/states";
import { ROUTES, testResultPath } from "@/constants/routes";
import {
  useReportsHrQuery,
  useReportsModulesQuery,
  useReportsOverviewQuery,
  useReportsPerformanceQuery,
  useReportsStrongTopicsQuery,
  useReportsTestsQuery,
  useReportsTopicsQuery,
  useReportsWeakTopicsQuery,
} from "@/features/reports/hooks";
import { formatDate, formatPercent } from "@/utils/format";

const TAB_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "topics", label: "Topics" },
  { id: "modules", label: "Modules" },
  { id: "tests", label: "Tests" },
  { id: "performance", label: "Performance" },
  { id: "hr", label: "HR" },
] as const;

type TabId = (typeof TAB_ITEMS)[number]["id"];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const overview = useReportsOverviewQuery();
  const topics = useReportsTopicsQuery();
  const modules = useReportsModulesQuery();
  const tests = useReportsTestsQuery();
  const performance = useReportsPerformanceQuery();
  const hr = useReportsHrQuery();
  const weakTopics = useReportsWeakTopicsQuery();
  const strongTopics = useReportsStrongTopicsQuery();

  const isLoading =
    overview.isLoading &&
    topics.isLoading &&
    modules.isLoading &&
    tests.isLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <PageSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Performance & Skill Analytics
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Deep dive into your speed, accuracy, weak topics, and placement readiness.
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.info("PDF export coming soon")}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-[#5D50EB] hover:text-[#5D50EB] dark:border-white/[0.08] dark:bg-[#161B22] dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
        <TabsList>
          {TAB_ITEMS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              activeValue={activeTab}
              onClick={(v) => setActiveTab(v as TabId)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" activeValue={activeTab}>
          {overview.isError ? (
            <ErrorState onRetry={() => void overview.refetch()} />
          ) : overview.data ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <StatCard
                  title="Overall Progress"
                  value={formatPercent(overview.data.overallProgress, 0)}
                  icon={Target}
                />
                <StatCard
                  title="Tests Completed"
                  value={overview.data.testsCompleted}
                  icon={FileCheck}
                />
                <StatCard
                  title="Avg Accuracy"
                  value={formatPercent(overview.data.averageAccuracy, 0)}
                  icon={TrendingUp}
                />
                <StatCard
                  title="HR Answers"
                  value={overview.data.hrQuestionsAnswered}
                  icon={MessageSquare}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <DashboardCard title="Learning Stats">
                  <div className="space-y-2 text-xs">
                    <StatRow label="Questions Solved" value={overview.data.questionsSolved} />
                    <StatRow label="Topics Completed" value={overview.data.completedTopics} />
                    <StatRow label="Theory Completed" value={overview.data.completedTheory} />
                    <StatRow label="Exercises Completed" value={overview.data.completedExercises} />
                    <StatRow label="Hours Practiced" value={overview.data.hoursPracticed} />
                  </div>
                </DashboardCard>
                <DashboardCard title="Test Stats">
                  <div className="space-y-2 text-xs">
                    <StatRow label="Tests Attempted" value={overview.data.testsAttempted} />
                    <StatRow label="Average Score" value={formatPercent(overview.data.averageScore, 0)} />
                    <StatRow label="Highest Score" value={formatPercent(overview.data.highestScore, 0)} />
                    <StatRow label="Current Streak" value={`${overview.data.currentStreak} days`} />
                  </div>
                </DashboardCard>
                <DashboardCard title="Quick Insights">
                  <div className="space-y-3">
                    <TopicList title="Strong Topics" query={strongTopics} variant="strong" />
                    <TopicList title="Weak Topics" query={weakTopics} variant="weak" />
                  </div>
                </DashboardCard>
              </div>
            </div>
          ) : (
            <PageSkeleton rows={3} />
          )}
        </TabsContent>

        <TabsContent value="topics" activeValue={activeTab}>
          {topics.isError ? (
            <ErrorState onRetry={() => void topics.refetch()} />
          ) : !topics.data?.length ? (
            <EmptyState title="No topic progress yet" description="Start practicing aptitude topics to see progress here." />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-white/[0.03]">
                  <tr>
                    {["Topic", "Module", "Completion", "Accuracy", "Attempts"].map((h) => (
                      <th key={h} className="px-4 py-3 font-bold text-slate-600 dark:text-slate-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topics.data.map((t) => (
                    <tr key={t._id} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{t.topicName}</td>
                      <td className="px-4 py-3 text-slate-500">{t.module}</td>
                      <td className="px-4 py-3">{formatPercent(t.completionPercentage, 0)}</td>
                      <td className="px-4 py-3">{formatPercent(t.accuracy, 0)}</td>
                      <td className="px-4 py-3">{t.attempts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="modules" activeValue={activeTab}>
          {modules.isError ? (
            <ErrorState onRetry={() => void modules.refetch()} />
          ) : !modules.data?.length ? (
            <EmptyState title="No module data" />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {modules.data.map((m) => (
                <DashboardCard key={m.moduleName} title={m.moduleName}>
                  <div className="space-y-2 text-xs">
                    <StatRow
                      label="Topics Completed"
                      value={`${m.completedTopics} / ${m.totalTopics}`}
                    />
                    <StatRow label="Completion" value={formatPercent(m.completionPercentage, 0)} />
                    <StatRow label="Avg Accuracy" value={formatPercent(m.averageAccuracy, 0)} />
                    <StatRow label="Avg Score" value={formatPercent(m.averageScore, 0)} />
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-[#5D50EB]"
                        style={{ width: `${m.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </DashboardCard>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tests" activeValue={activeTab}>
          {tests.isError ? (
            <ErrorState onRetry={() => void tests.refetch()} />
          ) : !tests.data?.length ? (
            <EmptyState title="No test history" description="Take a mock test to see your history here." />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-white/[0.03]">
                  <tr>
                    {["Test", "Score", "Accuracy", "Date", "Status", ""].map((h) => (
                      <th key={h} className="px-4 py-3 font-bold text-slate-600 dark:text-slate-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tests.data.map((t) => (
                    <tr key={t.attemptId} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{t.testName}</td>
                      <td className="px-4 py-3">{formatPercent(t.percentage, 1)}</td>
                      <td className="px-4 py-3">{formatPercent(t.accuracy, 0)}</td>
                      <td className="px-4 py-3 text-slate-500">{formatDate(t.attemptDate)}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-[#5D50EB] dark:bg-indigo-500/15 dark:text-indigo-300">
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`${testResultPath(t.testId)}?attemptId=${t.attemptId}`}
                          className="font-bold text-[#5D50EB] hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" activeValue={activeTab}>
          {performance.isError ? (
            <ErrorState onRetry={() => void performance.refetch()} />
          ) : performance.data ? (
            <DashboardCard
              title="Daily Practice (Last 30 Days)"
              subtitle={`${performance.data.summary.testsTaken} tests • ${performance.data.summary.questionsSolved} questions solved`}
            >
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performance.data.dailyPractice.slice(-14)}>
                    <defs>
                      <linearGradient id="reportGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#161B22",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        color: "#f8fafc",
                        fontSize: "12px",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="averageScore"
                      stroke="#6366F1"
                      strokeWidth={2}
                      fill="url(#reportGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatRow label="Avg Score" value={formatPercent(performance.data.summary.averageScore, 0)} />
                <StatRow label="Avg Accuracy" value={formatPercent(performance.data.summary.averageAccuracy, 0)} />
                <StatRow label="Tests Taken" value={performance.data.summary.testsTaken} />
                <StatRow label="Questions Solved" value={performance.data.summary.questionsSolved} />
              </div>
            </DashboardCard>
          ) : (
            <PageSkeleton rows={2} />
          )}
        </TabsContent>

        <TabsContent value="hr" activeValue={activeTab}>
          {hr.isError ? (
            <ErrorState onRetry={() => void hr.refetch()} />
          ) : hr.data ? (
            <div className="space-y-4">
              <StatCard
                title="Questions Answered"
                value={hr.data.questionsAnswered}
                icon={MessageSquare}
              />
              {!hr.data.answerHistory?.length ? (
                <div className="space-y-4">
                  <EmptyState
                    title="No HR answers yet"
                    description="Practice HR questions to build your answer history."
                  />
                  <div className="text-center">
                    <Link
                      href={ROUTES.dashboard.interviewHr}
                      className="inline-flex rounded-xl bg-[#5D50EB] px-4 py-2 text-xs font-bold text-white"
                    >
                      Browse HR Questions
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {hr.data.answerHistory.map((a) => (
                    <DashboardCard key={a.answerId}>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{a.question}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{a.category} • {formatDate(a.submittedAt)}</p>
                      <p className="mt-2 line-clamp-3 text-xs text-slate-600 dark:text-slate-400">{a.answer}</p>
                    </DashboardCard>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <PageSkeleton rows={2} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-bold text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}

function TopicList({
  title,
  query,
  variant,
}: {
  title: string;
  query: { data?: Array<{ topicName: string; accuracy: number }>; isLoading: boolean };
  variant: "strong" | "weak";
}) {
  if (query.isLoading) return null;
  if (!query.data?.length) {
    return (
      <p className="text-[11px] text-slate-400">No {variant} topics identified yet.</p>
    );
  }
  return (
    <div>
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
      <ul className="space-y-1">
        {query.data.slice(0, 3).map((t) => (
          <li key={t.topicName} className="flex justify-between text-[11px]">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{t.topicName}</span>
            <span className={variant === "strong" ? "text-emerald-600" : "text-rose-600"}>
              {formatPercent(t.accuracy, 0)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
