import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getAcceptInvitationContent } from "@/content/accept-invitation";
import type { AppLocale } from "@/i18n/routing";
import { previewInvitation } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { AcceptInvitationForm } from "./accept-invitation-form";

interface AcceptInvitationPageProps {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({ params }: AcceptInvitationPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Accept Invitation", path: "/accept-invitation" }),
    robots: { index: false, follow: false },
  };
}

/**
 * MEMBERS-INVITATION-001 Piece 2 -- standalone, unauthenticated web
 * acceptance surface. Server-side only call to MCP (RFC-0011: never a raw
 * MCP call from client JS) -- previewInvitation() shows organization/role
 * before any password is collected; a missing/invalid/expired/revoked/
 * already-accepted token all render the exact same generic "invalid
 * invitation" state (anti-enumeration, same posture as preview()/accept()
 * themselves) -- this page never tries to distinguish *why* a token failed.
 */
export default async function AcceptInvitationPage({ params, searchParams }: AcceptInvitationPageProps) {
  const { locale } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);
  const content = getAcceptInvitationContent(locale);

  if (!token) {
    return (
      <PageHero eyebrow={content.eyebrow} title={content.invalidTitle} description={content.invalidDescription} />
    );
  }

  const preview = await previewInvitation(token).catch(() => null);

  if (!preview) {
    return (
      <PageHero eyebrow={content.eyebrow} title={content.invalidTitle} description={content.invalidDescription} />
    );
  }

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title(preview.organizationName, preview.roleName)}
        description={content.description}
      />
      <AcceptInvitationForm
        passwordLabel={content.passwordLabel}
        displayNameLabel={content.displayNameLabel}
        submitLabel={content.submitLabel}
        locale={locale}
        token={token}
      />
    </>
  );
}
