import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

function formatDate(dateStr: string, locale: AppLocale) {
  return new Date(dateStr).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
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

export async function PostList({ posts, categories, activeCategory }: PostListProps) {
  const locale = (await getLocale()) as AppLocale;
  const isFr = locale === "fr";

  return (
    <Section aria-labelledby="posts-heading">
      <h2 id="posts-heading" className="sr-only">
        Articles
      </h2>

      <nav aria-label={isFr ? "Filtrer par catégorie" : "Filter by category"} className="flex flex-wrap gap-2">
        <CategoryPill label={isFr ? "Tout" : "All"} href="/blog" active={!activeCategory} />
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
                    {formatDate(post.publishedAt, locale)} &middot; {post.readingTimeMinutes}{" "}
                    {isFr ? "min de lecture" : "min read"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">
          {isFr ? "Aucun article dans cette catégorie pour le moment." : "No articles in this category yet."}
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
