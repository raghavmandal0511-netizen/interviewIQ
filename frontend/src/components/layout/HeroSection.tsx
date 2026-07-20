"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  LayoutGrid, 
  Bell, 
  ChevronRight, 
  FileCheck, 
  Users, 
  BarChart3, 
  User2, 
  Settings2, 
  LogOut, 
  Sparkles, 
  Compass, 
  Brain
} from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgressVal(68), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-16 lg:py-24">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-200/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f5f3ff] px-4 py-1.5 text-xs font-semibold text-[#7c3aed]"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
              <Compass className="h-3.5 w-3.5 text-[#7c3aed]" />
              All-in-One Placement Preparation Platform
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl md:text-6xl"
            >
              Prepare Smarter. <br />
              <span className="text-[#3b52f6]">Get Placed Faster.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-slate-600"
            >
              InterviewIQ is your all-in-one platform to master Aptitude, take Mock Tests, practice HR & AI Interviews, and track your progress with detailed analytics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#3b52f6] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-[#2563eb] hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById("features");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Features
                <LayoutGrid className="h-4 w-4 text-slate-400" />
              </button>
            </motion.div>

            {/* Core Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-8"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                <span className="text-sm font-semibold text-slate-600">Trusted by Thousands</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                <span className="text-sm font-semibold text-slate-600">Expert Curated Content</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                <span className="text-sm font-semibold text-slate-600">Track & Improve</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column (App Dashboard Mockup) */}
          <div className="lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 60 }}
              className="relative w-full max-w-[690px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/80 flex h-[480px] md:h-[500px]"
            >
              {/* Mockup Sidebar */}
              <div className="w-[170px] bg-[#f8fafc] border-r border-slate-100 flex flex-col justify-between p-4 shrink-0">
                <div className="space-y-6">
                  {/* Sidebar Brand */}
                  <div className="flex items-center space-x-0.5">
                    <span className="text-sm font-bold tracking-tight text-slate-900">
                      Interview
                    </span>
                    <span className="text-sm font-extrabold text-blue-600">
                      IQ
                    </span>
                  </div>

                  {/* Sidebar Links */}
                  <div className="space-y-1">
                    {[
                      { label: "Dashboard", icon: LayoutGrid, active: true },
                      { label: "Aptitude", icon: Brain },
                      { label: "Mock Tests", icon: FileCheck },
                      { label: "Interview Prep", icon: Users, hasChevron: true },
                      { label: "Reports", icon: BarChart3 },
                      { label: "Profile", icon: User2 },
                      { label: "Settings", icon: Settings2 },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                          item.active
                            ? "bg-[#eef2ff] text-[#3b52f6] font-semibold"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className={`h-3.5 w-3.5 ${item.active ? "text-[#3b52f6]" : "text-slate-400"}`} />
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                        {item.hasChevron && <ChevronRight className="h-3 w-3 text-slate-400" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar Logout */}
                <div className="flex items-center space-x-2 px-2.5 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg cursor-pointer transition-colors">
                  <LogOut className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-[11px]">Logout</span>
                </div>
              </div>

              {/* Mockup Main Panel */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#fafbfe]">
                {/* Header bar */}
                <div className="h-14 border-b border-slate-100 px-5 flex items-center justify-between bg-white">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      Welcome back, John! 👋
                    </h3>
                    <p className="text-[9px] text-slate-400 font-medium">Keep learning, keep improving.</p>
                  </div>
                  
                  {/* Notifications and Profile */}
                  <div className="flex items-center space-x-3.5">
                    <div className="relative cursor-pointer">
                      <Bell className="h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors" />
                      <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] font-bold text-blue-700">JD</span>
                      </div>
                      <ChevronRight className="h-3 w-3 rotate-90 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Mockup Contents */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Tests Taken", value: "24", color: "text-slate-800" },
                      { label: "Accuracy", value: "78%", color: "text-[#10b981]" },
                      { label: "Topics Completed", value: "56", color: "text-slate-800" },
                      { label: "Current Streak", value: "7 Days", color: "text-[#3b52f6]", highlight: true },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm">
                        <span className="text-[9px] font-medium text-slate-400 block truncate">{stat.label}</span>
                        <span className={`text-sm font-bold block mt-1 ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Two Columns Section */}
                  <div className="grid grid-cols-3 gap-3.5">
                    {/* Left Column (Span 2) */}
                    <div className="col-span-2 space-y-3.5">
                      
                      {/* Your Progress */}
                      <div className="bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold text-slate-800">Your Progress</span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] font-semibold text-slate-500 mb-1">
                          <span>Overall Progress</span>
                          <span className="text-blue-600">{progressVal}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressVal}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-blue-600 h-1.5 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Recommended for You */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-800 block">Recommended for You</span>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { title: "Arithmetic", action: "Practice Now", bg: "bg-[#f0fdf4] border-[#dcfce7]", text: "text-[#15803d]", tagBg: "bg-[#15803d]/10" },
                            { title: "Full Mock Test", action: "Start Test", bg: "bg-[#f0f9ff] border-[#e0f2fe]", text: "text-[#0369a1]", tagBg: "bg-[#0369a1]/10" },
                            { title: "HR Questions", action: "Explore", bg: "bg-[#fff7ed] border-[#ffedd5]", text: "text-[#c2410c]", tagBg: "bg-[#c2410c]/10" },
                          ].map((rec) => (
                            <div key={rec.title} className={`${rec.bg} border p-2.5 rounded-lg shadow-sm flex flex-col justify-between h-[68px]`}>
                              <div>
                                <span className={`text-[10px] font-bold ${rec.text}`}>{rec.title}</span>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className={`text-[8px] font-bold ${rec.text} opacity-90`}>{rec.action}</span>
                                <ArrowRight className={`h-2.5 w-2.5 ${rec.text}`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column (Span 1) - Recent Activity */}
                    <div className="col-span-1">
                      <div className="bg-white border border-[#f1f5f9] p-3 rounded-lg shadow-sm h-full flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-slate-800 block mb-2">Recent Activity</span>
                        <div className="space-y-2 flex-1">
                          {[
                            { desc: "Arithmetic Test Completed", time: "2h ago", dot: "bg-emerald-500" },
                            { desc: "Logical Reasoning Practice", time: "5h ago", dot: "bg-blue-500" },
                            { desc: "HR Interview Question Answered", time: "1d ago", dot: "bg-indigo-500" },
                            { desc: "Verbal Ability Practice", time: "1d ago", dot: "bg-purple-500" },
                          ].map((act, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <span className={`h-1.5 w-1.5 rounded-full mt-1 shrink-0 ${act.dot}`} />
                              <div className="min-w-0">
                                <p className="text-[8px] font-semibold text-slate-700 leading-tight truncate">{act.desc}</p>
                                <span className="text-[7px] font-medium text-slate-400">{act.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Banner */}
                  <div className="bg-[#3b52f6] rounded-xl p-3 text-white flex items-center justify-between shadow-md relative overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute right-0 top-0 -z-0 h-16 w-16 bg-white/10 rounded-full blur-xl" />
                    <div className="relative z-10 space-y-0.5">
                      <h4 className="text-[10px] font-bold flex items-center gap-1">
                        Ready for your next interview? <Sparkles className="h-3 w-3 text-amber-300 fill-amber-300" />
                      </h4>
                      <p className="text-[8px] text-blue-100 font-medium">Practice with AI Interview and boost your confidence.</p>
                    </div>
                    <button className="relative z-10 shrink-0 bg-white text-[#3b52f6] text-[8px] font-extrabold px-3 py-1.5 rounded-lg shadow hover:bg-slate-50 transition-colors">
                      Start AI Interview
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

