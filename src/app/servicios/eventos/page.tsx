import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EventGroup } from "@/components/sections/event-group";
import { Container } from "@/components/ui/container";
import { eventosIndexContent } from "@/content/events";
import { getEvents } from "@/lib/content/loader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: eventosIndexContent.seo.title,
  description: eventosIndexContent.seo.description,
  path: "/servicios/eventos",
});

export default function EventosPage() {
  const events = getEvents();
  const courses = events.filter((event) => event.kind === "curso" || event.kind === "seminario");
  const workshops = events.filter((event) => event.kind === "taller");

  return (
    <section className="bg-surface">
      <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
        <Breadcrumbs
          items={[
            { label: eventosIndexContent.breadcrumbs.section },
            { label: eventosIndexContent.breadcrumbs.current },
          ]}
        />
        <h2 className="text-primary-dark mt-5 text-3xl font-normal tracking-tight sm:text-4xl">
          {eventosIndexContent.heading}
        </h2>

        {events.length === 0 ? (
          <p className="text-text-muted mt-10 text-base font-light">{eventosIndexContent.empty}</p>
        ) : (
          <div className="mt-12 flex flex-col gap-16">
            {courses.length > 0 ? (
              <EventGroup id="cursos" title={eventosIndexContent.groups.courses} events={courses} />
            ) : null}
            {workshops.length > 0 ? (
              <EventGroup
                id="talleres"
                title={eventosIndexContent.groups.workshops}
                events={workshops}
              />
            ) : null}
          </div>
        )}
      </Container>
    </section>
  );
}
