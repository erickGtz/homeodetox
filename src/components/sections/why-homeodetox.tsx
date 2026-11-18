import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeValue } from "@/content/home";

type WhyHomeoDetoxProps = {
  eyebrow?: string;
  title: string;
  body: string;
  values: HomeValue[];
  imageLabel: string;
  image?: string | null;
  cta?: {
    label: string;
    href: string;
  };
};

export function WhyHomeoDetox({
  eyebrow,
  title,
  body,
  values,
  imageLabel,
  image,
  cta,
}: WhyHomeoDetoxProps) {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <MediaFrame
          src={image}
          alt={imageLabel}
          label={imageLabel}
          className="rounded-card aspect-[476/317] w-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />

        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            align="left"
            variant="display"
            className="mb-6"
          />
          <p className="text-text-body text-base leading-[1.85] font-light">{body}</p>

          <ul className="mt-8 flex flex-col gap-5">
            {values.map((value) => (
              <li key={value.title} className="flex gap-3">
                <span aria-hidden="true" className="bg-accent mt-2 size-2 shrink-0 rounded-full" />
                <div>
                  <h3 className="text-primary-dark text-base font-semibold">{value.title}</h3>
                  <p className="text-text-muted mt-1 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {cta ? (
            <Button href={cta.href} variant="outline" className="mt-8">
              {cta.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
