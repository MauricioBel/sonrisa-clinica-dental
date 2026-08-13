import { z } from 'zod';

const phoneRegex = /^\+?[0-9]{9,15}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const createAppointmentSchema = z.object({
  patientName: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede superar 80 caracteres'),
  patientLastName: z
    .string()
    .trim()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(80, 'El apellido no puede superar 80 caracteres'),
  patientEmail: z.string().trim().email('El email no es válido').max(120),
  patientPhone: z
    .string()
    .trim()
    .regex(phoneRegex, 'El teléfono debe tener entre 9 y 15 dígitos'),
  treatmentId: z.coerce
    .number()
    .int('Tratamiento inválido')
    .positive('Tratamiento inválido'),
  dentistId: z.coerce
    .number()
    .int('Profesional inválido')
    .positive('Profesional inválido'),
  date: z.string().regex(dateRegex, 'La fecha debe tener formato YYYY-MM-DD'),
  time: z.string().regex(timeRegex, 'La hora debe tener formato HH:mm'),
  comment: z
    .string()
    .trim()
    .max(500, 'El comentario no puede superar 500 caracteres')
    .optional()
    .nullable(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export const availabilityQuerySchema = z.object({
  date: z
    .string()
    .regex(dateRegex, 'La fecha debe tener formato YYYY-MM-DD')
    .optional(),
  treatmentId: z.coerce
    .number()
    .int('Tratamiento inválido')
    .positive('Tratamiento inválido'),
  dentistId: z.coerce
    .number()
    .int('Profesional inválido')
    .positive('Profesional inválido'),
});

export type AvailabilityQuery = z.infer<typeof availabilityQuerySchema>;

export const idParamSchema = z.object({
  id: z.coerce
    .number()
    .int('ID inválido')
    .positive('ID inválido'),
});

export type IdParam = z.infer<typeof idParamSchema>;