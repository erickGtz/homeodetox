"use client";

import { useState } from "react";
import { TreatmentCard } from "@/components/sections/treatment-card";
import type {
  TherapyLabels,
  TherapyRegion,
  TherapyRegionId,
  TherapyTreatment,
} from "@/content/terapias";
import { cn } from "@/lib/utils";

type TherapyGalleryProps = {
  regions: TherapyRegion[];
  treatments: TherapyTreatment[];
  labels: TherapyLabels;
};

export function TherapyGallery({ regions, treatments, labels }: TherapyGalleryProps) {
  const [activeRegionId, setActiveRegionId] = useState<TherapyRegionId | undefined>(regions[0]?.id);

  const activeRegion = regions.find((region) => region.id === activeRegionId) ?? regions[0];
  const visibleTreatments = treatments.filter(
    (treatment) => treatment.regionId === activeRegion?.id,
  );

  return (
    <div>
      <div role="group" aria-label={labels.regionNav} className="flex flex-wrap items-start gap-2">
        {regions.map((region) => {
          const isActive = region.id === activeRegion?.id;

          return (
            <button
              key={region.id}
              type="button"
              onClick={() => setActiveRegionId(region.id)}
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
        <p aria-live="polite" className="text-text-muted mt-4 max-w-2xl text-sm font-light">
          {activeRegion.summary}
        </p>
      ) : null}

      <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2">
        {visibleTreatments.map((treatment) => (
          <TreatmentCard
            key={`${activeRegion?.id}-${treatment.slug}`}
            treatment={treatment}
            labels={labels}
          />
        ))}
      </div>
    </div>
  );
}
