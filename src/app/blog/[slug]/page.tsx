import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogArticle } from "./blog-article";
import { Container } from "@/components/ui/container";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content/loader";
import { buildMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: `/blog/${post.slug}`,
    image: post.cover,
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-surface" aria-hidden="true">
          <Container className="py-10 sm:py-14">
            <div className="bg-border/60 h-4 w-56 animate-pulse rounded" />
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,374px)_minmax(0,1fr)] lg:gap-14">
              <div className="bg-placeholder rounded-card aspect-[374/432] animate-pulse" />
              <div className="flex max-w-2xl flex-col gap-4">
                <div className="bg-border/60 h-6 w-20 animate-pulse rounded" />
                <div className="bg-border/60 h-9 w-3/4 animate-pulse rounded" />
                <div className="bg-border/60 h-5 w-1/2 animate-pulse rounded" />
                <div className="bg-border/60 mt-4 h-px w-full" />
                <div className="bg-border/60 h-4 w-full animate-pulse rounded" />
                <div className="bg-border/60 h-4 w-full animate-pulse rounded" />
                <div className="bg-border/60 h-4 w-4/5 animate-pulse rounded" />
              </div>
            </div>
          </Container>
        </div>
      }
    >
      <BlogArticle params={params} />
    </Suspense>
  );
}
