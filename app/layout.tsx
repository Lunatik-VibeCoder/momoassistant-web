import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/shared/skip-link";
import { defaultSeo, rootViewport } from "@/lib/seo";

import "./globals.css";

// Primary typeface per brand/typography.md.txt. Roboto (the brand's
// specified fallback) is intentionally not self-hosted: Inter is always
// available since it's loaded here, so Roboto only matters as a system-font
// fallback — and Android (this product's platform) ships Roboto natively,
// so declaring it in the stack costs nothing extra to load.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultSeo;
export const viewport: Viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
