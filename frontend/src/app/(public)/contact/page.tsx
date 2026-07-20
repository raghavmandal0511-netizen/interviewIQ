"use client";

import { Mail, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import { PublicFooter } from "@/components/footer";
import { PublicNavbar } from "@/components/navbar";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    e.currentTarget.reset();
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
              Have a question, feedback, or partnership inquiry? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-2">
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "support@interviewiq.app" },
                { icon: MessageSquare, label: "Support Hours", value: "Mon–Sat, 9 AM – 6 PM IST" },
                { icon: MapPin, label: "Location", value: "India (Remote-first team)" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                    <item.icon className="h-5 w-5 text-[#5D50EB]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-xs font-bold text-slate-700">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-[#5D50EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-xs font-bold text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-[#5D50EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-xs font-bold text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-[#5D50EB] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#5D50EB] py-3 text-sm font-bold text-white hover:bg-[#4d40db]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
