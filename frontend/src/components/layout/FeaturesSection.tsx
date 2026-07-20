"use client";

import { 
  BookOpen, 
  FileText, 
  Users, 
  Bot, 
  BarChart3, 
  Trophy 
} from "lucide-react";
import { useEffect, useState } from "react";

// Simple count up component
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    // adjust step for large numbers
    const increment = Math.ceil(end / 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function FeaturesSection() {
  const features = [
    {
      title: "Aptitude Preparation",
      desc: "Master Arithmetic, Logical Reasoning & Verbal Ability with concepts, practice questions & quizzes.",
      icon: BookOpen,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100/50",
    },
    {
      title: "Mock Tests",
      desc: "Take full-length mock tests that simulate real exam experience and improve your performance.",
      icon: FileText,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100/50",
    },
    {
      title: "HR Interview Prep",
      desc: "Explore frequently asked HR questions with sample answers for freshers & experienced.",
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100/50",
    },
    {
      title: "AI Interview",
      desc: "Practice AI-powered interviews and get instant feedback to improve your skills.",
      icon: Bot,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100/50",
    },
    {
      title: "Detailed Reports",
      desc: "Track your progress with detailed analytics and identify your strengths & weaknesses.",
      icon: BarChart3,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100/50",
    },
    {
      title: "Personalized Learning",
      desc: "Get topic recommendations based on your performance and improve continuously.",
      icon: Trophy,
      iconColor: "text-rose-600",
      bgColor: "bg-rose-50",
      iconBg: "bg-rose-100/50",
    },
  ];

  return (
    <section id="features" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
            Everything You Need to Crack Placements
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative flex flex-col p-6 rounded-2xl border border-slate-100 bg-white transition-colors hover:border-slate-200 cursor-default group"
            >
              {/* Feature Icon */}
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor}`}>
                <feature.icon className="h-5 w-5" />
              </div>

              {/* Title & Desc */}
              <h3 className="mt-4 text-base font-bold text-slate-900 tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section Banner */}
        <div className="mt-20 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-8">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4 divide-y-0 divide-x-0 md:divide-x divide-indigo-100/70">
            {[
              { val: 10, suffix: "K+", label: "Active Learners" },
              { val: 5000, suffix: "+", label: "Practice Questions" },
              { val: 1000, suffix: "+", label: "Mock Tests" },
              { val: 95, suffix: "%", label: "Success Rate" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-3xl font-extrabold text-[#3b52f6] tracking-tight md:text-4xl">
                  <Counter value={stat.val} suffix={stat.suffix} />
                </div>
                <div className="mt-1.5 text-xs font-semibold text-slate-500 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

