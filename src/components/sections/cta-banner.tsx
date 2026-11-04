import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type CtaBannerProps = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export function CtaBanner({ title, description, href, label }: CtaBannerProps) {
  return (
    <section className="bg-primary text-on-primary">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <h2 className="text-3xl font-semibold tracking-wide uppercase sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-base text-white/85">{description}</p>
          <Button href={href} variant="secondary" className="mt-8">
            {label}
          </Button>
        </div>
        <div
          aria-hidden="true"
          className="relative hidden aspect-square max-h-72 justify-self-end rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.35),transparent_60%)] lg:block lg:size-72"
        />
      </Container>
    </section>
  );
}
