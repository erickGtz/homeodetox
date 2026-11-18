"use client";

import { useEffect, useRef } from "react";
import { VideoCarousel } from "@/components/sections/video-carousel";
import { IconPlay } from "@/components/ui/icons";
import { MediaFrame } from "@/components/ui/media-frame";
import type { TherapyLabels, TherapyTreatment } from "@/content/terapias";
import { cn } from "@/lib/utils";

type TreatmentCardProps = {
  treatment: TherapyTreatment;
  labels: TherapyLabels;
  isOpen: boolean;
  onOpen: (slug: string) => void;
  onClose: () => void;
};

export function TreatmentCard({ treatment, labels, isOpen, onOpen, onClose }: TreatmentCardProps) {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const backFaceRef = useRef<HTMLDivElement>(null);

  const videosPanelId = `treatment-${treatment.slug}-videos`;

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus({ preventScroll: true });
      return;
    }

    if (backFaceRef.current?.contains(document.activeElement)) {
      openButtonRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  return (
    <article className="h-full [perspective:1600px]">
      <div
        className={cn(
          "relative grid h-full transition-transform duration-500 [transform-style:preserve-3d]",
          isOpen && "[transform:rotateY(180deg)]",
        )}
      >
        <div
          inert={isOpen}
          aria-hidden={isOpen}
          className="bg-primary text-on-primary flex h-full flex-col overflow-hidden rounded-3xl shadow-lg [backface-visibility:hidden] [grid-area:1/1]"
        >
          <MediaFrame
            src={treatment.image}
            alt={`Imagen de ${treatment.title}`}
            label={treatment.imageLabel}
            className="aspect-[16/6] w-full"
            sizes="(min-width: 1280px) 380px, (min-width: 640px) 50vw, 100vw"
          />

          <div className="flex flex-1 flex-col gap-4 p-6">
            <h3 className="text-xl leading-snug font-semibold tracking-wide">{treatment.title}</h3>
            <p className="text-sm leading-[1.7] text-white/80">{treatment.description}</p>

            {treatment.steps.length > 0 ? (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
                  {labels.steps}
                </p>
                <ol className="mt-3 flex flex-col gap-2 text-sm text-white/85">
                  {treatment.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-semibold"
                      >
                        {index + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <button
              ref={openButtonRef}
              type="button"
              onClick={() => onOpen(treatment.slug)}
              aria-expanded={isOpen}
              aria-controls={videosPanelId}
              className="bg-secondary text-on-primary hover:bg-accent mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-[14px] px-6 py-2.5 text-sm font-semibold transition-colors"
            >
              <IconPlay className="size-4" />
              {labels.watchVideos}
            </button>
          </div>
        </div>

        <div
          ref={backFaceRef}
          id={videosPanelId}
          inert={!isOpen}
          aria-hidden={!isOpen}
          className="bg-primary-dark text-on-primary flex h-full [transform:rotateY(180deg)] flex-col gap-4 overflow-hidden rounded-3xl p-6 shadow-lg [backface-visibility:hidden] [grid-area:1/1]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
                {labels.videosTitle}
              </p>
              <h3 className="mt-1 text-lg leading-snug font-semibold">{treatment.title}</h3>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="min-h-9 rounded-lg border border-white/30 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-white/10"
            >
              {labels.backToCard}
            </button>
          </div>

          <VideoCarousel videos={treatment.videos} labels={labels} />
        </div>
      </div>
    </article>
  );
}
