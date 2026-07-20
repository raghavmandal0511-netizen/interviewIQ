import Link from "next/link";
import { Home, SearchX } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-50">
        <SearchX className="h-10 w-10 text-[#5D50EB]" />
      </div>
      <h1 className="mt-6 text-6xl font-extrabold text-[#5D50EB]">404</h1>
      <h2 className="mt-2 text-xl font-bold text-slate-900">Page Not Found</h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href={ROUTES.home}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#5D50EB] px-6 py-3 text-sm font-bold text-white hover:bg-[#4d40db]"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
