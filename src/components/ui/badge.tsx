import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "post" | "video" | "curso" | "taller" | "seminario";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary text-on-primary",
  post: "bg-primary text-on-primary",
  video: "bg-primary-dark text-on-primary",
  curso: "bg-accent text-on-primary",
  taller: "bg-secondary text-on-primary",
  seminario: "bg-primary text-on-primary",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-widest uppercase",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
