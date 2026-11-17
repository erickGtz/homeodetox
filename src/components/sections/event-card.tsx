import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";
import { MediaFrame } from "@/components/ui/media-frame";
import type { Event } from "@/lib/content/schemas";
import { formatDate } from "@/lib/utils";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const href = `/servicios/eventos/${event.slug}`;

  return (
    <article>
      <div className="relative">
        <MediaFrame
          src={event.cover}
          alt={`Portada de ${event.title}`}
          label={`Portada de ${event.title}`}
          className="rounded-card aspect-[299/269]"
          sizes="(min-width: 1024px) 299px, (min-width: 640px) 50vw, 100vw"
        />
        {event.duration ? (
          <span className="absolute right-2 bottom-2 rounded bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
            {event.duration}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5 px-0.5 pt-3">
        <h4 className="text-text text-xl leading-snug font-medium">
          <Link href={href} className="hover:text-primary transition-colors">
            {event.title}
          </Link>
        </h4>
        <time dateTime={event.date} className="text-primary text-base">
          {formatDate(event.date)}
        </time>
        <p className="text-text-muted line-clamp-2 text-[13px] leading-snug font-light">
          {event.location}
        </p>
        <Link
          href={href}
          className="text-primary mt-1 inline-flex items-center gap-1 text-[13px] font-medium"
        >
          Detalles
          <IconArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
