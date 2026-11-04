import { z } from "zod";

const privacyConsent = z.literal(true, {
  error: "Debes aceptar el aviso de privacidad.",
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(120),
  email: z.string().trim().email("Escribe un correo válido."),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10, "Cuéntanos brevemente tu motivo.").max(2000),
  privacyAccepted: privacyConsent,
  website: z.string().max(0).optional(),
});

export const bookingSchema = z.object({
  patientName: z.string().trim().min(2, "Escribe el nombre del paciente.").max(120),
  age: z.coerce
    .number({ error: "Escribe una edad válida." })
    .int("La edad debe ser un número entero.")
    .min(0)
    .max(120),
  consultationType: z.string().trim().min(1).optional(),
  date: z.string().trim().min(1, "Selecciona una fecha."),
  time: z.string().trim().min(1, "Selecciona un horario."),
  phone: z.string().trim().min(8, "Escribe un teléfono de contacto.").max(30),
  privacyAccepted: privacyConsent,
  website: z.string().max(0).optional(),
});

export const pharmacovigilanceSchema = z.object({
  patientName: z.string().trim().min(2, "Escribe el nombre o iniciales del paciente.").max(120),
  sex: z.enum(["femenino", "masculino", "otro"], {
    error: "Selecciona el sexo.",
  }),
  age: z.coerce.number().int().min(0).max(120),
  height: z.coerce.number().min(30).max(250).optional(),
  weight: z.coerce.number().min(1).max(400).optional(),
  clinicalHistory: z.string().trim().max(2000).optional(),
  reporterType: z.enum(["paciente", "cuidador", "otro"], {
    error: "Indica quién reporta.",
  }),
  followUp: z.enum(["si", "no"], { error: "Indica si deseas seguimiento." }),
  medicationName: z.string().trim().min(2, "Escribe el nombre del medicamento.").max(200),
  treatmentStart: z.string().trim().min(1, "Indica la fecha de inicio."),
  treatmentEnd: z.string().trim().optional(),
  dose: z.string().trim().max(200).optional(),
  route: z.string().trim().max(200).optional(),
  prescriptionReason: z.string().trim().max(2000).optional(),
  actionTaken: z.string().trim().max(2000).optional(),
  lotNumber: z.string().trim().max(100).optional(),
  expiryDate: z.string().trim().optional(),
  event: z.string().trim().min(2, "Describe el evento presentado.").max(500),
  eventStart: z.string().trim().min(1, "Indica la fecha de inicio del evento."),
  eventEnd: z.string().trim().optional(),
  description: z.string().trim().min(10, "Describe el caso con detalle.").max(5000),
  additionalInfo: z.string().trim().max(5000).optional(),
  privacyAccepted: privacyConsent,
  captchaToken: z.string().min(1, "Completa la verificación."),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type PharmacovigilanceInput = z.infer<typeof pharmacovigilanceSchema>;
