import { prisma } from '../lib/prisma.js';
import { notFoundError } from '../utils/ApiError.js';

export async function listTreatments() {
  console.time('⏱️ [BD] Consulta listTreatments'); // 👈 Inicio de medición

  const treatments = await prisma.treatment.findMany({
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      price: true,
      durationMinutes: true,
      imageUrl: true,
      isFeatured: true,
      sortOrder: true,
    },
  });

  console.timeEnd('⏱️ [BD] Consulta listTreatments'); // 👈 Fin de medición
  return treatments;
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
