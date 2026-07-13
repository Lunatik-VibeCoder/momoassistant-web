import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogPosts } from "@/content/blog";
import { Article } from "@/features/blog-page";
import { createMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((candidate) => candidate.slug === slug);

  if (!post) {
    return createMetadata({ title: "Article not found", path: `/blog/${slug}` });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((candidate) => candidate.slug === slug);

  if (!post) {
    notFound();
  }

  return <Article post={post} />;
}
