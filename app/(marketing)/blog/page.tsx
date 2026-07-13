import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { blogHero, blogPosts } from "@/content/blog";
import { PostList } from "@/features/blog-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: blogHero.description,
  path: "/blog",
});

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  const posts = category
    ? blogPosts.filter((post) => post.category === category)
    : blogPosts;

  return (
    <>
      <PageHero
        eyebrow={blogHero.eyebrow}
        title={blogHero.title}
        description={blogHero.description}
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />
      <PostList posts={posts} categories={categories} activeCategory={category} />
    </>
  );
}
