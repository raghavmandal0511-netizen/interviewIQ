import type { ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="mx-auto min-w-0 w-full max-w-7xl flex-1 space-y-6 p-5 sm:p-7 lg:p-9">
      {children}
    </main>
  );
}
