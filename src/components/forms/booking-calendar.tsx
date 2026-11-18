"use client";

import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/icons";
import type { ConsultaBookingContent } from "@/content/services";
import {
  addMonths,
  formatLongDate,
  formatMonthLabel,
  getMonthDays,
  isBeforeDay,
  isWeekend,
  parseISODate,
  startOfDay,
  startOfMonth,
  toISODate,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";

type BookingCalendarProps = {
  value: string;
  onChange: (value: string) => void;
  labels: ConsultaBookingContent["calendar"];
};

export function BookingCalendar({ value, onChange, labels }: BookingCalendarProps) {
  const [today] = useState(() => startOfDay(new Date()));
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const days = getMonthDays(viewDate);
  const canGoPrevious = viewDate.getTime() > startOfMonth(today).getTime();
  const selectedDate = value ? parseISODate(value) : null;

  return (
    <div role="group" aria-label={labels.legend} className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          aria-label={labels.previousLabel}
          disabled={!canGoPrevious}
          onClick={() => setViewDate((current) => addMonths(current, -1))}
          className="border-border text-primary hover:bg-primary/10 flex size-11 items-center justify-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-40"
        >
          <IconChevronLeft className="size-5" />
        </button>
        <p aria-live="polite" className="text-primary-dark text-base font-semibold">
          {formatMonthLabel(viewDate)}
        </p>
        <button
          type="button"
          aria-label={labels.nextLabel}
          onClick={() => setViewDate((current) => addMonths(current, 1))}
          className="border-border text-primary hover:bg-primary/10 flex size-11 items-center justify-center rounded-full border transition-colors"
        >
          <IconChevronRight className="size-5" />
        </button>
      </div>

      <div className="text-text-muted grid grid-cols-7 gap-1 text-center text-xs font-semibold tracking-wider uppercase">
        {labels.weekdays.map((weekday) => (
          <span key={weekday} className="py-1">
            {weekday}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <span key={`empty-${index}`} aria-hidden="true" />;
          }

          const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
          const isoDate = toISODate(date);
          const isSelected = value === isoDate;
          const isToday = date.getTime() === today.getTime();
          const isDisabled = isBeforeDay(date, today) || isWeekend(date);

          return (
            <button
              key={isoDate}
              type="button"
              aria-label={formatLongDate(date)}
              aria-pressed={isSelected}
              disabled={isDisabled}
              onClick={() => onChange(isoDate)}
              className={cn(
                "flex h-11 w-full items-center justify-center rounded-full text-sm transition-colors",
                isSelected && "bg-primary text-on-primary font-semibold",
                !isSelected && "text-text hover:bg-primary/10",
                isToday && !isSelected && "ring-primary/40 ring-1",
                isDisabled && "text-text-muted/40 hover:bg-transparent",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="text-text-muted min-h-5 text-sm" aria-live="polite">
        {selectedDate ? formatLongDate(selectedDate) : labels.hint}
      </p>
    </div>
  );
}
