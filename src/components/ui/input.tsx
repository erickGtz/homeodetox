import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
} & Omit<ComponentProps<"input">, "name" | "id"> & { id?: string };

export function Input({ label, name, error, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? name;
  const describedBy = [error ? `${inputId}-error` : null, hint ? `${inputId}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-text text-xs font-semibold tracking-widest uppercase"
      >
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          "border-border bg-surface text-text placeholder:text-text-muted/70 min-h-11 rounded-lg border px-4 py-2.5 text-base",
          error ? "border-red-600" : "focus:border-primary",
          className,
        )}
        {...props}
      />
      {hint ? (
        <p id={`${inputId}-hint`} className="text-text-muted text-sm">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
