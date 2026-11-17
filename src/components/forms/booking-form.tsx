"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { BookingCalendar } from "@/components/forms/booking-calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { ConsultaBookingContent } from "@/content/services";
import { cn } from "@/lib/utils";

type BookingFormProps = {
  copy: ConsultaBookingContent;
};

type Step = 1 | 2;

type FormErrors = {
  patientName?: string;
  age?: string;
};

export function BookingForm({ copy }: BookingFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notice, setNotice] = useState("");

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    const ageNumber = Number(age);

    if (patientName.trim().length < 2) {
      nextErrors.patientName = copy.nameError;
    }

    if (age.trim() === "" || !Number.isInteger(ageNumber) || ageNumber < 0 || ageNumber > 120) {
      nextErrors.age = copy.ageError;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStep(2);
      setNotice("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!date || !time || !privacyAccepted) {
      return;
    }

    setNotice(copy.pendingNotice);
  }

  if (step === 1) {
    return (
      <form onSubmit={handleNext} noValidate className="max-w-lg">
        <h3 className="text-primary-dark text-2xl font-bold">{copy.title}</h3>
        <p className="text-text-muted mt-2 text-sm">{copy.subtitle}</p>

        <div className="mt-6 flex flex-col gap-4">
          <Input
            label={copy.nameLabel}
            name="patientName"
            value={patientName}
            onChange={(event) => {
              setPatientName(event.target.value);
              setErrors((current) => ({ ...current, patientName: undefined }));
            }}
            autoComplete="name"
            error={errors.patientName}
            required
          />
          <Input
            label={copy.ageLabel}
            name="age"
            type="number"
            inputMode="numeric"
            min={0}
            max={120}
            value={age}
            onChange={(event) => {
              setAge(event.target.value);
              setErrors((current) => ({ ...current, age: undefined }));
            }}
            error={errors.age}
            required
          />
        </div>

        <Button type="submit" variant="secondary" className="mt-6 w-full sm:w-auto">
          {copy.nextLabel}
        </Button>
      </form>
    );
  }

  const canSubmit = Boolean(date && time && privacyAccepted);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="text-primary-dark text-2xl font-bold">{copy.title}</h3>
      <p className="text-text-muted mt-2 text-sm">{copy.subtitle}</p>
      <p className="text-text mt-1 text-sm">
        Paciente: {patientName} · {age} años
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
        <BookingCalendar
          value={date}
          labels={copy.calendar}
          onChange={(nextDate) => {
            setDate(nextDate);
            setTime("");
            setNotice("");
          }}
        />

        <fieldset disabled={!date} aria-describedby="time-hint">
          <legend className="text-primary-dark text-base font-semibold">{copy.timeLabel}</legend>
          <p id="time-hint" aria-live="polite" className="text-text-muted mt-1 text-sm">
            {date ? copy.timeHint : copy.timeHintEmpty}
          </p>

          <div className={cn("mt-4 grid grid-cols-2 gap-x-8", !date && "opacity-40")}>
            {copy.timeSlots.map((slot) => {
              const slotId = `time-${slot.replace(/[^a-z0-9]/gi, "")}`;

              return (
                <label
                  key={slot}
                  htmlFor={slotId}
                  className={cn(
                    "border-border flex min-h-11 items-center gap-3 border-b py-3 text-sm",
                    date ? "cursor-pointer" : "cursor-not-allowed",
                  )}
                >
                  <input
                    id={slotId}
                    type="radio"
                    name="time"
                    value={slot}
                    checked={time === slot}
                    onChange={() => {
                      setTime(slot);
                      setNotice("");
                    }}
                    className="accent-primary size-4"
                  />
                  <span className={cn(time === slot && "text-primary-dark font-semibold")}>
                    {slot}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="border-border mt-8 border-t pt-6">
        <Checkbox
          name="privacyAccepted"
          checked={privacyAccepted}
          onChange={(event) => {
            setPrivacyAccepted(event.target.checked);
            setNotice("");
          }}
          label={
            <>
              {copy.consentPrefix}{" "}
              <Link href="/legal/aviso-de-privacidad" className="text-primary underline">
                {copy.consentLink}
              </Link>{" "}
              {copy.consentSuffix}
            </>
          }
        />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            variant="secondary"
            disabled={!canSubmit}
            className="w-full sm:w-auto"
          >
            {copy.submitLabel}
          </Button>
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setNotice("");
            }}
            className="text-primary min-h-11 text-sm font-semibold tracking-wider uppercase underline-offset-4 hover:underline"
          >
            {copy.backLabel}
          </button>
        </div>

        {notice ? (
          <p
            role="status"
            className="border-border bg-bg text-text-body mt-5 rounded-lg border p-4 text-sm"
          >
            {notice}
          </p>
        ) : null}
      </div>
    </form>
  );
}
