import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/booking-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/sections/page-hero";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconClock, IconMap, IconPhone } from "@/components/ui/icons";
import { agendarContent } from "@/content/agendar";
import { consultaContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: agendarContent.seo.title,
  description: agendarContent.seo.description,
  path: "/agendar",
});

export default function AgendarPage() {
  const { breadcrumbs, heading, intro, sidebarTitle, whatsappLabel, whatsappMessage } =
    agendarContent;

  return (
    <>
      <PageHero title={heading} tone="light" align="center" titleVariant="page" />

      <section className="bg-bg">
        <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
          <Breadcrumbs items={breadcrumbs} />

          <h2 className="text-primary-dark mt-5 text-3xl font-normal tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="text-text-body mt-4 max-w-2xl text-base leading-[1.85] font-light">
            {intro}
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
            <aside className="border-border bg-surface rounded-3xl border p-6 shadow-sm">
              <h3 className="text-primary-dark text-lg font-semibold">{sidebarTitle}</h3>
              <ul className="text-text-muted mt-5 flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <IconMap className="text-primary mt-0.5 size-5 shrink-0" />
                  <span>{siteConfig.contact.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconClock className="text-primary mt-0.5 size-5 shrink-0" />
                  <span>{siteConfig.schedule}</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconPhone className="text-primary mt-0.5 size-5 shrink-0" />
                  <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-primary">
                    {siteConfig.contact.phone}
                  </a>
                </li>
              </ul>

              <p className="text-text-muted mt-6 text-xs">{agendarContent.contactLabel}</p>
              <a
                href={getWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "secondary", className: "mt-2 w-full" })}
              >
                {whatsappLabel}
              </a>
            </aside>

            <div className="border-border bg-surface rounded-3xl border p-6 shadow-sm sm:p-8">
              <BookingForm copy={consultaContent.booking} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
