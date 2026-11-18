"use client";

import { useRef, useState } from "react";
import { IconArrowRight, IconChevronLeft, IconChevronRight, IconPlay } from "@/components/ui/icons";
import { MediaFrame } from "@/components/ui/media-frame";
import type { TherapyLabels, TherapyTreatment } from "@/content/terapias";
import { cn } from "@/lib/utils";

type TreatmentCardProps = {
  treatment: TherapyTreatment;
  labels: TherapyLabels;
};

function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function TreatmentCard({ treatment, labels }: TreatmentCardProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const total = treatment.videos.length + 1;

  function goTo(nextIndex: number) {
    const track = trackRef.current;
    const slide = track?.children[nextIndex] as HTMLElement | undefined;

    if (!track || !slide) {
      return;
    }

    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setIndex(nextIndex);
    setPlayingId(null);
  }

  function handleScroll() {
    const track = trackRef.current;

    if (!track || track.clientWidth === 0) {
      return;
    }

    const current = Math.round(track.scrollLeft / track.clientWidth);
    const clamped = Math.min(Math.max(current, 0), total - 1);

    if (clamped !== index) {
      setIndex(clamped);
      setPlayingId(null);
    }
  }

  return (
    <article className="border-border bg-surface flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm">
      <div>
        {treatment.image ? (
          <MediaFrame
            src={treatment.image}
            alt={`Imagen de ${treatment.title}`}
            label={treatment.imageLabel}
            className="h-56 w-full sm:h-64"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="bg-primary/10 flex h-56 w-full items-center justify-center sm:h-64">
            <span className="text-primary/60 text-xs font-semibold tracking-[0.2em] uppercase">
              {labels.imagePlaceholder}
            </span>
          </div>
        )}

        <div className="bg-primary-dark px-5 py-4 text-center">
          <h3 className="text-lg leading-snug font-semibold text-white">{treatment.title}</h3>
        </div>
      </div>

      <div className="bg-primary text-on-primary flex flex-col">
        <ul
          ref={trackRef}
          onScroll={handleScroll}
          aria-label={treatment.title}
          className="relative flex h-[380px] snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overflow-y-hidden sm:h-[420px] lg:h-[460px] [&::-webkit-scrollbar]:hidden"
        >
          <li className="w-full min-w-full snap-start" aria-label={labels.infoLabel}>
            <div className="flex h-full w-full flex-col gap-4 overflow-y-auto overscroll-contain p-5 sm:p-6">
              {treatment.description ? (
                <p className="text-sm leading-[1.8] text-white/85">{treatment.description}</p>
              ) : null}

              {treatment.steps.length > 0 ? (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase">
                    {labels.steps}
                  </p>
                  <ol className="mt-3 flex flex-col gap-2 text-sm text-white/85">
                    {treatment.steps.map((step, stepIndex) => (
                      <li key={step} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-semibold"
                        >
                          {stepIndex + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              <p className="mt-auto flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                {labels.swipeHint}
                <IconArrowRight className="size-3.5" aria-hidden="true" />
              </p>
            </div>
          </li>

          {treatment.videos.map((video) => {
            const isPlaying = playingId === video.id && Boolean(video.driveFileId);

            return (
              <li key={video.id} className="w-full min-w-full snap-start" aria-label={video.title}>
                <div className="flex h-full w-full items-center justify-center p-4">
                  <div className="bg-primary-dark/70 relative aspect-[9/16] h-full max-w-full overflow-hidden rounded-2xl">
                    {isPlaying && video.driveFileId ? (
                      <iframe
                        src={drivePreviewUrl(video.driveFileId)}
                        title={video.title}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    ) : (
                      <button
                        type="button"
                        disabled={!video.driveFileId}
                        onClick={() => setPlayingId(video.id)}
                        className={cn(
                          "flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center transition-colors",
                          video.driveFileId
                            ? "hover:bg-white/10"
                            : "cursor-not-allowed border border-dashed border-white/25",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="flex size-12 items-center justify-center rounded-full bg-white/15 text-white"
                        >
                          <IconPlay className="size-5" />
                        </span>
                        <span className="text-sm font-medium text-white">{video.title}</span>
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
                          {video.driveFileId ? labels.videoPlay : labels.videoPending}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between gap-3 px-4 pb-4 sm:px-5">
          <p
            aria-live="polite"
            className="text-[11px] font-semibold tracking-[0.18em] text-white/60"
          >
            {labels.slideLabel
              .replace("{current}", String(index + 1))
              .replace("{total}", String(total))}
          </p>

          {total > 1 ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label={labels.previousSlide}
                className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 disabled:opacity-35 disabled:hover:bg-transparent"
              >
                <IconChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === total - 1}
                aria-label={labels.nextSlide}
                className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 disabled:opacity-35 disabled:hover:bg-transparent"
              >
                <IconChevronRight className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
