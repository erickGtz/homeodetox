import { EventCard } from "@/components/sections/event-card";
import type { Event } from "@/lib/content/schemas";

type EventGroupProps = {
  id: string;
  title: string;
  events: Event[];
};

export function EventGroup({ id, title, events }: EventGroupProps) {
  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="text-primary-dark text-2xl font-normal">
        {title}
      </h3>
      <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}
