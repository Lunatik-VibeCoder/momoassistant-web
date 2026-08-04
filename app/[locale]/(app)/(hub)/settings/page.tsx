import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getSettingsContent } from "@/content/settings";
import type { AppLocale } from "@/i18n/routing";
import { getMe } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { ChangePasswordForm } from "./change-password-form";
import { ProfileForm } from "./profile-form";

interface SettingsPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: SettingsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Settings", path: "/settings" }),
    robots: { index: false, follow: false },
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(`/${locale}/login`);
  }
  const profile = await getMe(session.accessToken);
  const content = getSettingsContent(locale);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4">
      <h1 className="font-heading text-xl font-medium">{content.title}</h1>
      <ProfileForm content={content} displayName={profile.displayName} locale={profile.locale} />
      <ChangePasswordForm content={content} />
    </div>
  );
}
