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
  clinicaId: z.string().min(1, 'clinicaId es requerido').optional(),
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

export const adminLoginSchema = z.object({
  email: z.string().trim().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
});

export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>;

export const adminAppointmentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().positive().max(100).default(50).optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
  dateFrom: z.string().regex(dateRegex).optional(),
  dateTo: z.string().regex(dateRegex).optional(),
  dentistId: z.coerce.number().int().positive().optional(),
  treatmentId: z.coerce.number().int().positive().optional(),
});

export type AdminAppointmentsQuery = z.infer<typeof adminAppointmentsQuerySchema>;