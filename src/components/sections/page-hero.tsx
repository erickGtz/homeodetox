import Image from "next/image";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: {
    src: string;
    alt: string;
  };
  tone?: "dark" | "light";
  align?: "left" | "center";
  titleVariant?: "display" | "page";
  className?: string;
};

export function PageHero({
  title,
  breadcrumbs,
  image,
  tone = "dark",
  align = "left",
  titleVariant = "display",
  className,
}: PageHeroProps) {
  const isLight = tone === "light";
  const isCentered = align === "center";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        isLight ? "bg-bg text-primary-dark" : "bg-primary-dark text-on-primary",
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={cn("object-cover", isLight ? "opacity-100" : "opacity-35")}
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            isLight
              ? "bg-[radial-gradient(circle_at_20%_20%,rgba(124,153,146,0.22),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(127,164,91,0.18),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_25%_20%,rgba(127,164,91,0.35),transparent_55%)]",
          )}
        />
      )}
      {isLight && image ? <div aria-hidden="true" className="bg-bg/55 absolute inset-0" /> : null}
      <Container
        className={cn(
          "relative",
          isCentered
            ? "flex min-h-[320px] flex-col items-center justify-center py-20 text-center sm:min-h-[393px] sm:py-24"
            : "py-16 sm:py-24",
        )}
      >
        {breadcrumbs ? (
          <Breadcrumbs
            items={breadcrumbs}
            className={cn(
              "mb-8",
              isLight
                ? "[&_a]:text-primary/70 [&_ol]:text-primary/70"
                : "[&_a]:text-white/70 [&_ol]:text-white/70",
            )}
          />
        ) : null}
        <h1
          className={cn(
            isCentered ? "mx-auto max-w-4xl" : "max-w-4xl",
            titleVariant === "page"
              ? "font-sans text-4xl font-bold tracking-[0.02em] uppercase sm:text-5xl lg:text-6xl"
              : "font-display text-4xl font-semibold tracking-tight sm:text-5xl",
          )}
        >
          {title}
        </h1>
      </Container>
    </section>
  );
}
