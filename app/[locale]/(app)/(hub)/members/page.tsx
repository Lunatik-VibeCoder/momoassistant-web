import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { getMembersContent } from "@/content/members";
import type { AppLocale } from "@/i18n/routing";
import { marketingPath } from "@/lib/constants";
import { getMe, listMembers } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { formatDate } from "@/lib/utils";
import { InviteMemberDialog } from "./invite-member-dialog";
import { RemoveMemberButton } from "./remove-member-button";

interface MembersPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: MembersPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Members", path: "/members" }),
    robots: { index: false, follow: false },
  };
}

// WS-006 -- hand-rolled table (no table library, per decision: org member
// lists are small, sorting/pagination/filtering aren't real needs yet).
export default async function MembersPage({ params }: MembersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  // The backend's list endpoint returns every Member row regardless of
  // status -- REMOVED is a soft-delete (R5.1), never actually deleted, so a
  // removed member would otherwise never disappear from this page. Filtered
  // here rather than in mcp-client.ts, matching every other list function
  // there staying a plain passthrough.
  const allMembers = await listMembers(session.accessToken, organizationId);
  const members = allMembers.filter((member) => member.status !== "REMOVED");
  const content = getMembersContent(locale);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-medium">{content.title}</h1>
        <InviteMemberDialog organizationId={organizationId} content={content} />
      </div>

      {/*
        WS-005R found a real 768px-and-below overflow here: the Hub
        sidebar + this table's 7 columns don't both fit below `lg:`.
        Below `lg:`, one card per member instead of shrinking the table
        (a table with this many columns has no good "smaller" version —
        columns would either clip or force a second axis of scrolling on
        top of the sidebar's own). At `lg:`+, the full table remains
        exactly as before.
      */}
      <div className="hidden overflow-x-auto rounded-xl ring-1 ring-foreground/10 lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">{content.columns.name}</th>
              <th className="px-4 py-3 font-medium">{content.columns.email}</th>
              <th className="px-4 py-3 font-medium">{content.columns.role}</th>
              <th className="px-4 py-3 font-medium">{content.columns.status}</th>
              <th className="px-4 py-3 font-medium">{content.columns.joined}</th>
              <th className="px-4 py-3 font-medium">{content.columns.lastActive}</th>
              <th className="px-4 py-3 font-medium">{content.columns.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-3">{member.user.displayName}</td>
                <td className="px-4 py-3 text-muted-foreground">{member.user.email ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{member.role.name}</Badge>
                </td>
                <td className="px-4 py-3">{member.status}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(locale, member.joinedAt)}
                </td>
                {/* No lastActiveAt field exists anywhere on Member/User today
                    -- shown as-is rather than inventing a value, reserved
                    for a future MemberSummary enrichment. */}
                <td className="px-4 py-3 text-muted-foreground">
                  {content.lastActiveUnavailable}
                </td>
                <td className="px-4 py-3">
                  {member.userId !== session.user.id && (
                    <RemoveMemberButton
                      organizationId={organizationId}
                      memberId={member.id}
                      content={content}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 lg:hidden">
        {members.map((member) => (
          <li
            key={member.id}
            className="rounded-xl border border-border bg-card p-4 ring-1 ring-foreground/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {member.user.displayName}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {member.user.email ?? "—"}
                </p>
              </div>
              <Badge variant="outline" className="shrink-0">
                {member.role.name}
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>{member.status}</span>
              <span>
                {content.columns.joined} {formatDate(locale, member.joinedAt)}
              </span>
            </div>

            {member.userId !== session.user.id && (
              <div className="mt-3 border-t border-border pt-3">
                <RemoveMemberButton
                  organizationId={organizationId}
                  memberId={member.id}
                  content={content}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
