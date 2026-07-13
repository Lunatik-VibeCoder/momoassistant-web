import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getBlogContent } from "@/content/blog";
import { Article } from "@/features/blog-page";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ locale: AppLocale; slug: string }>;
}

export function generateStaticParams() {
  return getBlogContent("en").posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogContent(locale).posts.find(
    (candidate) => candidate.slug === slug
  );

  if (!post) {
    return createMetadata({
      locale,
      title: locale === "fr" ? "Article introuvable" : "Article not found",
      path: `/blog/${slug}`,
    });
  }

  return createMetadata({
    locale,
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogContent(locale).posts.find(
    (candidate) => candidate.slug === slug
  );

  if (!post) {
    notFound();
  }

  return <Article post={post} />;
}
