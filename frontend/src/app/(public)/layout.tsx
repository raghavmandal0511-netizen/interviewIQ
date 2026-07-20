import type { ReactNode } from "react";

type PublicLayoutProps = {
  children: ReactNode;
};

/**
 * Public Layout
 * TODO: Compose public chrome (navbar/footer) when building UI.
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return <div data-layout="public">{children}</div>;
}
