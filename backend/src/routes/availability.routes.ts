import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateQuery } from '../middleware/validate.js';
import { availabilityQuerySchema } from '../schemas/validation.js';
import { getAvailability } from '../services/availability.service.js';

export const availabilityRouter = Router();

availabilityRouter.get(
  '/',
  validateQuery(availabilityQuerySchema),
  asyncHandler(async (req, res) => {
    const { date, treatmentId, dentistId } = req.validatedQuery;
    const result = await getAvailability({
      date: date as string | undefined,
      treatmentId: Number(treatmentId),
      dentistId: Number(dentistId),
    });
    res.json({ data: result });
  }),
);