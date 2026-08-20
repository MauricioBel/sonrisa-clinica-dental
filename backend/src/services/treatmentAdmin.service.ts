import { prisma } from '../lib/prisma.js';
import { conflictError, notFoundError } from '../utils/ApiError.js';
import type {
  TreatmentActiveInput,
  TreatmentCreateInput,
  TreatmentUpdateInput,
} from '../schemas/validation.js';

const include = {
  _count: { select: { appointments: true } },
};

async function ensureSlugAvailable(slug: string, excludeId?: number): Promise<void> {
  const existing = await prisma.treatment.findUnique({ where: { slug } });
  if (existing && existing.id !== excludeId) {
    throw conflictError(
      'El slug ya está en uso por otro tratamiento',
      { field: 'slug' },
    );
  }
}

/**
 * Gestión administrativa de tratamientos. No existe eliminación física: los
 * tratamientos con historial de citas se desactivan con `isActive` (soft
 * delete), preservando el historial y las citas existentes.
 */
export async function listAdminTreatments() {
  return prisma.treatment.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include,
  });
}

export async function getAdminTreatmentById(id: number) {
  const treatment = await prisma.treatment.findUnique({
    where: { id },
    include,
  });
  if (!treatment) {
    throw notFoundError('Tratamiento');
  }
  return treatment;
}

export async function createTreatment(input: TreatmentCreateInput) {
  await ensureSlugAvailable(input.slug);

  return prisma.treatment.create({
    data: {
      name: input.name,
      slug: input.slug,
      shortDescription: input.shortDescription,
      description: input.description,
      benefits: input.benefits,
      durationMinutes: input.durationMinutes,
      price: input.price,
      imageUrl: input.imageUrl,
      isFeatured: input.isFeatured ?? false,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
    },
    include,
  });
}

export async function updateTreatment(id: number, input: TreatmentUpdateInput) {
  const existing = await prisma.treatment.findUnique({ where: { id } });
  if (!existing) {
    throw notFoundError('Tratamiento');
  }

  if (input.slug !== undefined) {
    await ensureSlugAvailable(input.slug, id);
  }

  return prisma.treatment.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.slug !== undefined ? { slug: input.slug } : {}),
      ...(input.shortDescription !== undefined
        ? { shortDescription: input.shortDescription }
        : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.benefits !== undefined ? { benefits: input.benefits } : {}),
      ...(input.durationMinutes !== undefined
        ? { durationMinutes: input.durationMinutes }
        : {}),
      ...(input.price !== undefined ? { price: input.price } : {}),
      ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl } : {}),
      ...(input.isFeatured !== undefined ? { isFeatured: input.isFeatured } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    },
    include,
  });
}

export async function setTreatmentActive(id: number, input: TreatmentActiveInput) {
  const existing = await prisma.treatment.findUnique({ where: { id } });
  if (!existing) {
    throw notFoundError('Tratamiento');
  }
  return prisma.treatment.update({
    where: { id },
    data: { isActive: input.isActive },
    include,
  });
}