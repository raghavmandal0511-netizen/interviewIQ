"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <section>
          <h1>Application Error</h1>
          <p>{error.message || "A critical error occurred."}</p>
          <p>TODO: Implement designed global error UI.</p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </section>
      </body>
    </html>
  );
}
