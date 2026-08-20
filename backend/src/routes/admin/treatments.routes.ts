import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { requireAuth } from '../../middleware/auth.js';
import { validateBody, validateParams } from '../../middleware/validate.js';
import {
  idParamSchema,
  treatmentActiveSchema,
  treatmentCreateSchema,
  treatmentUpdateSchema,
} from '../../schemas/validation.js';
import {
  createTreatment,
  getAdminTreatmentById,
  listAdminTreatments,
  setTreatmentActive,
  updateTreatment,
} from '../../services/treatmentAdmin.service.js';

export const adminTreatmentsRouter = Router();

// Todas las operaciones de gestión requieren sesión de administrador.
adminTreatmentsRouter.use(requireAuth);

/** GET /api/admin/treatments — listado completo (incluye tratamientos inactivos). */
adminTreatmentsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const treatments = await listAdminTreatments();
    res.json({ data: treatments });
  }),
);

/** POST /api/admin/treatments — crea un tratamiento (por defecto activo). */
adminTreatmentsRouter.post(
  '/',
  validateBody(treatmentCreateSchema),
  asyncHandler(async (req, res) => {
    const treatment = await createTreatment(req.body);
    res.status(201).json({ data: treatment });
  }),
);

/** GET /api/admin/treatments/:id — detalle con contador de citas. */
adminTreatmentsRouter.get(
  '/:id',
  validateParams(idParamSchema),
  asyncHandler(async (req, res) => {
    const treatment = await getAdminTreatmentById(Number(req.validatedParams.id));
    res.json({ data: treatment });
  }),
);

/** PATCH /api/admin/treatments/:id — edición parcial (nunca elimina el registro). */
adminTreatmentsRouter.patch(
  '/:id',
  validateParams(idParamSchema),
  validateBody(treatmentUpdateSchema),
  asyncHandler(async (req, res) => {
    const treatment = await updateTreatment(Number(req.validatedParams.id), req.body);
    res.json({ data: treatment });
  }),
);

/** PATCH /api/admin/treatments/:id/active — activa/desactiva sin perder historial. */
adminTreatmentsRouter.patch(
  '/:id/active',
  validateParams(idParamSchema),
  validateBody(treatmentActiveSchema),
  asyncHandler(async (req, res) => {
    const treatment = await setTreatmentActive(Number(req.validatedParams.id), req.body);
    res.json({ data: treatment });
  }),
);