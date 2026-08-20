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

export const loginSchema = z.object({
  email: z.string().trim().email('El email no es válido').max(120),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'La contraseña no puede superar 128 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const timeBlockSchema = z
  .object({
    dentistId: z.coerce.number().int('Profesional inválido').positive('Profesional inválido'),
    date: z.string().regex(dateRegex, 'La fecha debe tener formato YYYY-MM-DD'),
    startTime: z.string().regex(timeRegex, 'La hora debe tener formato HH:mm'),
    endTime: z.string().regex(timeRegex, 'La hora debe tener formato HH:mm'),
    reason: z
      .string()
      .trim()
      .max(200, 'El motivo no puede superar 200 caracteres')
      .optional()
      .nullable(),
  })
  .refine(
    (input) => input.endTime > input.startTime,
    {
      message: 'El fin del bloqueo debe ser posterior al inicio',
      path: ['endTime'],
    },
  );

export type TimeBlockInput = z.infer<typeof timeBlockSchema>;

export const timeBlockListQuerySchema = z.object({
  dentistId: z.coerce
    .number()
    .int('Profesional inválido')
    .positive('Profesional inválido')
    .optional(),
  date: z.string().regex(dateRegex, 'La fecha debe tener formato YYYY-MM-DD').optional(),
});

export type TimeBlockListQuery = z.infer<typeof timeBlockListQuerySchema>;

export const appointmentListQuerySchema = z.object({
  status: z
    .enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
    .optional(),
  dentistId: z.coerce
    .number()
    .int('Profesional inválido')
    .positive('Profesional inválido')
    .optional(),
  date: z.string().regex(dateRegex, 'La fecha debe tener formato YYYY-MM-DD').optional(),
  from: z.string().regex(dateRegex, 'La fecha debe tener formato YYYY-MM-DD').optional(),
  to: z.string().regex(dateRegex, 'La fecha debe tener formato YYYY-MM-DD').optional(),
});

export type AppointmentListQuery = z.infer<typeof appointmentListQuerySchema>;

export const cancelAppointmentSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(3, 'El motivo debe tener al menos 3 caracteres')
    .max(300, 'El motivo no puede superar 300 caracteres'),
});

export type CancelAppointmentInput = z.infer<typeof cancelAppointmentSchema>;

export const changeAppointmentStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
});

export type ChangeAppointmentStatusInput = z.infer<typeof changeAppointmentStatusSchema>;

export const rescheduleAppointmentSchema = z.object({
  date: z.string().regex(dateRegex, 'La fecha debe tener formato YYYY-MM-DD'),
  startTime: z.string().regex(timeRegex, 'La hora debe tener formato HH:mm'),
  dentistId: z.coerce
    .number()
    .int('Profesional inválido')
    .positive('Profesional inválido')
    .optional(),
});

export type RescheduleAppointmentInput = z.infer<typeof rescheduleAppointmentSchema>;

const dentistFields = {
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede superar 80 caracteres'),
  role: z
    .string()
    .trim()
    .min(2, 'El cargo debe tener al menos 2 caracteres')
    .max(80, 'El cargo no puede superar 80 caracteres'),
  specialty: z
    .string()
    .trim()
    .min(2, 'La especialidad debe tener al menos 2 caracteres')
    .max(80, 'La especialidad no puede superar 80 caracteres'),
  description: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede superar 2000 caracteres'),
  experienceYears: z.coerce
    .number()
    .int('Los años de experiencia deben ser un número entero')
    .min(0, 'Los años de experiencia no pueden ser negativos')
    .max(80, 'Los años de experiencia no pueden superar 80'),
  imageUrl: z
    .string()
    .trim()
    .min(1, 'La imagen es obligatoria')
    .max(300, 'La URL de imagen no puede superar 300 caracteres'),
} as const;

export const dentistCreateSchema = z.object({
  ...dentistFields,
  isActive: z.boolean().optional(),
});

export type DentistCreateInput = z.infer<typeof dentistCreateSchema>;

export const dentistUpdateSchema = z.object(dentistFields).partial();

export type DentistUpdateInput = z.infer<typeof dentistUpdateSchema>;

export const dentistActiveSchema = z.object({
  isActive: z.boolean(),
});

export type DentistActiveInput = z.infer<typeof dentistActiveSchema>;

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const treatmentFields = {
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(120, 'El nombre no puede superar 120 caracteres'),
  slug: z
    .string()
    .trim()
    .min(2, 'El slug debe tener al menos 2 caracteres')
    .max(120, 'El slug no puede superar 120 caracteres')
    .regex(
      slugRegex,
      'El slug solo puede contener minúsculas, números y guiones medios',
    ),
  shortDescription: z
    .string()
    .trim()
    .min(5, 'La descripción corta debe tener al menos 5 caracteres')
    .max(300, 'La descripción corta no puede superar 300 caracteres'),
  description: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(5000, 'La descripción no puede superar 5000 caracteres'),
  benefits: z
    .array(z.string().trim().min(1).max(300))
    .min(1, 'Debe indicar al menos un beneficio')
    .max(20, 'No puede indicar más de 20 beneficios'),
  durationMinutes: z.coerce
    .number()
    .int('La duración debe ser un número entero')
    .min(5, 'La duración debe ser de al menos 5 minutos')
    .max(600, 'La duración no puede superar 600 minutos'),
  price: z.coerce
    .number()
    .int('El precio debe ser un número entero')
    .min(0, 'El precio no puede ser negativo'),
  imageUrl: z
    .string()
    .trim()
    .min(1, 'La imagen es obligatoria')
    .max(300, 'La URL de imagen no puede superar 300 caracteres'),
  isFeatured: z.boolean().optional(),
  sortOrder: z.coerce
    .number()
    .int('El orden debe ser un número entero')
    .min(0, 'El orden no puede ser negativo')
    .optional(),
} as const;

export const treatmentCreateSchema = z.object({
  ...treatmentFields,
  isActive: z.boolean().optional(),
});

export type TreatmentCreateInput = z.infer<typeof treatmentCreateSchema>;

export const treatmentUpdateSchema = z.object(treatmentFields).partial();

export type TreatmentUpdateInput = z.infer<typeof treatmentUpdateSchema>;

export const treatmentActiveSchema = z.object({
  isActive: z.boolean(),
});

export type TreatmentActiveInput = z.infer<typeof treatmentActiveSchema>;