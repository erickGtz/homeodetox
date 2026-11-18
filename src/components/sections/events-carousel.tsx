"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/ui/icons";
import { MediaFrame } from "@/components/ui/media-frame";
import type { Event } from "@/lib/content/schemas";
import { cn } from "@/lib/utils";

export type EventSummary = Pick<Event, "slug" | "title" | "kind" | "date" | "cover">;

type EventsCarouselProps = {
  title: string;
  subtitle?: string;
  events: EventSummary[];
  empty: string;
  cta: {
    label: string;
    href: string;
  };
  labels: {
    previous: string;
    next: string;
    more: string;
    slide: string;
  };
};

const kindLabels: Record<EventSummary["kind"], string> = {
  curso: "Curso",
  taller: "Taller",
  seminario: "Seminario",
};

const dayFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("es-MX", {
  month: "short",
  timeZone: "UTC",
});

function dateParts(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { day: "", month: "" };
  }

  return {
    day: dayFormatter.format(date),
    month: monthFormatter.format(date).replace(".", ""),
  };
}

export function EventsCarousel({
  title,
  subtitle,
  events,
  empty,
  cta,
  labels,
}: EventsCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  function goTo(nextIndex: number) {
    const track = trackRef.current;
    const slide = track?.children[nextIndex] as HTMLElement | undefined;

    if (!track || !slide) {
      return;
    }

    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setIndex(nextIndex);
  }

  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-primary-dark text-2xl font-semibold tracking-[0.2em] uppercase sm:text-3xl">
              {title}
            </h2>
            {subtitle ? <p className="text-text-muted mt-2 text-sm">{subtitle}</p> : null}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={cta.href}
              className="text-primary hidden items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase sm:inline-flex"
            >
              {cta.label}
              <IconArrowRight className="size-3.5" />
            </Link>
            {events.length > 1 ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                  aria-label={labels.previous}
                  className="border-border text-primary hover:bg-primary/5 inline-flex size-10 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
                >
                  <IconChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  disabled={index === events.length - 1}
                  aria-label={labels.next}
                  className="border-border text-primary hover:bg-primary/5 inline-flex size-10 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
                >
                  <IconChevronRight className="size-4" />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {events.length === 0 ? (
          <p className="text-text-muted mt-10 text-sm font-light">{empty}</p>
        ) : (
          <>
            <ul
              ref={trackRef}
              className="relative mt-8 flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto overflow-y-hidden pb-2 [&::-webkit-scrollbar]:hidden"
            >
              {events.map((event) => {
                const parts = dateParts(event.date);
                const href = `/servicios/eventos/${event.slug}`;

                return (
                  <li key={event.slug} className="w-[260px] shrink-0 snap-start sm:w-[300px]">
                    <Link href={href} className="group block">
                      <div className="relative overflow-hidden rounded-2xl">
                        <MediaFrame
                          src={event.cover}
                          alt={`Portada de ${event.title}`}
                          label={`Portada de ${event.title}`}
                          className="aspect-[320/380] w-full"
                          sizes="(min-width: 640px) 300px, 260px"
                        />
                        <div
                          aria-hidden="true"
                          className="from-primary-dark/90 via-primary-dark/20 absolute inset-0 bg-gradient-to-t to-transparent"
                        />
                        <Badge variant={event.kind} className="absolute top-3 left-3 shadow-sm">
                          {kindLabels[event.kind]}
                        </Badge>
                        <div className="bg-surface/95 text-primary-dark absolute top-3 right-3 rounded-xl px-3 py-2 text-center">
                          <span className="block text-xl leading-none font-extrabold">
                            {parts.day}
                          </span>
                          <span className="mt-1 block text-[10px] font-bold tracking-[0.18em] uppercase">
                            {parts.month}
                          </span>
                        </div>
                        <div className="absolute inset-x-4 bottom-4">
                          <p className="text-base leading-snug font-medium text-white">
                            {event.title}
                          </p>
                          <span className="mt-2 inline-flex items-center gap-1 border-b border-white/50 pb-0.5 text-[10px] font-bold tracking-[0.2em] text-white/85 uppercase">
                            {labels.more}
                            <IconArrowRight className="size-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {events.length > 1 ? (
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  {events.map((event, dotIndex) => (
                    <button
                      key={event.slug}
                      type="button"
                      onClick={() => goTo(dotIndex)}
                      aria-label={labels.slide
                        .replace("{current}", String(dotIndex + 1))
                        .replace("{total}", String(events.length))}
                      aria-current={dotIndex === index ? "true" : undefined}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        dotIndex === index
                          ? "bg-primary w-5"
                          : "bg-primary/20 hover:bg-primary/40 w-1.5",
                      )}
                    />
                  ))}
                </div>
                <Link
                  href={cta.href}
                  className="text-primary inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase sm:hidden"
                >
                  {cta.label}
                  <IconArrowRight className="size-3.5" />
                </Link>
              </div>
            ) : null}
          </>
        )}
      </Container>
    </section>
  );
}
