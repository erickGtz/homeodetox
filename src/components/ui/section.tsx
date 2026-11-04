import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "surface" | "primary" | "accent";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  id?: string;
};

const toneClasses: Record<SectionTone, string> = {
  default: "bg-bg text-text",
  surface: "bg-surface text-text",
  primary: "bg-primary text-on-primary",
  accent: "bg-accent text-on-primary",
};

export function Section({ children, className, tone = "default", id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", toneClasses[tone], className)}>
      {children}
    </section>
  );
}
