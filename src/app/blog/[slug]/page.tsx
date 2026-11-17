import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BlogGrid } from "@/components/sections/blog-grid";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { blogIndexContent } from "@/content/blog";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content/loader";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({ source: post.content });
  const isVideo = post.type === "video";
  const related = getBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const initials = post.author
    .split(" ")
    .filter((part) => part.length > 2 && !/^dr\.?$/i.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.excerpt,
              path: `/blog/${post.slug}`,
              date: post.date,
              author: post.author,
              image: post.cover,
            }),
          ),
        }}
      />

      <article className="bg-surface">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs
            items={[
              { label: blogIndexContent.breadcrumbs.section, href: "/blog" },
              { label: blogIndexContent.breadcrumbs.articles },
              { label: post.title },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,374px)_minmax(0,1fr)] lg:gap-14">
            <MediaFrame
              src={post.cover ?? undefined}
              alt={`Portada de ${post.title}`}
              label={`Portada de ${post.title}`}
              className="rounded-card aspect-[374/432] lg:sticky lg:top-28"
              sizes="(min-width: 1024px) 374px, 100vw"
              priority
            />

            <div className="flex max-w-2xl flex-col gap-6">
              <Badge variant={post.type} className="self-start">
                {isVideo ? "Video" : "Post"}
              </Badge>

              <h1 className="text-text text-2xl leading-snug font-semibold sm:text-[28px] sm:leading-[1.375]">
                {post.title}
              </h1>

              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="bg-primary-dark text-on-primary flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                >
                  {initials}
                </span>
                <div>
                  <p className="text-sm">
                    <span className="text-text-muted">Por </span>
                    <span className="text-primary font-medium">{post.author}</span>
                  </p>
                  <time dateTime={post.date} className="text-text-muted text-xs">
                    {formatDate(post.date)}
                  </time>
                </div>
              </div>

              <hr className="border-border" />

              <div className="prose prose-neutral prose-headings:text-primary-dark prose-p:text-text-muted prose-p:text-base prose-p:leading-[1.85] prose-p:font-light prose-a:text-primary prose-strong:text-text max-w-none">
                {content}
              </div>

              {isVideo && post.videoUrl ? (
                <a
                  href={post.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({ className: "self-start" })}
                >
                  Ver video
                </a>
              ) : null}

              <p className="text-text-muted text-xs">
                {siteConfig.name} · {siteConfig.doctor.specialty}
              </p>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="bg-surface border-border border-t">
          <Container className="py-14 sm:py-16">
            <div className="flex flex-col gap-2">
              <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                {blogIndexContent.related.eyebrow}
              </p>
              <h2 className="text-text text-2xl font-semibold">{blogIndexContent.related.title}</h2>
            </div>
            <BlogGrid
              posts={related}
              emptyLabel={blogIndexContent.empty}
              className="mt-10 lg:grid-cols-3"
            />
          </Container>
        </section>
      ) : null}
    </>
  );
}
