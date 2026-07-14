"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Last-resort boundary for errors in the root layout itself (including
// [locale]/layout.tsx) — replaces the entire document, so it can't rely on
// NextIntlClientProvider being mounted. Kept static and English-only, same
// simplification as the root not-found.tsx.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          textAlign: "center",
          padding: "2rem",
          background: "#0B0F0B",
          color: "#F5F7F4",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "#8F968B" }}>500</p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
          Something went wrong on our end
        </h1>
        <p style={{ maxWidth: 420, color: "#8F968B", margin: 0 }}>
          This isn&apos;t you — an unexpected error happened while loading this
          page.
        </p>
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.625rem 1.25rem",
              borderRadius: "18px",
              background: "#D6FF5C",
              color: "#0B0F0B",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {/* Plain <a> is intentional: the root layout itself has crashed
              here, so a hard navigation is more reliable than trusting the
              (possibly broken) client-side router. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/en"
            style={{
              padding: "0.625rem 1.25rem",
              borderRadius: "18px",
              border: "1px solid #2A3128",
              color: "#F5F7F4",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Back to homepage
          </a>
        </div>
      </body>
    </html>
  );
}
