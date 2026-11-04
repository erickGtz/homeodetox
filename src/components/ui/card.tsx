import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-card border-border bg-surface border p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}
