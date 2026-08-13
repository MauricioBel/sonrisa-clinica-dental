import { prisma } from '../lib/prisma.js';
import { notFoundError } from '../utils/ApiError.js';

export async function listTreatments() {
  return prisma.treatment.findMany({
    orderBy: { sortOrder: 'asc' },
  });
}

export async function getTreatmentBySlug(slug: string) {
  const treatment = await prisma.treatment.findUnique({
    where: { slug },
  });
  if (!treatment) {
    throw notFoundError('Tratamiento');
  }
  return treatment;
}

export async function listDentists() {
  return prisma.dentist.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    include: {
      businessHours: {
        orderBy: { dayOfWeek: 'asc' },
      },
    },
  });
}

export async function getDentistById(id: number) {
  const dentist = await prisma.dentist.findUnique({
    where: { id },
    include: {
      businessHours: {
        orderBy: { dayOfWeek: 'asc' },
      },
    },
  });
  if (!dentist || !dentist.isActive) {
    throw notFoundError('Profesional');
  }
  return dentist;
}