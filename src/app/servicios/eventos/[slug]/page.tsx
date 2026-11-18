import type { Metadata } from "next";
import { Suspense } from "react";
import { EventDetails } from "./event-details";
import { Container } from "@/components/ui/container";
import { getEventBySlug, getEvents } from "@/lib/content/loader";
import { buildMetadata } from "@/lib/seo";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {};
  }

  return buildMetadata({
    title: event.seo.title,
    description: event.seo.description,
    path: `/servicios/eventos/${event.slug}`,
    image: event.cover,
  });
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-surface" aria-hidden="true">
          <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
            <div className="bg-border/60 h-4 w-56 animate-pulse rounded" />
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,374px)_minmax(0,1fr)] lg:gap-14">
              <div className="bg-placeholder rounded-card aspect-[374/526] animate-pulse" />
              <div className="flex max-w-2xl flex-col gap-4">
                <div className="bg-border/60 h-9 w-2/3 animate-pulse rounded" />
                <div className="bg-border/60 h-5 w-1/2 animate-pulse rounded" />
                <div className="bg-border/60 mt-4 h-px w-full" />
                <div className="bg-border/60 h-4 w-full animate-pulse rounded" />
                <div className="bg-border/60 h-4 w-full animate-pulse rounded" />
                <div className="bg-border/60 h-4 w-4/5 animate-pulse rounded" />
                <div className="bg-border/60 mt-6 h-4 w-1/3 animate-pulse rounded" />
                <div className="bg-border/60 h-4 w-1/2 animate-pulse rounded" />
              </div>
            </div>
          </Container>
        </div>
      }
    >
      <EventDetails params={params} />
    </Suspense>
  );
}
