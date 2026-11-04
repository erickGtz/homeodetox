import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-dark",
  secondary: "bg-secondary text-on-primary hover:bg-primary",
  outline: "border border-primary text-primary hover:bg-primary hover:text-on-primary",
  ghost: "text-primary hover:bg-primary/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-widest uppercase transition-colors disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = buttonClasses({ variant, size, className });

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
