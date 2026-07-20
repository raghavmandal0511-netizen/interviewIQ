import Link from "next/link";
import { Target, Users, Zap } from "lucide-react";

import { PublicFooter } from "@/components/footer";
import { PublicNavbar } from "@/components/navbar";
import { ROUTES } from "@/constants/routes";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
              About <span className="text-[#5D50EB]">InterviewIQ</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
              InterviewIQ is an all-in-one placement preparation platform built for students
              targeting campus placements and off-campus opportunities. We combine aptitude
              mastery, mock tests, HR interview prep, AI interviews, and detailed analytics
              into one seamless experience.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "Help every student prepare smarter, identify gaps early, and walk into interviews with confidence.",
                },
                {
                  icon: Zap,
                  title: "Our Approach",
                  desc: "Structured learning paths, real exam simulations, and data-driven feedback — not random question dumps.",
                },
                {
                  icon: Users,
                  title: "Who We Serve",
                  desc: "Engineering graduates, MBA aspirants, and anyone preparing for aptitude tests and HR rounds.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                    <item.icon className="h-6 w-6 text-[#5D50EB]" />
                  </div>
                  <h2 className="mt-4 text-base font-bold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900">Built for Placement Season</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              From your first aptitude topic to your final HR round, InterviewIQ grows with you.
              Track progress, retake mock tests, and refine your interview skills — all in one place.
            </p>
            <Link
              href={ROUTES.signup}
              className="mt-8 inline-flex rounded-xl bg-[#5D50EB] px-8 py-3 text-sm font-bold text-white hover:bg-[#4d40db]"
            >
              Join InterviewIQ
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
