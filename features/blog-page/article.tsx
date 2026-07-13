import { Section } from "@/components/layout/section";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { siteConfig } from "@/lib/constants";
import type { BlogPost } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function Article({ post }: { post: BlogPost }) {
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
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {" · "}
          {post.readingTimeMinutes} min read
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
        heading="See it running on your stations"
        description="Download the beta and try it yourself, or request a demo with your team."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_blog_post_cta",
        }}
        secondaryCta={{
          label: siteConfig.secondaryCtaLabel,
          href: "/contact",
          event: "blog_post_cta_request_demo",
        }}
      />
    </>
  );
}
