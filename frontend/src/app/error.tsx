"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  return (
    <section>
      <h1>Something went wrong</h1>
      <p>{error.message || "An unexpected error occurred."}</p>
      <p>TODO: Implement designed error UI.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
