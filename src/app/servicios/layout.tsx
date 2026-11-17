import type { ReactNode } from "react";
import { ServicesTabs } from "@/components/layout/services-tabs";
import { PageHero } from "@/components/sections/page-hero";
import { servicesHero, servicesTabs } from "@/content/services";

type ServiciosLayoutProps = {
  children: ReactNode;
};

export default function ServiciosLayout({ children }: ServiciosLayoutProps) {
  return (
    <>
      <PageHero
        title={servicesHero.title}
        tone="light"
        align="center"
        titleVariant="page"
        titleClassName="tracking-[0.08em]"
      />
      <ServicesTabs tabs={servicesTabs} />
      {children}
    </>
  );
}
