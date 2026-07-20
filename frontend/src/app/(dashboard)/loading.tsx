import { PageSkeleton } from "@/components/shared/states";

export default function DashboardLoading() {
  return (
    <div className="p-6">
      <PageSkeleton rows={4} />
    </div>
  );
}
