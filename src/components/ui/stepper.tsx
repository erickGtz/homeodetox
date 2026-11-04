import { cn } from "@/lib/utils";

type StepperProps = {
  steps: string[];
  current: number;
  className?: string;
};

export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol className={cn("flex flex-col gap-2", className)} aria-label="Progreso del formulario">
      {steps.map((step, index) => {
        const isCurrent = index === current;
        const isComplete = index < current;

        return (
          <li
            key={step}
            aria-current={isCurrent ? "step" : undefined}
            className="flex items-center gap-3 text-sm"
          >
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-full border text-xs font-semibold",
                isCurrent && "border-primary bg-primary text-on-primary",
                isComplete && "border-primary text-primary",
                !isCurrent && !isComplete && "border-border text-text-muted",
              )}
            >
              {index + 1}
            </span>
            <span className={cn(isCurrent ? "text-text font-semibold" : "text-text-muted")}>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
