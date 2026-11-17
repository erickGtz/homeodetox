import { BlogCard } from "@/components/sections/blog-card";
import type { BlogPost } from "@/lib/content/schemas";
import { cn } from "@/lib/utils";

type BlogGridProps = {
  posts: BlogPost[];
  emptyLabel: string;
  className?: string;
};

export function BlogGrid({ posts, emptyLabel, className }: BlogGridProps) {
  if (posts.length === 0) {
    return <p className="text-text-muted text-sm font-light">{emptyLabel}</p>;
  }

  return (
    <div className={cn("grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
