"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Placed at TCS",
    quote:
      "InterviewIQ's mock tests felt exactly like my actual placement exam. The analytics helped me focus on weak topics and I improved my score by 20% in two weeks.",
  },
  {
    name: "Rahul Verma",
    role: "Placed at Infosys",
    quote:
      "The HR question bank with sample answers was a game changer. I went from stumbling on behavioral questions to delivering confident STAR-format responses.",
  },
  {
    name: "Ananya Patel",
    role: "Placed at Wipro",
    quote:
      "Between aptitude practice and AI interviews, I felt fully prepared. The daily progress tracking kept me motivated throughout placement season.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
            Trusted by Placement Aspirants
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Students across India use InterviewIQ to prepare smarter and get placed faster.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">&quot;{t.quote}&quot;</p>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-sm font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-[#5D50EB]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
