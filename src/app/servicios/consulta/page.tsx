import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/booking-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DoctorCard } from "@/components/sections/doctor-card";
import { Container } from "@/components/ui/container";
import { consultaContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: consultaContent.seo.title,
  description: consultaContent.seo.description,
  path: "/servicios/consulta",
});

export default function ConsultaPage() {
  const { breadcrumbs, heading, intro, doctor, booking } = consultaContent;

  return (
    <section className="bg-bg">
      <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <h2 className="text-primary-dark mt-5 text-3xl font-normal tracking-tight sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          <p className="text-primary max-w-md text-3xl leading-snug font-extralight sm:text-4xl">
            {intro.title}
          </p>
          <p className="text-text-body max-w-xl text-base leading-[1.85] font-light">
            {intro.body}
          </p>
        </div>

        <div className="border-border bg-surface mt-10 overflow-hidden rounded-3xl border shadow-sm">
          <DoctorCard
            eyebrow={doctor.eyebrow}
            name={siteConfig.doctor.name}
            description={doctor.description}
            photoLabel={doctor.photoLabel}
            address={siteConfig.contact.address}
            schedule={siteConfig.schedule}
            phone={siteConfig.contact.phone}
            phoneHref={siteConfig.contact.phoneHref}
          />
          <div className="border-border border-t p-6 sm:p-8 lg:p-10">
            <BookingForm copy={booking} />
          </div>
        </div>
      </Container>
    </section>
  );
}
