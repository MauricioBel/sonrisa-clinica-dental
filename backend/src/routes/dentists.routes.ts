import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateParams } from '../middleware/validate.js';
import { idParamSchema } from '../schemas/validation.js';
import { listDentists, getDentistById } from '../controllers/public.controller.js';

export const dentistsRouter = Router();

dentistsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const dentists = await listDentists();
    res.json({ data: dentists });
  }),
);

dentistsRouter.get(
  '/:id',
  validateParams(idParamSchema),
  asyncHandler(async (req, res) => {
    const dentist = await getDentistById(Number(req.validatedParams.id));
    res.json({ data: dentist });
  }),
);