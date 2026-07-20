import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/30 dark:from-[#09090B] dark:via-[#0F172A] dark:to-[#09090B] text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans antialiased">
      {children}
    </div>
  );
}
