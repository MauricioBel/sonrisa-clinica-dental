import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { requireAuth } from '../../middleware/auth.js';
import { validateBody, validateParams, validateQuery } from '../../middleware/validate.js';
import {
  idParamSchema,
  timeBlockListQuerySchema,
  timeBlockSchema,
} from '../../schemas/validation.js';
import {
  createTimeBlock,
  deleteTimeBlock,
  getTimeBlockById,
  listTimeBlocks,
} from '../../services/timeBlock.service.js';

export const adminTimeBlocksRouter = Router();

// Todas las operaciones de gestión requieren sesión de administrador.
adminTimeBlocksRouter.use(requireAuth);

/** GET /api/admin/timeblocks?dentistId=&date= — listado con filtros opcionales. */
adminTimeBlocksRouter.get(
  '/',
  validateQuery(timeBlockListQuerySchema),
  asyncHandler(async (req, res) => {
    const blocks = await listTimeBlocks(req.validatedQuery as {
      dentistId?: number;
      date?: string;
    });
    res.json({ data: blocks });
  }),
);

/** POST /api/admin/timeblocks — crea un bloqueo de agenda. */
adminTimeBlocksRouter.post(
  '/',
  validateBody(timeBlockSchema),
  asyncHandler(async (req, res) => {
    const block = await createTimeBlock(req.body);
    res.status(201).json({ data: block });
  }),
);

/** GET /api/admin/timeblocks/:id — detalle de un bloqueo. */
adminTimeBlocksRouter.get(
  '/:id',
  validateParams(idParamSchema),
  asyncHandler(async (req, res) => {
    const block = await getTimeBlockById(Number(req.validatedParams.id));
    res.json({ data: block });
  }),
);

/** DELETE /api/admin/timeblocks/:id — elimina un bloqueo. */
adminTimeBlocksRouter.delete(
  '/:id',
  validateParams(idParamSchema),
  asyncHandler(async (req, res) => {
    const result = await deleteTimeBlock(Number(req.validatedParams.id));
    res.json({ data: result });
  }),
);