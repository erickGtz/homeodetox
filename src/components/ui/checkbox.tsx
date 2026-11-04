import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  label: ReactNode;
  name: string;
  error?: string;
} & Omit<ComponentProps<"input">, "name" | "id" | "type"> & { id?: string };

export function Checkbox({ label, name, error, className, id, ...props }: CheckboxProps) {
  const checkboxId = id ?? name;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          className={cn(
            "border-border text-primary accent-primary mt-1 size-5 shrink-0 rounded",
            className,
          )}
          {...props}
        />
        <label htmlFor={checkboxId} className="text-text text-sm leading-relaxed">
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${checkboxId}-error`} role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
