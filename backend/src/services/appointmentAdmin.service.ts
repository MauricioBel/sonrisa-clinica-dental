import type { Prisma } from '../generated/prisma/client.js';
import { prisma } from '../lib/prisma.js';
import {
  conflictError,
  notFoundError,
  validationError,
} from '../utils/ApiError.js';
import type {
  AppointmentListQuery,
  RescheduleAppointmentInput,
} from '../schemas/validation.js';
import { getAvailability } from './availability.service.js';

type AppointmentStatusValue = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

const ACTIVE_STATUSES: AppointmentStatusValue[] = ['PENDING', 'CONFIRMED'];

const RESCHEDULE_REASON = 'Reagendada por el administrador';

const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

/** Verifica que la fecha YYYY-MM-DD sea un día real del calendario. */
function isValidDate(date: string): boolean {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return false;
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  );
}

const statusKey = (dentistId: number, date: string, time: string): string =>
  `${dentistId}:${date}:${time}`;

// Transiciones de estado permitidas sin salto por el panel. La cancelación
// es una operación propia (requiere motivo) y CANCELLED/COMPLETED son finales.
const VALID_STATUS_TRANSITIONS: Record<
  AppointmentStatusValue,
  AppointmentStatusValue[]
> = {
  PENDING: ['CONFIRMED', 'COMPLETED'],
  CONFIRMED: ['COMPLETED'],
  CANCELLED: [],
  COMPLETED: [],
};

const dentistSelect = {
  id: true,
  name: true,
  role: true,
  specialty: true,
} as const;

const treatmentSelect = {
  id: true,
  name: true,
  slug: true,
  durationMinutes: true,
  price: true,
} as const;

const includes = {
  dentist: { select: dentistSelect },
  treatment: { select: treatmentSelect },
};

export async function listAppointments(query: AppointmentListQuery = {}) {
  const { status, dentistId, date, from, to } = query;
  const where: Prisma.AppointmentWhereInput = {};
  if (status !== undefined) where.status = status;
  if (dentistId !== undefined) where.dentistId = dentistId;
  if (from !== undefined && to !== undefined) {
    where.date = { gte: from, lte: to };
  } else if (from !== undefined) {
    where.date = { gte: from };
  } else if (to !== undefined) {
    where.date = { lte: to };
  } else if (date !== undefined) {
    where.date = date;
  }

  return prisma.appointment.findMany({
    where,
    orderBy: [{ date: 'asc' }, { time: 'asc' }],
    include: includes,
  });
}

export async function getAdminAppointmentById(id: number) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      ...includes,
      rescheduledFrom: { include: includes },
      rescheduledTo: { include: includes, orderBy: [{ date: 'asc' }, { time: 'asc' }] },
    },
  });
  if (!appointment) {
    throw notFoundError('Cita');
  }
  return appointment;
}

export async function cancelAppointment(id: number, reason: string) {
  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) {
    throw notFoundError('Cita');
  }
  if (!ACTIVE_STATUSES.includes(appointment.status as AppointmentStatusValue)) {
    throw conflictError(
      `La cita en estado ${appointment.status} no admite cancelación`,
      { id, status: appointment.status },
    );
  }

  return prisma.appointment.update({
    where: { id },
    data: {
      status: 'CANCELLED',
      cancelReason: reason,
      canceledAt: new Date(),
      // Libera la franja para que pueda volver a reservarse.
      conflictKey: null,
    },
    include: includes,
  });
}

export async function changeAppointmentStatus(
  id: number,
  status: AppointmentStatusValue,
) {
  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) {
    throw notFoundError('Cita');
  }

  if (status === 'CANCELLED') {
    throw conflictError(
      'Use el endpoint de cancelación para cancelar una cita',
      { id },
    );
  }

  const allowed = VALID_STATUS_TRANSITIONS[
    appointment.status as AppointmentStatusValue
  ];
  if (!allowed?.includes(status)) {
    throw conflictError(
      `Transición de estado inválida: ${appointment.status} → ${status}`,
      { id, from: appointment.status, to: status },
    );
  }

  return prisma.appointment.update({
    where: { id },
    data: {
      status,
      // Al confirmar una cita pendiente se asegura la protección de franja
      // aunque la fila se hubiera creado sin conflictKey.
      conflictKey:
        status === 'CONFIRMED' && appointment.conflictKey === null
          ? statusKey(appointment.dentistId, appointment.date, appointment.time)
          : undefined,
    },
    include: includes,
  });
}

export async function rescheduleAppointment(
  id: number,
  input: RescheduleAppointmentInput,
) {
  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) {
    throw notFoundError('Cita');
  }
  if (!ACTIVE_STATUSES.includes(appointment.status as AppointmentStatusValue)) {
    throw conflictError(
      `La cita en estado ${appointment.status} no admite reagendamiento`,
      { id, status: appointment.status },
    );
  }

  const dentistId = input.dentistId ?? appointment.dentistId;
  const { date, startTime } = input;

  if (!isValidDate(date)) {
    throw validationError('La fecha debe ser una fecha válida', {
      field: 'date',
    });
  }

  const dentist = await prisma.dentist.findUnique({
    where: { id: dentistId, isActive: true },
  });
  if (!dentist) {
    throw notFoundError('Profesional');
  }

  if (
    dentistId === appointment.dentistId &&
    date === appointment.date &&
    startTime === appointment.time
  ) {
    throw conflictError(
      'El nuevo horario debe ser distinto del horario actual',
      { date, startTime },
    );
  }

  // Reutiliza la misma regla de disponibilidad pública (BusinessHours,
  // reservas activas, bloqueos de agenda y momentum horario).
  const availability = await getAvailability({
    date,
    dentistId,
    treatmentId: appointment.treatmentId,
  });
  if (!availability.isOpen) {
    throw conflictError('El profesional no atiende en esta fecha', {
      date,
      dentistId,
    });
  }
  if (!availability.slots.includes(startTime)) {
    throw conflictError('La franja solicitada no está disponible', {
      date,
      startTime,
    });
  }

  return prisma.$transaction(async (tx) => {
    const start = toMinutes(startTime);
    const end = start + availability.durationMinutes;

    // Verificación de solapamiento dentro de la transacción (misma regla que
    // el flujo público): evita doble reserva ante la reutilización de una
    // franja liberada por una cancelación.
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
      throw conflictError('La franja solicitada acaba de ser ocupada', {
        date,
        startTime,
      });
    }

    const created = await tx.appointment.create({
      data: {
        patientName: appointment.patientName,
        patientLastName: appointment.patientLastName,
        patientEmail: appointment.patientEmail,
        patientPhone: appointment.patientPhone,
        date,
        time: startTime,
        comment: appointment.comment,
        status: 'CONFIRMED',
        source: 'ADMIN',
        rescheduledFromId: appointment.id,
        conflictKey: statusKey(dentistId, date, startTime),
        dentistId,
        treatmentId: appointment.treatmentId,
      },
      include: {
        dentist: { select: dentistSelect },
        treatment: { select: treatmentSelect },
      },
    });

    // La cita original queda cancelada y libera su franja para nuevas reservas.
    await tx.appointment.update({
      where: { id: appointment.id },
      data: {
        status: 'CANCELLED',
        cancelReason: RESCHEDULE_REASON,
        canceledAt: new Date(),
        conflictKey: null,
      },
    });

    return created;
  });
}