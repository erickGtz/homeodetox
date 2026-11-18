import { BlogGrid } from "@/components/sections/blog-grid";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import type { BlogPost } from "@/lib/content/schemas";
import Link from "next/link";

type HomeBlogProps = {
  title: string;
  subtitle?: string;
  posts: BlogPost[];
  empty: string;
  cta: {
    label: string;
    href: string;
  };
};

export function HomeBlog({ title, subtitle, posts, empty, cta }: HomeBlogProps) {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-primary-dark text-2xl font-semibold tracking-[0.2em] uppercase sm:text-3xl">
              {title}
            </h2>
            {subtitle ? <p className="text-text-muted mt-2 text-sm">{subtitle}</p> : null}
          </div>
          <Link
            href={cta.href}
            className="text-primary inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase"
          >
            {cta.label}
            <IconArrowRight className="size-3.5" />
          </Link>
        </div>

        <BlogGrid posts={posts.slice(0, 3)} emptyLabel={empty} className="mt-10" />
      </Container>
    </section>
  );
}
