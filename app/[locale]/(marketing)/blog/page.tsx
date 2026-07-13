import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getBlogContent } from "@/content/blog";
import { PostList } from "@/features/blog-page";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface BlogPageProps {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getBlogContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/blog",
  });
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { category } = await searchParams;
  const { hero, posts: allPosts } = getBlogContent(locale);
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const posts = category
    ? allPosts.filter((post) => post.category === category)
    : allPosts;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/blog" }]}
      />
      <PostList posts={posts} categories={categories} activeCategory={category} />
    </>
  );
}
