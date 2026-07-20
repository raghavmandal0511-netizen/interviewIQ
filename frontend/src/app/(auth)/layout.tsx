import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

/**
 * Auth Layout
 * TODO: Compose centered auth shell when building UI.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div data-layout="auth">{children}</div>;
}
