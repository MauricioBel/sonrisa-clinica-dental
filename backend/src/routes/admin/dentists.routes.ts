import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { requireAuth } from '../../middleware/auth.js';
import { validateBody, validateParams } from '../../middleware/validate.js';
import {
  dentistActiveSchema,
  dentistCreateSchema,
  dentistUpdateSchema,
  idParamSchema,
} from '../../schemas/validation.js';
import {
  createDentist,
  getAdminDentistById,
  listAdminDentists,
  setDentistActive,
  updateDentist,
} from '../../services/dentistAdmin.service.js';

export const adminDentistsRouter = Router();

// Todas las operaciones de gestión requieren sesión de administrador.
adminDentistsRouter.use(requireAuth);

/** GET /api/admin/dentists — listado completo (incluye profesionales inactivos). */
adminDentistsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const dentists = await listAdminDentists();
    res.json({ data: dentists });
  }),
);

/** POST /api/admin/dentists — crea un dentista (por defecto activo). */
adminDentistsRouter.post(
  '/',
  validateBody(dentistCreateSchema),
  asyncHandler(async (req, res) => {
    const dentist = await createDentist(req.body);
    res.status(201).json({ data: dentist });
  }),
);

/** GET /api/admin/dentists/:id — detalle con horario laboral. */
adminDentistsRouter.get(
  '/:id',
  validateParams(idParamSchema),
  asyncHandler(async (req, res) => {
    const dentist = await getAdminDentistById(Number(req.validatedParams.id));
    res.json({ data: dentist });
  }),
);

/** PATCH /api/admin/dentists/:id — edición parcial (nunca elimina el registro). */
adminDentistsRouter.patch(
  '/:id',
  validateParams(idParamSchema),
  validateBody(dentistUpdateSchema),
  asyncHandler(async (req, res) => {
    const dentist = await updateDentist(Number(req.validatedParams.id), req.body);
    res.json({ data: dentist });
  }),
);

/** PATCH /api/admin/dentists/:id/active — activa/desactiva sin perder historial. */
adminDentistsRouter.patch(
  '/:id/active',
  validateParams(idParamSchema),
  validateBody(dentistActiveSchema),
  asyncHandler(async (req, res) => {
    const dentist = await setDentistActive(Number(req.validatedParams.id), req.body);
    res.json({ data: dentist });
  }),
);