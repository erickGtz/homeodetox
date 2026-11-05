import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  src?: string | null;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function MediaFrame({
  src,
  alt,
  label,
  className,
  sizes = "100vw",
  priority = false,
}: MediaFrameProps) {
  return (
    <div className={cn("bg-placeholder relative overflow-hidden", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${label}. Imagen pendiente.`}
          className="border-border/70 flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed p-6 text-center"
        >
          <span className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase">
            Imagen pendiente
          </span>
          <span className="text-text-muted text-sm">{label}</span>
        </div>
      )}
    </div>
  );
}
