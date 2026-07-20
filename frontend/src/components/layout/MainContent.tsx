import type { ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
};

/**
 * Placeholder: MainContent
 * TODO: Main content wrapper for dashboard pages.
 */
export function MainContent({ children }: MainContentProps) {
  return <main data-slot="main-content">{children}</main>;
}
