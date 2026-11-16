"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FormProgress } from "@/components/forms/form-progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IconArrowRight } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  followUpOptions,
  pharmacovigilanceContent,
  reporterOptions,
  sexOptions,
} from "@/content/pharmacovigilance";

type Draft = {
  patientName: string;
  sex: string;
  age: string;
  height: string;
  weight: string;
  clinicalHistory: string;
  reporterType: string;
  followUp: string;
  medicationName: string;
  treatmentStart: string;
  treatmentEnd: string;
  dose: string;
  route: string;
  prescriptionReason: string;
  actionTaken: string;
  lotNumber: string;
  expiryDate: string;
  event: string;
  eventStart: string;
  eventEnd: string;
  description: string;
  additionalInfo: string;
  privacyAccepted: boolean;
  website: string;
};

const initialDraft: Draft = {
  patientName: "",
  sex: "",
  age: "",
  height: "",
  weight: "",
  clinicalHistory: "",
  reporterType: "",
  followUp: "",
  medicationName: "",
  treatmentStart: "",
  treatmentEnd: "",
  dose: "",
  route: "",
  prescriptionReason: "",
  actionTaken: "",
  lotNumber: "",
  expiryDate: "",
  event: "",
  eventStart: "",
  eventEnd: "",
  description: "",
  additionalInfo: "",
  privacyAccepted: false,
  website: "",
};

const steps = pharmacovigilanceContent.form.steps;

type StepProps = {
  draft: Draft;
  update: <K extends keyof Draft>(field: K, value: Draft[K]) => void;
};

function GeneralStep({ draft, update }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-text text-xs font-semibold tracking-[0.18em] uppercase">
        Datos del paciente
      </p>

      <Input
        label="Nombre o iniciales del paciente"
        name="patientName"
        placeholder="Ej. García M. J."
        autoComplete="name"
        required
        value={draft.patientName}
        onChange={(event) => update("patientName", event.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Select
          label="Sexo"
          name="sex"
          placeholder="Selecciona una opción"
          options={sexOptions}
          required
          value={draft.sex}
          onChange={(event) => update("sex", event.target.value)}
        />
        <Input
          label="Edad"
          name="age"
          type="number"
          inputMode="numeric"
          min={0}
          max={120}
          placeholder="años"
          required
          value={draft.age}
          onChange={(event) => update("age", event.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Estatura (cm)"
          name="height"
          type="number"
          inputMode="decimal"
          min={30}
          max={250}
          placeholder="170"
          value={draft.height}
          onChange={(event) => update("height", event.target.value)}
        />
        <Input
          label="Peso (kg)"
          name="weight"
          type="number"
          inputMode="decimal"
          min={1}
          max={400}
          placeholder="70"
          value={draft.weight}
          onChange={(event) => update("weight", event.target.value)}
        />
      </div>

      <Textarea
        label="Datos importantes de la historia clínica"
        name="clinicalHistory"
        rows={4}
        placeholder="Escribe aquí los antecedentes relevantes..."
        hint="(alergias, embarazo, cirugía previa, laboratorio, enfermedades concomitantes, etc.)"
        value={draft.clinicalHistory}
        onChange={(event) => update("clinicalHistory", event.target.value)}
      />

      <RadioGroup
        legend="¿Quién reporta?"
        name="reporterType"
        options={reporterOptions}
        value={draft.reporterType}
        onValueChange={(value) => update("reporterType", value)}
      />

      <RadioGroup
        legend="¿Desea ser contactado para el seguimiento de su reporte?"
        name="followUp"
        options={followUpOptions}
        value={draft.followUp}
        onValueChange={(value) => update("followUp", value)}
      />
    </div>
  );
}

function ProductStep({ draft, update }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-text text-xs font-semibold tracking-[0.18em] uppercase">
        Datos del producto
      </p>

      <Input
        label="Nombre del medicamento"
        name="medicationName"
        required
        value={draft.medicationName}
        onChange={(event) => update("medicationName", event.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Fecha de inicio de tratamiento"
          name="treatmentStart"
          type="date"
          required
          value={draft.treatmentStart}
          onChange={(event) => update("treatmentStart", event.target.value)}
        />
        <Input
          label="Fecha de término de tratamiento"
          name="treatmentEnd"
          type="date"
          value={draft.treatmentEnd}
          onChange={(event) => update("treatmentEnd", event.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Dosis"
          name="dose"
          placeholder="Ej. 500 mg / 2 veces al día"
          value={draft.dose}
          onChange={(event) => update("dose", event.target.value)}
        />
        <Input
          label="Vía de administración"
          name="route"
          placeholder="Ej. Oral, tópica, subcutánea"
          value={draft.route}
          onChange={(event) => update("route", event.target.value)}
        />
      </div>

      <Textarea
        label="Motivo de prescripción"
        name="prescriptionReason"
        rows={4}
        placeholder="Indica lo que se trataba en consulta..."
        value={draft.prescriptionReason}
        onChange={(event) => update("prescriptionReason", event.target.value)}
      />

      <Textarea
        label="Acción tomada con el medicamento"
        name="actionTaken"
        rows={4}
        placeholder="Describe las acciones realizadas tras presentar los eventos adversos, por ejemplo, suspender su uso..."
        value={draft.actionTaken}
        onChange={(event) => update("actionTaken", event.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Número de lote"
          name="lotNumber"
          placeholder="Ej. L2024-01"
          value={draft.lotNumber}
          onChange={(event) => update("lotNumber", event.target.value)}
        />
        <Input
          label="Fecha de caducidad"
          name="expiryDate"
          type="date"
          value={draft.expiryDate}
          onChange={(event) => update("expiryDate", event.target.value)}
        />
      </div>
    </div>
  );
}

function EventStep({ draft, update }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-text text-xs font-semibold tracking-[0.18em] uppercase">
        Datos del evento adverso
      </p>

      <Input
        label="Evento presentado"
        name="event"
        placeholder="Ej. Erupción cutánea, náusea severa..."
        required
        value={draft.event}
        onChange={(event) => update("event", event.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Fecha de inicio del evento"
          name="eventStart"
          type="date"
          required
          value={draft.eventStart}
          onChange={(event) => update("eventStart", event.target.value)}
        />
        <Input
          label="Fecha de término del evento"
          name="eventEnd"
          type="date"
          value={draft.eventEnd}
          onChange={(event) => update("eventEnd", event.target.value)}
        />
      </div>

      <Textarea
        label="Descripción del caso"
        name="description"
        rows={5}
        placeholder="Describe con detalle el evento adverso y su evolución..."
        required
        value={draft.description}
        onChange={(event) => update("description", event.target.value)}
      />

      <Textarea
        label="Información adicional (opcional)"
        name="additionalInfo"
        rows={4}
        placeholder="Puedes agregar cualquier información adicional que considere relevante para el reporte..."
        value={draft.additionalInfo}
        onChange={(event) => update("additionalInfo", event.target.value)}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className="text-text text-xs font-semibold tracking-[0.18em] uppercase">
          Verificación de seguridad
        </legend>
        <div className="border-border bg-bg/50 flex items-center gap-3 rounded-lg border p-4">
          <input
            type="checkbox"
            name="captcha"
            disabled
            aria-describedby="captcha-note"
            className="border-border size-5 shrink-0 rounded"
          />
          <div>
            <p className="text-text text-sm font-medium">No soy un robot</p>
            <p id="captcha-note" className="text-text-muted text-xs">
              TODO_CONTENIDO · Verificación pendiente de integrar
            </p>
          </div>
        </div>
      </fieldset>

      <Checkbox
        name="privacyAccepted"
        checked={draft.privacyAccepted}
        onChange={(event) => update("privacyAccepted", event.target.checked)}
        label={
          <>
            Acepto los{" "}
            <Link href="/legal/terminos" className="text-primary underline">
              términos y condiciones
            </Link>{" "}
            y el{" "}
            <Link href="/legal/aviso-de-privacidad" className="text-primary underline">
              aviso de privacidad
            </Link>
            , y confirmo que la información proporcionada es verídica. Autorizo su uso con fines de
            seguridad farmacéutica.
          </>
        }
      />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">No completar este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={draft.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>
    </div>
  );
}

export function PharmacovigilanceForm() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const headingRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    headingRef.current?.focus();
  }, [step]);

  function update<K extends keyof Draft>(field: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const isFirstStep = step === 0;
  const isLastStep = step === steps.length - 1;
  const currentStep = steps[step];

  return (
    <div className="border-border bg-surface rounded-card overflow-hidden border shadow-sm">
      <div className="bg-primary px-6 py-6 sm:px-8">
        <p className="text-on-primary text-xl font-normal sm:text-2xl">
          {pharmacovigilanceContent.form.cardTitle}
        </p>
      </div>

      <div className="px-5 py-8 sm:px-8 sm:py-10">
        <div ref={headingRef} tabIndex={-1} className="outline-none">
          <FormProgress current={step} total={steps.length} title={currentStep.title} />
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8">
          {isFirstStep ? <GeneralStep draft={draft} update={update} /> : null}
          {step === 1 ? <ProductStep draft={draft} update={update} /> : null}
          {isLastStep ? <EventStep draft={draft} update={update} /> : null}

          <div className="border-border mt-10 border-t pt-6">
            {isLastStep ? (
              <p className="text-text-muted mb-4 text-xs leading-relaxed">
                {pharmacovigilanceContent.form.submitNote}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              {isFirstStep ? null : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  className="w-full sm:w-auto"
                >
                  Anterior
                </Button>
              )}

              {isLastStep ? (
                <Button type="submit" variant="secondary" disabled className="w-full sm:w-auto">
                  Enviar
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
                  className="w-full sm:w-auto"
                >
                  Siguiente
                  <IconArrowRight className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
