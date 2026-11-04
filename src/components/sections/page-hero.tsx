import Image from "next/image";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: {
    src: string;
    alt: string;
  };
};

export function PageHero({ title, breadcrumbs, image }: PageHeroProps) {
  return (
    <section className="bg-primary-dark text-on-primary relative isolate overflow-hidden">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(127,164,91,0.35),transparent_55%)]"
        />
      )}
      <Container className="relative py-16 sm:py-24">
        {breadcrumbs ? (
          <Breadcrumbs
            items={breadcrumbs}
            className="mb-8 [&_a]:text-white/70 [&_ol]:text-white/70"
          />
        ) : null}
        <h1 className="font-display max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
      </Container>
    </section>
  );
}
