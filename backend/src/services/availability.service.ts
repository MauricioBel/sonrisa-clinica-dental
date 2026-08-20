import { prisma } from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';

const SLOT_MINUTES = 30;

const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

const toTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

/** Fecha local actual en formato YYYY-MM-DD. */
export function localDateString(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Convierte YYYY-MM-DD a dayOfWeek (0=Domingo..6=Sábado) usando fecha local. */
function dayOfWeekFromDate(date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y ?? 0, (m ?? 1) - 1, d ?? 1).getDay();
}

function isValidDate(date: string): boolean {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return false;
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  );
}

type ExistingAppointment = {
  time: string;
  treatment: { durationMinutes: number };
};

function overlaps(
  startA: number,
  endA: number,
  startB: number,
  endB: number,
): boolean {
  return startA < endB && startB < endA;
}

export interface AvailabilityParams {
  date?: string;
  dentistId: number;
  treatmentId: number;
}

export interface AvailabilityResult {
  date: string;
  dentistId: number;
  treatmentId: number;
  durationMinutes: number;
  slots: string[];
  isOpen: boolean;
}

/**
 * Calcula los horarios disponibles para un dentista, tratamiento y fecha.
 * - Slots base de 30 minutos desde la apertura hasta el cierre.
 * - Un tratamiento ocupa `durationMinutes` (90 min => 3 slots consecutivos).
 * - No puede atravesar el cierre del dentista.
 * - No puede solaparse con otra reserva existente.
 * - Si la fecha es hoy, descarta horarios ya pasados.
 */
export async function getAvailability({
  date = localDateString(),
  dentistId,
  treatmentId,
}: AvailabilityParams): Promise<AvailabilityResult> {
  if (!isValidDate(date)) {
    throw new ApiError(
      400,
      'La fecha debe tener formato YYYY-MM-DD y ser válida',
      'VALIDATION_ERROR',
    );
  }

  const [dentist, treatment] = await Promise.all([
    prisma.dentist.findUnique({ where: { id: dentistId, isActive: true } }),
    prisma.treatment.findUnique({ where: { id: treatmentId, isActive: true } }),
  ]);

  if (!dentist) {
    throw new ApiError(404, 'Profesional no encontrado', 'NOT_FOUND');
  }
  if (!treatment) {
    throw new ApiError(404, 'Tratamiento no encontrado', 'NOT_FOUND');
  }

  const dayOfWeek = dayOfWeekFromDate(date);
  const businessHour = await prisma.businessHours.findUnique({
    where: {
      dentistId_dayOfWeek: { dentistId, dayOfWeek },
    },
  });

  const result: AvailabilityResult = {
    date,
    dentistId,
    treatmentId,
    durationMinutes: treatment.durationMinutes,
    slots: [],
    isOpen: Boolean(businessHour),
  };

  if (!businessHour) return result;

  const open = toMinutes(businessHour.openTime);
  const close = toMinutes(businessHour.closeTime);
  const duration = treatment.durationMinutes;

  const existing = await prisma.appointment.findMany({
    where: {
      dentistId,
      date,
      status: { in: ['PENDING', 'CONFIRMED'] },
    },
    include: { treatment: { select: { durationMinutes: true } } },
  });

  const booked: { start: number; end: number }[] = existing.map(
    (a: ExistingAppointment) => {
      const start = toMinutes(a.time);
      return { start, end: start + a.treatment.durationMinutes };
    },
  );

  // Bloqueos de agenda del profesional para esta fecha. Un slot se considera
  // no disponible si solapa con una reserva existente O con un bloqueo.
  const blocks = await prisma.timeBlock.findMany({
    where: { dentistId, date },
  });
  const blocked: { start: number; end: number }[] = blocks.map((b) => ({
    start: toMinutes(b.startTime),
    end: toMinutes(b.endTime),
  }));

  const today = localDateString();
  const nowMinutes = today === date ? currentMinutes() : -1;

  const slots: string[] = [];
  // Un tratamiento no puede comenzar en el último slot si atravesaría el cierre.
  for (let start = open; start + duration <= close; start += SLOT_MINUTES) {
    if (nowMinutes >= 0 && start <= nowMinutes) continue;
    const end = start + duration;
    const conflicts =
      booked.some((b) => overlaps(start, end, b.start, b.end)) ||
      blocked.some((t) => overlaps(start, end, t.start, t.end));
    if (!conflicts) slots.push(toTime(start));
  }

  result.slots = slots;
  return result;
}

function currentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}