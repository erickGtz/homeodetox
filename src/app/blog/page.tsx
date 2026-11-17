import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/blog-grid";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Tabs } from "@/components/ui/tabs";
import { blogIndexContent } from "@/content/blog";
import { getBlogPosts } from "@/lib/content/loader";
import type { BlogPost } from "@/lib/content/schemas";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: blogIndexContent.seo.title,
  description: blogIndexContent.seo.description,
  path: "/blog",
});

function BlogPanel({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      <div className="mb-10 flex flex-col gap-2">
        <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
          {blogIndexContent.eyebrow}
        </p>
        <p className="text-text-muted max-w-2xl text-base font-light">
          {blogIndexContent.subtitle}
        </p>
      </div>
      <BlogGrid posts={posts} emptyLabel={blogIndexContent.empty} />
    </div>
  );
}

export default function BlogPage() {
  const posts = getBlogPosts();
  const videos = posts.filter((post) => post.type === "video");
  const articles = posts.filter((post) => post.type === "post");

  const tabs = [
    {
      id: "todos",
      label: blogIndexContent.tabs.all,
      content: <BlogPanel posts={posts} />,
    },
    {
      id: "videos",
      label: blogIndexContent.tabs.videos,
      content: <BlogPanel posts={videos} />,
    },
    {
      id: "posts",
      label: blogIndexContent.tabs.posts,
      content: <BlogPanel posts={articles} />,
    },
  ];

  return (
    <>
      <PageHero
        title={blogIndexContent.hero.title}
        tone="light"
        align="center"
        titleVariant="page"
      />

      <section className="bg-surface">
        <Container className="pb-16 sm:pb-20">
          <div className="py-6">
            <Breadcrumbs
              items={[
                { label: blogIndexContent.breadcrumbs.section, href: "/blog" },
                { label: blogIndexContent.breadcrumbs.all },
              ]}
            />
          </div>
          <Tabs items={tabs} />
        </Container>
      </section>
    </>
  );
}
