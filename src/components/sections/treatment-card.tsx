"use client";

import {
  IconChevronLeft,
  IconChevronRight,
  IconPlay,
} from "@/components/ui/icons";

import { MediaFrame } from "@/components/ui/media-frame";

import type {
  TherapyActivity,
  TherapyActivityCode,
  TherapyLabels,
  TherapyTreatment,
} from "@/content/procedimientos";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

type TreatmentCardProps = {
  treatment: TherapyTreatment;
  activities: Record<TherapyActivityCode, TherapyActivity>;
  labels: TherapyLabels;
};

function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function driveImageUrl(fileId: string) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
}

export function TreatmentCard({
  treatment,
  activities,
  labels,
}: TreatmentCardProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const activeCode = treatment.steps[activeStep];

  const activeActivity = activeCode
    ? activities[activeCode]
    : undefined;

  const media = activeActivity?.media ?? [];

  const total = media.length;

  

  /**
   * Reinicia el carrusel cuando cambia la actividad.
   */


  /**
   * Navegación entre archivos multimedia.
   */
  function goTo(nextIndex: number) {
    const track = trackRef.current;

    if (!track || nextIndex < 0 || nextIndex >= total) {
      return;
    }

    const slide = track.children[nextIndex] as HTMLElement | undefined;

    if (!slide) {
      return;
    }

    track.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth",
    });

    setIndex(nextIndex);
    setPlayingId(null);
  }

  /**
   * Detecta el desplazamiento manual del carrusel.
   */
  function handleScroll() {
    const track = trackRef.current;

    if (!track || track.clientWidth === 0) {
      return;
    }

    const current = Math.round(
      track.scrollLeft / track.clientWidth,
    );

    const clamped = Math.min(
      Math.max(current, 0),
      total - 1,
    );

    if (clamped !== index) {
      setIndex(clamped);
      setPlayingId(null);
    }
  }

  /**
   * Cambia la actividad seleccionada.
   */
  function handleStepChange(stepIndex: number) {
  setActiveStep(stepIndex);
  setIndex(0);
  setPlayingId(null);

  trackRef.current?.scrollTo({
    left: 0,
    behavior: "auto",
  });
}

  return (
    <article className="border-border bg-surface flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm">

      {/* IMAGEN PRINCIPAL DEL TRATAMIENTO */}

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
          <h3 className="text-lg leading-snug font-semibold text-white">
            {treatment.title}
          </h3>
        </div>
      </div>

      {/* CONTENIDO DEL TRATAMIENTO */}

      <div className="bg-primary text-on-primary flex flex-1 flex-col">

        {/* DESCRIPCIÓN */}

        <div className="p-5 pb-3 sm:px-6">
          {treatment.description ? (
            <p className="text-sm leading-[1.8] text-white/85">
              {treatment.description}
            </p>
          ) : null}
        </div>

        {/* NAVEGACIÓN ENTRE ACTIVIDADES */}

        <div className="px-5 pt-3 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase">
            {labels.steps}
          </p>

          <div
            role="group"
            aria-label={labels.steps}
            className="mt-3 flex flex-wrap gap-2"
          >
            {treatment.steps.map((code, stepIndex) => {
              const activity = activities[code];

              const isActive = activeStep === stepIndex;

              return (
                <button
                  key={`${code}-${stepIndex}`}
                  type="button"
                  onClick={() => handleStepChange(stepIndex)}
                  aria-pressed={isActive}
                  title={activity.title}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl border text-xs font-bold transition-colors",
                    isActive
                      ? "border-white bg-white text-primary-dark shadow-sm"
                      : "border-white/25 bg-white/10 text-white hover:bg-white/20",
                  )}
                >
                  {code}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVIDAD SELECCIONADA */}

        {activeActivity ? (
          <div className="px-5 pt-5 sm:px-6">
            <h4 className="text-base font-semibold text-white">
              {activeActivity.title}
            </h4>

            {activeActivity.description ? (
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {activeActivity.description}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* CARRUSEL MULTIMEDIA */}

        <div className="mt-4">
          {total > 0 ? (
            <ul
              key={activeCode}
              ref={trackRef}
              onScroll={handleScroll}
              aria-label={activeActivity?.title ?? treatment.title}
              className="relative flex h-[530px] snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:h-[400px] lg:h-[640px]"
            >
              {media.map((item) => {
                const isPlaying =
                  playingId === item.id &&
                  Boolean(item.driveFileId);

                return (
                  <li
                    key={item.id}
                    className="w-full min-w-full snap-start"
                    aria-label={item.title}
                  >
                    <div className="flex h-full w-full items-center justify-center p-1">

                      <div className="bg-primary-dark/70 relative aspect-[4/5] w-[min(100%,280px)] shrink-0 overflow-hidden rounded-2xl sm:w-[315px]">
                        {/* VIDEO */}

                        {item.type === "video" ? (
                          isPlaying ? (
                            <iframe
  src={drivePreviewUrl(item.driveFileId)}
  title={item.title}
  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
  allowFullScreen
  loading="eager"
  referrerPolicy="strict-origin-when-cross-origin"
  className="absolute inset-0 h-full w-full border-0"
/>
                          ) : (
                            <button
                              type="button"
                              disabled={!item.driveFileId}
                              onClick={() => setPlayingId(item.id)}
                              className={cn(
                                "flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center transition-colors",
                                item.driveFileId
                                  ? "hover:bg-white/10"
                                  : "cursor-not-allowed border border-dashed border-white/25",
                              )}
                            >
                              <span className="flex size-12 items-center justify-center rounded-full bg-white/15 text-white">
                                <IconPlay className="size-5" />
                              </span>

                              <span className="text-sm font-medium text-white">
                                {item.title}
                              </span>

                              <span className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
                                {item.driveFileId
                                  ? labels.videoPlay
                                  : labels.videoPending}
                              </span>
                            </button>
                          )
                        ) : (
                          /* IMAGEN */

                          item.driveFileId ? (
                            <Image
  src={driveImageUrl(item.driveFileId)}
  alt={item.title}
  fill
  unoptimized
  sizes="(max-width: 768px) 100vw, 400px"
  className="object-contain"
/>
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center gap-3 border border-dashed border-white/25 px-4 text-center">
                              <span className="text-sm text-white">
                                {item.title}
                              </span>

                              <span className="text-[11px] text-white/60">
                                {labels.videoPending}
                              </span>
                            </div>
                          )
                        )}

                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex h-[280px] flex-col items-center justify-center gap-3 px-6 text-center sm:h-[320px]">
              <span className="flex size-14 items-center justify-center rounded-full bg-white/10">
                <IconPlay className="size-6 text-white/70" />
              </span>

              <p className="text-sm font-medium text-white">
                {labels.videoPending}
              </p>

              <p className="max-w-xs text-xs leading-relaxed text-white/60">
                Todavía no hay imágenes ni videos disponibles para esta actividad.
              </p>
            </div>
          )}
        </div>

        {/* CONTROLES DEL CARRUSEL */}

        <div className="mt-auto flex items-center justify-between gap-3 px-4 pb-4 pt-2 sm:px-5">

          <p
            aria-live="polite"
            className="text-[11px] font-semibold tracking-[0.18em] text-white/60"
          >
            {total > 0
              ? labels.slideLabel
                  .replace("{current}", String(index + 1))
                  .replace("{total}", String(total))
              : "0 diapositivas"}
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