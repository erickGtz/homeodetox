import { EventsCarousel, type EventSummary } from "@/components/sections/events-carousel";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { HomeBlog } from "@/components/sections/home-blog";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { WhyHomeoDetox } from "@/components/sections/why-homeodetox";
import { faqEntries } from "@/content/faq";
import { homeContent } from "@/content/home";
import { getBlogPosts, getEvents } from "@/lib/content/loader";
import type { BlogPost } from "@/lib/content/schemas";
import { buildMetadata, physicianJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: homeContent.seo.title,
  description: homeContent.seo.description,
  path: "/",
});

export default function Home() {
  const { hero, services, why, /*products*/ events, blog, faq } = homeContent;

  const upcomingEvents: EventSummary[] = getEvents()
    .slice(0, 4)
    .map((event) => ({
      slug: event.slug,
      title: event.title,
      kind: event.kind,
      date: event.date,
      cover: event.cover,
    }));

  const latestPosts: BlogPost[] = getBlogPosts()
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      type: post.type,
      date: post.date,
      author: post.author,
      excerpt: post.excerpt,
      cover: post.cover,
      videoUrl: post.videoUrl,
      duration: post.duration,
      tags: post.tags,
      seo: post.seo,
    }));

  const faqItems = faqEntries.slice(0, 4).map((entry) => ({
    id: entry.id,
    question: entry.question,
    answer: <p>{entry.answer}</p>,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd()) }}
      />

      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        actions={hero.actions}
        highlights={hero.highlights}
      />

      <ServiceShowcase
        title={services.title}
        subtitle={services.subtitle}
        items={services.items}
        footerCta={services.eventsCta}
      />

      <WhyHomeoDetox
        eyebrow={why.eyebrow}
        title={why.title}
        body={why.body}
        values={why.values}
        imageLabel={why.imageLabel}
        cta={why.cta}
      />

      {/*<CtaBanner
        eyebrow={products.eyebrow}
        title={products.title}
        description={products.description}
        href={products.href}
        label={products.label}
      /> */}

      <EventsCarousel
        title={events.title}
        subtitle={events.subtitle}
        events={upcomingEvents}
        empty={events.empty}
        cta={events.cta}
        labels={events.labels}
      />

      <HomeBlog
        title={blog.title}
        subtitle={blog.subtitle}
        posts={latestPosts}
        empty={blog.empty}
        cta={blog.cta}
      />

      <FaqSection title={faq.title} items={faqItems} cta={faq.cta} />
    </>
  );
}
