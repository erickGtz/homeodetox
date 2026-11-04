import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
} & Omit<ComponentProps<"select">, "name" | "id"> & { id?: string };

export function Select({
  label,
  name,
  options,
  placeholder,
  error,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? name;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={selectId}
        className="text-text text-xs font-semibold tracking-widest uppercase"
      >
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={cn(
          "border-border bg-surface text-text min-h-11 rounded-lg border px-4 py-2.5 text-base",
          error ? "border-red-600" : "focus:border-primary",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${selectId}-error`} role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
