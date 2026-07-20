import { Suspense } from "react";

import { PageSkeleton } from "@/components/shared/states";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8">
      <Suspense fallback={<div className="w-full max-w-md"><PageSkeleton rows={2} /></div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
