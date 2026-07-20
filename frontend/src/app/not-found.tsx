import Link from "next/link";

import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <section>
      <h1>404 — Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <p>TODO: Implement designed 404 UI.</p>
      <Link href={ROUTES.home}>Go home</Link>
    </section>
  );
}
