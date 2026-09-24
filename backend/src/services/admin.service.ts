import { prisma } from '../lib/prisma.js';
import { ApiError, notFoundError } from '../utils/ApiError.js';
import type { AdminLoginInput, UpdateAppointmentStatusInput, AdminAppointmentsQuery } from '../schemas/validation.js';
import { createHash } from 'node:crypto';

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export async function loginAdmin(input: AdminLoginInput) {
  const admin = await prisma.adminUser.findUnique({
    where: { email: input.email.toLowerCase() },
    include: { clinica: true },
  });

  if (!admin || admin.password !== hashPassword(input.password)) {
    throw new ApiError(401, 'Credenciales inválidas', 'INVALID_CREDENTIALS');
  }

  return {
    id: admin.id,
    email: admin.email,
    nombre: admin.nombre,
    clinicaId: admin.clinicaId,
    clinicaNombre: admin.clinica.nombre,
  };
}

export async function listAdminAppointments(clinicaId: string, query: AdminAppointmentsQuery) {
  const page = query.page ?? 1;
  const limit = query.limit ?? 50;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {
    clinicaId,
  };

  if (query.status) where.status = query.status;
  if (query.dentistId) where.dentistId = query.dentistId;
  if (query.treatmentId) where.treatmentId = query.treatmentId;
  if (query.dateFrom || query.dateTo) {
    where.date = {};
    if (query.dateFrom) (where.date as Record<string, string>).gte = query.dateFrom;
    if (query.dateTo) (where.date as Record<string, string>).lte = query.dateTo;
  }

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      include: {
        dentist: { select: { id: true, name: true, role: true, specialty: true } },
        treatment: { select: { id: true, name: true, durationMinutes: true, price: true } },
      },
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
      skip,
      take: limit,
    }),
    prisma.appointment.count({ where }),
  ]);

  return {
    data: appointments,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function updateAppointmentStatus(
  appointmentId: number,
  clinicaId: string,
  input: UpdateAppointmentStatusInput
) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { treatment: true },
  });

  if (!appointment) {
    throw notFoundError('Reserva');
  }

  if (appointment.clinicaId !== clinicaId) {
    throw new ApiError(403, 'No autorizado para modificar esta reserva', 'FORBIDDEN');
  }

  const previousStatus = appointment.status;
  const newStatus = input.status;

  if (previousStatus === newStatus) {
    return appointment;
  }

  const updated = await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: newStatus },
    include: {
      dentist: { select: { id: true, name: true, role: true, specialty: true } },
      treatment: { select: { id: true, name: true, durationMinutes: true, price: true } },
    },
  });

  if (previousStatus !== 'CANCELLED' && newStatus === 'CANCELLED') {
    console.log(`Cita ${appointmentId} cancelada - horario liberado para dentista ${appointment.dentistId} en ${appointment.date} ${appointment.time}`);
  }

  return updated;
}