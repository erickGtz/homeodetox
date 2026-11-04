import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: {
    src: string;
    alt: string;
  };
  actions?: HeroAction[];
  highlights?: string[];
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  actions = [],
  highlights = [],
}: HeroProps) {
  return (
    <section className="bg-primary-dark text-on-primary relative isolate overflow-hidden">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(127,164,91,0.35),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(124,153,146,0.45),transparent_50%)]"
        />
      )}

      <Container className="relative flex min-h-[520px] flex-col items-center justify-center py-20 text-center">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.3em] text-white/80 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">{subtitle}</p>
        ) : null}
        {actions.length > 0 ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {actions.map((action) => (
              <Button key={action.href} href={action.href} variant={action.variant ?? "primary"}>
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
        {highlights.length > 0 ? (
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-[0.2em] text-white/70 uppercase">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
