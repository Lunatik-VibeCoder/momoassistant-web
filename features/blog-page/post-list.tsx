import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface PostListProps {
  posts: BlogPost[];
  categories: string[];
  activeCategory?: string;
}

export function PostList({ posts, categories, activeCategory }: PostListProps) {
  return (
    <Section aria-labelledby="posts-heading">
      <h2 id="posts-heading" className="sr-only">
        Articles
      </h2>

      <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
        <CategoryPill label="All" href="/blog" active={!activeCategory} />
        {categories.map((category) => (
          <CategoryPill
            key={category}
            label={category}
            href={`/blog?category=${encodeURIComponent(category)}`}
            active={activeCategory === category}
          />
        ))}
      </nav>

      {posts.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block h-full">
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardHeader>
                  <Badge variant="outline">{post.category}</Badge>
                  <CardTitle className="mt-3 text-base">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.publishedAt)} &middot; {post.readingTimeMinutes} min
                    read
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">
          No articles in this category yet.
        </p>
      )}
    </Section>
  );
}

function CategoryPill({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
