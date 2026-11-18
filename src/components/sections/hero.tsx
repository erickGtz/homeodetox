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
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(127,164,91,0.35),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(124,153,146,0.45),transparent_50%)]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -right-20 size-[22rem] rounded-full border border-white/10 bg-white/5" />
        <div className="absolute top-1/3 -right-10 size-40 rounded-full border border-white/10" />
        <div className="absolute -bottom-24 -left-16 size-72 rounded-full border border-white/10 bg-white/5" />
      </div>

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
          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1 text-[11px] font-medium tracking-wide text-white/80"
              >
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
