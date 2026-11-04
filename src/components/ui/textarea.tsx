import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
} & Omit<ComponentProps<"textarea">, "name" | "id"> & { id?: string };

export function Textarea({ label, name, error, hint, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? name;
  const describedBy = [error ? `${textareaId}-error` : null, hint ? `${textareaId}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={textareaId}
        className="text-text text-xs font-semibold tracking-widest uppercase"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        name={name}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          "border-border bg-surface text-text placeholder:text-text-muted/70 rounded-lg border px-4 py-3 text-base",
          error ? "border-red-600" : "focus:border-primary",
          className,
        )}
        {...props}
      />
      {hint ? (
        <p id={`${textareaId}-hint`} className="text-text-muted text-sm">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${textareaId}-error`} role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
