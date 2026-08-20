import { prisma } from '../lib/prisma.js';
import { ApiError, conflictError, notFoundError } from '../utils/ApiError.js';
import type { CreateAppointmentInput } from '../schemas/validation.js';
import { getAvailability } from './availability.service.js';

const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

function isValidTime(time: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}

/**
 * Crea una reserva verificando la disponibilidad en el backend.
 * - Valida que el tratamiento y el dentista existan.
 * - Verifica que el horario esté dentro de BusinessHours y no atravese el cierre.
 * - Verifica solapamiento con reservas existentes (misma regla que availability).
 * - Usa una transacción y confía en el índice único (dentistId, date, time).
 */
export async function createAppointment(input: CreateAppointmentInput) {
  const { treatmentId, dentistId, date, time } = input;

  if (!isValidTime(time)) {
    throw new ApiError(
      400,
      'La hora debe tener formato HH:mm',
      'VALIDATION_ERROR',
    );
  }

  const [treatment, dentist] = await Promise.all([
    prisma.treatment.findUnique({ where: { id: treatmentId, isActive: true } }),
    prisma.dentist.findUnique({ where: { id: dentistId, isActive: true } }),
  ]);

  if (!treatment) {
    throw notFoundError('Tratamiento');
  }
  if (!dentist) {
    throw notFoundError('Profesional');
  }

  // Reutiliza la misma lógica de disponibilidad del endpoint /api/availability.
  const availability = await getAvailability({ date, dentistId, treatmentId });

  if (!availability.isOpen) {
    throw conflictError(
      'El profesional no atiende en esta fecha',
      { date },
    );
  }

  if (!availability.slots.includes(time)) {
    throw conflictError(
      'Esta hora ya no está disponible o no es válida para este tratamiento',
      { date, time },
    );
  }

  // Transacción: verifica solapamiento y crea. El índice único
  // @@unique([dentistId, date, time]) es la garantía final contra duplicados.
  return prisma.$transaction(async (tx) => {
    const start = toMinutes(time);
    const end = start + treatment.durationMinutes;

    const existing = await tx.appointment.findMany({
      where: {
        dentistId,
        date,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      include: { treatment: { select: { durationMinutes: true } } },
    });

    const overlaps = existing.some((a) => {
      const aStart = toMinutes(a.time);
      const aEnd = aStart + a.treatment.durationMinutes;
      return start < aEnd && aStart < end;
    });

    if (overlaps) {
      throw conflictError(
        'Esta hora acaba de ser reservada por otro usuario',
        { date, time },
      );
    }

    return tx.appointment.create({
      data: {
        patientName: input.patientName,
        patientLastName: input.patientLastName,
        patientEmail: input.patientEmail,
        patientPhone: input.patientPhone,
        date,
        time,
        comment: input.comment ?? null,
        status: 'CONFIRMED',
        source: 'WEB',
        // Protección de doble reserva a nivel de BD: la franja ocupada queda
        // identificada de forma única; al cancelar se libera (conflictKey = null).
        conflictKey: `${dentistId}:${date}:${time}`,
        dentistId,
        treatmentId,
      },
      include: {
        dentist: true,
        treatment: true,
      },
    });
  });
}

export async function getAppointmentById(id: number) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      dentist: { select: { id: true, name: true, role: true, specialty: true } },
      treatment: true,
    },
  });

  if (!appointment) {
    throw notFoundError('Reserva');
  }
  return appointment;
}