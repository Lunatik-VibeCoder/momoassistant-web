import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Card, CardContent } from "@/components/ui/card";
import { getSettingsContent } from "@/content/settings";
import type { AppLocale } from "@/i18n/routing";
import { marketingPath } from "@/lib/constants";
import { getMe } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { ChangePasswordForm } from "./change-password-form";
import { ProfileForm } from "./profile-form";
import { SettingsNavRow } from "./settings-nav-row";

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
    redirect(marketingPath(locale, "/login"));
  }
  const profile = await getMe(session.accessToken);
  const content = getSettingsContent(locale);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <h1 className="font-heading text-xl font-medium">{content.title}</h1>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">{content.groups.system.title}</h2>
        <Card>
          <CardContent className="flex flex-col gap-1 p-2">
            <SettingsNavRow href="/health" label={content.groups.system.health} />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">{content.groups.plan.title}</h2>
        <Card>
          <CardContent className="flex flex-col gap-1 p-2">
            <SettingsNavRow href="/license" label={content.groups.plan.license} />
            <SettingsNavRow href="/subscription" label={content.groups.plan.subscription} />
            <SettingsNavRow href="/billing" label={content.groups.plan.billing} />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">{content.groups.preferencesTitle}</h2>
        <ProfileForm content={content} displayName={profile.displayName} locale={profile.locale} />
        <ChangePasswordForm content={content} />
      </div>
    </div>
  );
}
