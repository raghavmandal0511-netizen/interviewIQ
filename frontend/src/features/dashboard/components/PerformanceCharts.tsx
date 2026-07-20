"use client";

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

type ChartDataPoint = {
  day: string;
  score: number;
  accuracy: number;
  tests: number;
};

type CategoryPoint = {
  name: string;
  value: number;
  color: string;
};

type PerformanceChartsProps = {
  chartType: "area" | "bar" | "pie" | "line";
  weeklyPerformance: ChartDataPoint[];
  categoryDistribution: CategoryPoint[];
  isZero: boolean;
};

export default function PerformanceCharts({
  chartType,
  weeklyPerformance,
  categoryDistribution,
  isZero,
}: PerformanceChartsProps) {
  return (
    <>
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
              <span className="text-slate-600 dark:text-slate-300">
                {cat.name} ({isZero ? "0%" : `${cat.value}%`})
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
