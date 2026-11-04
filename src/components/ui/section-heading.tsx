import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  variant?: "default" | "display";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-secondary text-xs font-semibold tracking-[0.3em] uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-2xl font-semibold tracking-wide sm:text-3xl",
          variant === "display" ? "font-display text-4xl italic sm:text-5xl" : "uppercase",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="text-text-muted max-w-2xl text-base sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
