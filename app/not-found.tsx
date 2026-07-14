import Link from "next/link";

// Root-level fallback, outside the [locale] segment — next-intl's proxy
// rewrites virtually every request through /en or /fr before it gets here,
// so this is a rarely-hit safety net without locale context. Kept static
// and English-only, matching the same simplification as manifest.ts and
// opengraph-image.tsx.
export default function RootNotFound() {
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
        <p style={{ fontSize: "0.875rem", color: "#8F968B" }}>404</p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
          This page doesn&apos;t exist
        </h1>
        <p style={{ maxWidth: 420, color: "#8F968B", margin: 0 }}>
          The page you&apos;re looking for may have moved or never existed.
        </p>
        <Link
          href="/en"
          style={{
            marginTop: "1rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "18px",
            background: "#D6FF5C",
            color: "#0B0F0B",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Back to homepage
        </Link>
      </body>
    </html>
  );
}
