import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText, siteConfig } from "@/lib/constants";
import type { BlogPost } from "@/types";

function formatDate(dateStr: string, locale: AppLocale) {
  return new Date(dateStr).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function Article({ post }: { post: BlogPost }) {
  const locale = (await getLocale()) as AppLocale;
  const isFr = locale === "fr";
  const text = getSiteText(locale);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      >
        <p className="mt-4 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt, locale)}
          </time>
          {" · "}
          {post.readingTimeMinutes} {isFr ? "min de lecture" : "min read"}
        </p>
      </PageHero>

      <Section className="pt-0">
        <div className="mx-auto flex max-w-2xl flex-col gap-5">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <CtaBand
        heading={isFr ? "Voyez-le tourner sur vos stations" : "See it running on your stations"}
        description={
          isFr
            ? "Téléchargez la bêta et testez-la vous-même, ou demandez une démo avec votre équipe."
            : "Download the beta and try it yourself, or request a demo with your team."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_blog_post_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "blog_post_cta_request_demo",
        }}
      />
    </>
  );
}
