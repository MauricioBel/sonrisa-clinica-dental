import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { listTreatments, getTreatmentBySlug } from '../controllers/public.controller.js';

export const treatmentsRouter = Router();

treatmentsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    console.time('🚀 [HTTP] GET /api/treatments');

    const treatments = await listTreatments();

    console.timeEnd('🚀 [HTTP] GET /api/treatments');
    res.json({ data: treatments });
  }),
);

treatmentsRouter.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const treatment = await getTreatmentBySlug(req.params.slug as string);
    res.json({ data: treatment });
  }),
);
