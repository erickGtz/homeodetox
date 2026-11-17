import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { eventosIndexContent } from "@/content/events";
import { getEventBySlug } from "@/lib/content/loader";
import { eventJsonLd } from "@/lib/seo";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

type EventDetailsProps = {
  params: Promise<{ slug: string }>;
};

export async function EventDetails({ params }: EventDetailsProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const { content } = await compileMDX({ source: event.content });
  const { instructorLabel, labels, availabilityCta, availabilityMessage } =
    eventosIndexContent.detail;
  const initials = siteConfig.doctor.name
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
            eventJsonLd({
              name: event.title,
              description: event.seo.description,
              startDate: event.date,
              location: event.location,
              path: `/servicios/eventos/${event.slug}`,
              image: event.cover,
            }),
          ),
        }}
      />

      <article className="bg-bg">
        <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: eventosIndexContent.breadcrumbs.section },
              { label: eventosIndexContent.breadcrumbs.current, href: "/servicios/eventos" },
              { label: event.title },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,374px)_minmax(0,1fr)] lg:gap-14">
            <MediaFrame
              src={event.cover}
              alt={`Portada de ${event.title}`}
              label={`Portada de ${event.title}`}
              className="rounded-card aspect-[374/526] lg:sticky lg:top-28"
              sizes="(min-width: 1024px) 374px, 100vw"
              priority
            />

            <div className="flex max-w-2xl flex-col">
              <h1 className="text-text text-[28px] leading-[1.375] font-semibold">{event.title}</h1>

              <div className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="bg-primary-dark text-on-primary flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                >
                  {initials}
                </span>
                <p className="text-sm">
                  <span className="text-text-muted">{instructorLabel} </span>
                  <span className="text-primary font-medium">{siteConfig.doctor.name}</span>
                </p>
              </div>

              <hr className="border-border mt-6" />

              <div className="prose prose-neutral prose-headings:text-primary-dark prose-p:text-text-muted prose-p:text-base prose-p:leading-[1.85] prose-p:font-light prose-a:text-primary prose-strong:text-text mt-6 max-w-none">
                {content}
              </div>

              <dl className="text-text-muted mt-8 flex flex-col gap-2 text-sm leading-[1.85] font-light">
                <div className="flex flex-wrap gap-1.5">
                  <dt className="text-text-body font-medium">{labels.date}:</dt>
                  <dd>
                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <dt className="text-text-body font-medium">{labels.location}:</dt>
                  <dd>{event.location}</dd>
                </div>
                {event.schedule ? (
                  <div className="flex flex-wrap gap-1.5">
                    <dt className="text-text-body font-medium">{labels.schedule}:</dt>
                    <dd>{event.schedule}</dd>
                  </div>
                ) : null}
                {event.cost ? (
                  <div className="flex flex-wrap gap-1.5">
                    <dt className="text-text-body font-medium">{labels.cost}:</dt>
                    <dd>{event.cost}</dd>
                  </div>
                ) : null}
                {event.courtesies ? (
                  <div className="flex flex-wrap gap-1.5">
                    <dt className="text-text-body font-medium">{labels.courtesies}:</dt>
                    <dd>{event.courtesies}</dd>
                  </div>
                ) : null}
              </dl>

              <a
                href={getWhatsAppLink(availabilityMessage(event.title))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "secondary", className: "mt-8 self-start" })}
              >
                {availabilityCta}
              </a>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
