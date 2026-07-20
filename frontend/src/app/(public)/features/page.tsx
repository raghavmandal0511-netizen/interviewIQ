import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Bot,
  FileText,
  Trophy,
  Users,
} from "lucide-react";

import { PublicFooter } from "@/components/footer";
import { PublicNavbar } from "@/components/navbar";
import { ROUTES } from "@/constants/routes";

const features = [
  {
    icon: BookOpen,
    title: "Aptitude Preparation",
    desc: "Arithmetic, Logical Reasoning, and Verbal Ability with theory, examples, and practice.",
  },
  {
    icon: FileText,
    title: "Mock Tests",
    desc: "Full-length timed exams that mirror real placement test patterns with instant scoring.",
  },
  {
    icon: Users,
    title: "HR Interview Prep",
    desc: "Curated behavioral questions with sample answers for freshers and experienced candidates.",
  },
  {
    icon: Bot,
    title: "AI Interview",
    desc: "Voice-based AI mock interviews with real-time feedback on your responses.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    desc: "Track accuracy, identify weak topics, and monitor improvement over time.",
  },
  {
    icon: Trophy,
    title: "Personalized Learning",
    desc: "Recommendations based on your performance to focus effort where it counts.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
              Platform Features
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
              Everything you need to prepare for aptitude tests, HR rounds, and technical
              interviews — in one unified platform.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-100 p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                    <f.icon className="h-5 w-5 text-[#5D50EB]" />
                  </div>
                  <h2 className="mt-4 text-base font-bold text-slate-900">{f.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#5D50EB] py-16 text-center text-white">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-2xl font-extrabold">Start preparing today</h2>
            <p className="mt-3 text-sm text-indigo-100">
              Create a free account and access all core features instantly.
            </p>
            <Link
              href={ROUTES.signup}
              className="mt-6 inline-flex rounded-xl bg-white px-8 py-3 text-sm font-bold text-[#5D50EB] hover:bg-slate-50"
            >
              Sign Up Free
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
