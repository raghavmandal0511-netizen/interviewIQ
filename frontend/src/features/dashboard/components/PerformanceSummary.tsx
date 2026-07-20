"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { DashboardCard } from "@/components/cards/DashboardCard";

const weeklyPerformance = [
  { day: "Mon", score: 65, accuracy: 70, tests: 2 },
  { day: "Tue", score: 72, accuracy: 75, tests: 3 },
  { day: "Wed", score: 68, accuracy: 72, tests: 2 },
  { day: "Thu", score: 80, accuracy: 82, tests: 4 },
  { day: "Fri", score: 85, accuracy: 88, tests: 3 },
  { day: "Sat", score: 90, accuracy: 92, tests: 5 },
  { day: "Sun", score: 88, accuracy: 89, tests: 4 },
];

const categoryDistribution = [
  { name: "Arithmetic", value: 35, color: "#5D50EB" },
  { name: "Logical", value: 30, color: "#10b981" },
  { name: "Verbal", value: 20, color: "#f59e0b" },
  { name: "HR/AI", value: 15, color: "#ec4899" },
];

export function PerformanceSummary() {
  const [chartType, setChartType] = useState<"area" | "bar" | "pie" | "line">("area");

  return (
    <DashboardCard
      title="Performance Summary & Growth Analytics"
      subtitle="Comprehensive view of test scores, accuracy trends, and module distribution"
      action={
        <div className="flex items-center space-x-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800 text-xs font-semibold">
          <button
            onClick={() => setChartType("area")}
            className={`rounded-lg px-2.5 py-1 transition-all ${
              chartType === "area"
                ? "bg-[#5D50EB] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`rounded-lg px-2.5 py-1 transition-all ${
              chartType === "bar"
                ? "bg-[#5D50EB] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`rounded-lg px-2.5 py-1 transition-all ${
              chartType === "line"
                ? "bg-[#5D50EB] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType("pie")}
            className={`rounded-lg px-2.5 py-1 transition-all ${
              chartType === "pie"
                ? "bg-[#5D50EB] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Distribution
          </button>
        </div>
      }
    >
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={weeklyPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5D50EB" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#5D50EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#1e293b",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="score" stroke="#5D50EB" strokeWidth={3} fillOpacity={1} fill="url(#purpleGradient)" />
            </AreaChart>
          ) : chartType === "bar" ? (
            <BarChart data={weeklyPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#1e293b",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="score" fill="#5D50EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={weeklyPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#1e293b",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="score" stroke="#5D50EB" strokeWidth={3} dot={{ r: 4, fill: "#5D50EB" }} />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#1e293b",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {chartType === "pie" && (
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-semibold">
          {categoryDistribution.map((cat) => (
            <div key={cat.name} className="flex items-center space-x-1.5">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-slate-600 dark:text-slate-300">{cat.name} ({cat.value}%)</span>
            </div>
          ))}
        </div>
      )}
    </DashboardCard>
  );
}
