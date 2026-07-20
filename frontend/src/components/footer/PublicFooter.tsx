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
    <footer className="bg-[#0f172a] text-slate-400">
      {/* Top Part */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-0.5">
              <span className="text-2xl font-bold tracking-tight text-white">
                Interview
              </span>
              <span className="text-2xl font-extrabold text-[#3b52f6]">
                IQ
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your all-in-one platform to prepare smarter, practice better, and get placed faster.
            </p>
            {/* Social Icons */}
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
                  className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            
            {/* Column Product */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
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
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column Company */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
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
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column Support / Stay Updated (combined for layout) */}
            <div className="col-span-2 sm:col-span-1 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
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
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Subscribe Section */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Stay Updated
            </h3>
            <p className="mt-1.5 text-sm text-slate-400">
              Subscribe to get the latest updates and preparation tips.
            </p>
          </div>
          <form className="flex w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-l-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#3b52f6] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-[#3b52f6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2563eb] active:scale-95 transition-all shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-xs">
          <p>© 2024 InterviewIQ. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

