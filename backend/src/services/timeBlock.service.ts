import { prisma } from '../lib/prisma.js';
import {
  conflictError,
  notFoundError,
  validationError,
} from '../utils/ApiError.js';
import type { TimeBlockInput, TimeBlockListQuery } from '../schemas/validation.js';

const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

function overlaps(
  startA: number,
  endA: number,
  startB: number,
  endB: number,
): boolean {
  return startA < endB && startB < endA;
}

/** Verifica que la fecha YYYY-MM-DD sea un día real del calendario. */
function isValidDate(date: string): boolean {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return false;
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  );
}

export async function listTimeBlocks(query: TimeBlockListQuery = {}) {
  return prisma.timeBlock.findMany({
    where: {
      ...(query.dentistId !== undefined ? { dentistId: query.dentistId } : {}),
      ...(query.date !== undefined ? { date: query.date } : {}),
    },
    orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    include: {
      dentist: { select: { id: true, name: true, role: true, specialty: true } },
    },
  });
}

export async function getTimeBlockById(id: number) {
  const block = await prisma.timeBlock.findUnique({
    where: { id },
    include: {
      dentist: { select: { id: true, name: true, role: true, specialty: true } },
    },
  });
  if (!block) {
    throw notFoundError('Bloqueo de agenda');
  }
  return block;
}

export async function createTimeBlock(input: TimeBlockInput) {
  const { dentistId, date, startTime, endTime, reason } = input;

  const dentist = await prisma.dentist.findUnique({ where: { id: dentistId } });
  if (!dentist) {
    throw notFoundError('Profesional');
  }

  // La expresión regular del esquema valida el formato; aquí se valida que la
  // fecha sea real (misma regla que el servicio de disponibilidad).
  if (!isValidDate(date)) {
    throw validationError('La fecha debe ser una fecha válida', {
      field: 'date',
    });
  }

  // Un bloqueo debe cubrir al menos una franja: el fin debe ser posterior al inicio.
  if (toMinutes(endTime) <= toMinutes(startTime)) {
    throw validationError('El fin del bloqueo debe ser posterior al inicio', {
      field: 'endTime',
    });
  }

  // Consistencia del calendario: no permitir bloques solapados del mismo
  // profesional en la misma fecha.
  const existing = await prisma.timeBlock.findMany({
    where: { dentistId, date },
  });
  const overlapsExisting = existing.some(
    (b) =>
      overlaps(
        toMinutes(startTime),
        toMinutes(endTime),
        toMinutes(b.startTime),
        toMinutes(b.endTime),
      ),
  );
  if (overlapsExisting) {
    throw conflictError(
      'Ya existe un bloqueo que se solapa con este horario',
      { date, startTime, endTime },
    );
  }

  return prisma.timeBlock.create({
    data: {
      dentistId,
      date,
      startTime,
      endTime,
      reason: reason ?? null,
    },
    include: {
      dentist: { select: { id: true, name: true, role: true, specialty: true } },
    },
  });
}

export async function deleteTimeBlock(id: number) {
  const existing = await prisma.timeBlock.findUnique({ where: { id } });
  if (!existing) {
    throw notFoundError('Bloqueo de agenda');
  }
  await prisma.timeBlock.delete({ where: { id } });
  return { id };
}