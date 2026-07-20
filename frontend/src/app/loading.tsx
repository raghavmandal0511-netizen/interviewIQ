import { PageSkeleton } from "@/components/shared/states";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-6">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <span className="text-2xl font-bold text-slate-900">
            Interview<span className="text-[#5D50EB]">IQ</span>
          </span>
        </div>
        <PageSkeleton rows={3} />
      </div>
    </div>
  );
}
