import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist_Mono, Inter } from "next/font/google";

import { routing } from "@/i18n/routing";
import { createRootMetadata, rootViewport } from "@/lib/seo";

import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return createRootMetadata(locale);
}

export const viewport: Viewport = rootViewport;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale (next-intl reads the request
  // locale from context otherwise, which would opt every page into dynamic
  // rendering).
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`dark ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
