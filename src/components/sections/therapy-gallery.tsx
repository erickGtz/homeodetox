
"use client";

import { TreatmentCard, TreatmentDetail } from "@/components/sections/treatment-card";
import type {
  TherapyActivity,
  TherapyActivityCode,
  TherapyLabels,
  TherapyRegion,
  TherapyRegionId,
  TherapyTreatment,
} from "@/content/procedimientos";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TherapyGalleryProps = {
  regions: TherapyRegion[];
  treatments: TherapyTreatment[];
  activities: Record<TherapyActivityCode, TherapyActivity>;
  labels: TherapyLabels;
};

export function TherapyGallery({
  regions,
  treatments,
  activities,
  labels,
}: TherapyGalleryProps) {
  const [activeRegionId, setActiveRegionId] = useState<
    TherapyRegionId | undefined
  >(regions[0]?.id);

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const activeRegion =
    regions.find((region) => region.id === activeRegionId) ?? regions[0];

  const visibleTreatments = treatments.filter(
    (treatment) => treatment.regionId === activeRegion?.id,
  );

  const selectedTreatment = visibleTreatments.find(
    (treatment) => treatment.slug === selectedSlug,
  );

  function handleRegionChange(regionId: TherapyRegionId) {
    setActiveRegionId(regionId);
    setSelectedSlug(null);
  }

  return (
    <div>
      {/* NAVEGACIÓN POR REGIONES */}

      <div
        role="group"
        aria-label={labels.regionNav}
        className="flex flex-wrap items-start gap-2"
      >
        {regions.map((region) => {
          const isActive = region.id === activeRegion?.id;

          return (
            <button
              key={region.id}
              type="button"
              onClick={() => handleRegionChange(region.id)}
              aria-pressed={isActive}
              className={cn(
                "min-h-11 rounded-full px-6 text-sm font-semibold tracking-wide transition-colors",
                isActive
                  ? "bg-primary text-on-primary shadow-sm"
                  : "border-border bg-surface text-primary-dark hover:border-primary/40 hover:bg-bg border",
              )}
            >
              {region.label}
            </button>
          );
        })}
      </div>

      {activeRegion ? (
        <p
          aria-live="polite"
          className="text-text-muted mt-4 max-w-2xl text-sm font-light"
        >
          {activeRegion.summary}
        </p>
      ) : null}

      {/* CATÁLOGO DE TRATAMIENTOS */}

      {!selectedTreatment ? (
        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2">
          {visibleTreatments.map((treatment) => (
            <TreatmentCard
              key={`${activeRegion?.id}-${treatment.slug}`}
              treatment={treatment}
              onSelect={() => setSelectedSlug(treatment.slug)}
            />
          ))}
        </div>
      ) : (
        /* DETALLE DEL TRATAMIENTO */

        <div className="mt-8">
          <TreatmentDetail
            treatment={selectedTreatment}
            activities={activities}
            labels={labels}
            onBack={() => setSelectedSlug(null)}
          />
        </div>
      )}
    </div>
  );
}
