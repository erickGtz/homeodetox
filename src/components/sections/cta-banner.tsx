import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type CtaBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  label: string;
};

export function CtaBanner({ eyebrow, title, description, href, label }: CtaBannerProps) {
  return (
    <section className="bg-primary text-on-primary relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-10 size-64 rounded-full bg-[rgba(0,46,71,0.42)]" />
        <div className="absolute top-6 right-48 size-40 rounded-full border border-white/15 bg-[rgba(26,69,82,0.45)]" />
        <div className="absolute right-24 -bottom-20 size-72 rounded-full border border-white/10" />
      </div>

      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <div>
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.3em] text-white/70 uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-wide uppercase sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">{description}</p>
          <Button href={href} variant="secondary" className="mt-8">
            {label}
          </Button>
        </div>
        <div
          aria-hidden="true"
          className="relative hidden aspect-square max-h-72 justify-self-end lg:block lg:size-72"
        >
          <div className="absolute inset-0 rounded-full border border-white/20 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute inset-12 rounded-full border border-white/15" />
        </div>
      </Container>
    </section>
  );
}
