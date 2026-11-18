import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  legend: string;
  name: string;
  options: RadioOption[];
  error?: string;
  value?: string;
  onValueChange?: (value: string) => void;
} & Omit<ComponentProps<"fieldset">, "name" | "value" | "onChange">;

export function RadioGroup({
  legend,
  name,
  options,
  error,
  value,
  onValueChange,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)} {...props}>
      <legend className="text-text text-xs font-semibold tracking-widest uppercase">
        {legend}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="border-border bg-surface flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-sm"
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value === undefined ? undefined : value === option.value}
                onChange={onValueChange ? () => onValueChange(option.value) : undefined}
                className="accent-primary size-4"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
