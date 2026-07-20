"use client";

import Link from "next/link";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-0.5">
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                Interview
              </span>
              <span className="text-2xl font-extrabold text-blue-600">
                IQ
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Your all-in-one platform to prepare smarter, practice better, and get placed faster.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FacebookIcon, href: "#" },
                { icon: TwitterIcon, href: "#" },
                { icon: LinkedinIcon, href: "#" },
                { icon: InstagramIcon, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Product
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "Features",
                  "Aptitude",
                  "Mock Tests",
                  "Interview Prep",
                  "Reports",
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-slate-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Company
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "About Us",
                  "Contact Us",
                  "Careers",
                  "Blog",
                  "Privacy Policy",
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-slate-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 space-y-6 sm:col-span-1">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                  Support
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {[
                    "Help Center",
                    "FAQs",
                    "Terms of Service",
                    "Refund Policy",
                  ].map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-colors hover:text-slate-900">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-slate-200 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Stay Updated
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Subscribe to get the latest updates and preparation tips.
            </p>
          </div>
          <form className="flex w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-l-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-r-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
          <p>© 2024 InterviewIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
