
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

/* =========================================
   TARJETA DE SELECCIÓN
========================================= */

type TreatmentCardProps = {
  treatment: TherapyTreatment;
  onSelect: () => void;
};

export function TreatmentCard({
  treatment,
  onSelect,
}: TreatmentCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="border-border bg-surface group flex h-full flex-col overflow-hidden rounded-3xl border text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
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
            Procedimiento
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-primary-dark text-xl font-semibold">
          {treatment.title}
        </h3>

        {treatment.description ? (
          <p className="text-text-muted mt-3 text-sm leading-relaxed">
            {treatment.description}
          </p>
        ) : null}

        <span className="text-primary mt-5 text-sm font-semibold transition-colors group-hover:underline">
          Ver procedimiento →
        </span>
      </div>
    </button>
  );
}

/* =========================================
   DETALLE DEL TRATAMIENTO
========================================= */

type TreatmentDetailProps = {
  treatment: TherapyTreatment;
  activities: Record<TherapyActivityCode, TherapyActivity>;
  labels: TherapyLabels;
  onBack: () => void;
};

function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function driveImageUrl(fileId: string) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
}

export function TreatmentDetail({
  treatment,
  activities,
  labels,
  onBack,
}: TreatmentDetailProps) {
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

  /* NAVEGACIÓN DEL CARRUSEL */

  function goTo(nextIndex: number) {
    const track = trackRef.current;

    if (!track || nextIndex < 0 || nextIndex >= total) {
      return;
    }

    const slide = track.children[nextIndex] as HTMLElement | undefined;

    if (!slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth",
    });

    setIndex(nextIndex);
    setPlayingId(null);
  }

  function handleScroll() {
    const track = trackRef.current;

    if (!track || track.clientWidth === 0 || total === 0) {
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

  /* CAMBIO DE ACTIVIDAD */

  function handleStepChange(stepIndex: number) {
    setActiveStep(stepIndex);
    setIndex(0);
    setPlayingId(null);
  }

  return (
    <section className="border-border bg-surface overflow-hidden rounded-3xl border shadow-sm">

      {/* VOLVER AL CATÁLOGO */}

      <div className="border-border border-b px-5 py-4 sm:px-7">
        <button
          type="button"
          onClick={onBack}
          className="text-primary-dark flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
        >
          <IconChevronLeft className="size-4" />
          Volver a procedimientos
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL */}

      <div className="grid items-start gap-8 p-4 sm:p-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10 lg:p-9">

        {/* COLUMNA IZQUIERDA: CARRUSEL */}

        <div className="min-w-0">

          <div className="mb-5">
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
              Galería del procedimiento
            </p>

            <h2 className="text-primary-dark mt-2 text-2xl font-semibold sm:text-3xl">
              {treatment.title}
            </h2>
          </div>

          <div className="bg-primary-dark relative overflow-hidden rounded-2xl">

            {total > 0 ? (
              <ul
                key={`${treatment.slug}-${activeCode}`}
                ref={trackRef}
                onScroll={handleScroll}
                aria-label={activeActivity?.title ?? treatment.title}
                className="relative flex aspect-video w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {media.map((item) => {
                  const isPlaying =
                    playingId === item.id &&
                    Boolean(item.driveFileId);

                  return (
                    <li
                      key={item.id}
                      className="h-full w-full min-w-full snap-start"
                      aria-label={item.title}
                    >
                      <div className="relative flex h-full w-full items-center justify-center">

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
                                "flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center transition-colors",
                                item.driveFileId
                                  ? "hover:bg-white/10"
                                  : "cursor-not-allowed",
                              )}
                            >
                              <span className="flex size-16 items-center justify-center rounded-full bg-white/15 text-white">
                                <IconPlay className="size-7" />
                              </span>

                              <span className="text-base font-medium text-white sm:text-lg">
                                {item.title}
                              </span>

                              <span className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                                {item.driveFileId
                                  ? labels.videoPlay
                                  : labels.videoPending}
                              </span>
                            </button>
                          )
                        ) : (
                          /* IMAGEN */

                          item.driveFileId ? (
                            <div className="absolute inset-0">
                              <Image
                                src={driveImageUrl(item.driveFileId)}
                                alt={item.title}
                                fill
                                unoptimized
                                sizes="(max-width: 1024px) 100vw, 65vw"
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
                              <span className="text-sm text-white">
                                {item.title}
                              </span>

                              <span className="text-xs text-white/60">
                                {labels.videoPending}
                              </span>
                            </div>
                          )
                        )}

                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-white/10">
                  <IconPlay className="size-7 text-white/70" />
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

          <div className="mt-4 flex items-center justify-between gap-3">

            <p
              aria-live="polite"
              className="text-text-muted text-xs font-semibold tracking-wide"
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
                  className="border-border text-primary-dark flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-primary/10 disabled:opacity-35"
                >
                  <IconChevronLeft className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  disabled={index === total - 1}
                  aria-label={labels.nextSlide}
                  className="border-border text-primary-dark flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-primary/10 disabled:opacity-35"
                >
                  <IconChevronRight className="size-4" />
                </button>
              </div>
            ) : null}
          </div>

          {/* ACTIVIDAD ACTUAL */}

          {activeActivity ? (
            <div className="border-border mt-6 border-t pt-5">
              <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                Actividad seleccionada
              </p>

              <h3 className="text-primary-dark mt-2 text-lg font-semibold">
                {activeActivity.title}
              </h3>

              {activeActivity.description ? (
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  {activeActivity.description}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* COLUMNA DERECHA: INFORMACIÓN Y ETAPAS */}

        <div className="flex min-w-0 flex-col gap-6">

          {/* DESCRIPCIÓN */}

          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
              Conoce el procedimiento
            </p>

            <h3 className="text-primary-dark mt-3 text-xl font-semibold">
              {treatment.title}
            </h3>

            {treatment.description ? (
              <p className="text-text-muted mt-3 text-sm leading-[1.9]">
                {treatment.description}
              </p>
            ) : null}
          </div>

          <div className="border-border border-t" />

          {/* ETAPAS DEL PROCEDIMIENTO */}

          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              {labels.steps}
            </p>

            <p className="text-text-muted mt-2 text-sm">
              Selecciona una actividad para consultar sus imágenes y videos.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {treatment.steps.map((code, stepIndex) => {
                const activity = activities[code];
                const isActive = activeStep === stepIndex;

                return (
                  <button
                    key={`${code}-${stepIndex}`}
                    type="button"
                    onClick={() => handleStepChange(stepIndex)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                      isActive
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                        isActive
                          ? "bg-primary text-on-primary"
                          : "bg-primary/10 text-primary-dark",
                      )}
                    >
                      {stepIndex + 1}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block text-sm font-semibold",
                          isActive
                            ? "text-primary-dark"
                            : "text-text",
                        )}
                      >
                        {activity?.title ?? code}
                      </span>

                      <span className="text-text-muted mt-1 block text-xs">
                        {activity?.media?.length ?? 0} archivos multimedia
                      </span>
                    </span>

                    <IconChevronRight
                      className={cn(
                        "size-4 shrink-0",
                        isActive ? "text-primary" : "text-text-muted",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* INDICADOR DE PROGRESO */}

          <div className="border-border mt-auto border-t pt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted text-xs font-semibold">
                Etapa {activeStep + 1} de {treatment.steps.length}
              </span>

              <span className="text-primary text-xs font-semibold">
                {activeActivity?.title ?? ""}
              </span>
            </div>

            <div className="mt-3 flex gap-1.5">
              {treatment.steps.map((_, stepIndex) => (
                <div
                  key={stepIndex}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    stepIndex <= activeStep
                      ? "bg-primary"
                      : "bg-border",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
