import { cn } from "@/lib/utils";

type FormProgressProps = {
  current: number;
  total: number;
  title: string;
  className?: string;
};

export function FormProgress({ current, total, title, className }: FormProgressProps) {
  const stepNumber = current + 1;
  const percent = Math.round((stepNumber / total) * 100);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="text-text-muted text-sm">
        {stepNumber} de {total}
      </p>
      <h2 className="text-primary-dark text-xl font-bold sm:text-2xl">{title}</h2>
      <div
        role="progressbar"
        aria-valuenow={stepNumber}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Paso ${stepNumber} de ${total}`}
        className="bg-border h-1 w-full overflow-hidden rounded-full"
      >
        <div
          className="bg-primary-dark h-full rounded-full transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
