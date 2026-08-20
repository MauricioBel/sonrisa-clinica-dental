import { prisma } from '../lib/prisma.js';
import { notFoundError } from '../utils/ApiError.js';
import type {
  DentistActiveInput,
  DentistCreateInput,
  DentistUpdateInput,
} from '../schemas/validation.js';

const include = {
  businessHours: {
    orderBy: { dayOfWeek: 'asc' } as const,
  },
};

/**
 * Gestión administrativa de dentistas. No existe eliminación física: los
 * registros con historial de citas se desactivan con `isActive` (soft delete),
 * preservando el historial y el FK de las citas existentes.
 */
export async function listAdminDentists() {
  return prisma.dentist.findMany({
    orderBy: { name: 'asc' },
    include,
  });
}

export async function getAdminDentistById(id: number) {
  const dentist = await prisma.dentist.findUnique({
    where: { id },
    include,
  });
  if (!dentist) {
    throw notFoundError('Profesional');
  }
  return dentist;
}

export async function createDentist(input: DentistCreateInput) {
  return prisma.dentist.create({
    data: {
      name: input.name,
      role: input.role,
      specialty: input.specialty,
      description: input.description,
      experienceYears: input.experienceYears,
      imageUrl: input.imageUrl,
      isActive: input.isActive ?? true,
    },
    include,
  });
}

export async function updateDentist(id: number, input: DentistUpdateInput) {
  const existing = await prisma.dentist.findUnique({ where: { id } });
  if (!existing) {
    throw notFoundError('Profesional');
  }
  return prisma.dentist.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.role !== undefined ? { role: input.role } : {}),
      ...(input.specialty !== undefined ? { specialty: input.specialty } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.experienceYears !== undefined
        ? { experienceYears: input.experienceYears }
        : {}),
      ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl } : {}),
    },
    include,
  });
}

export async function setDentistActive(id: number, input: DentistActiveInput) {
  const existing = await prisma.dentist.findUnique({ where: { id } });
  if (!existing) {
    throw notFoundError('Profesional');
  }
  return prisma.dentist.update({
    where: { id },
    data: { isActive: input.isActive },
    include,
  });
}