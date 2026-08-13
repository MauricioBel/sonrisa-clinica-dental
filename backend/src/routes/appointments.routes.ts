import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateBody, validateParams } from '../middleware/validate.js';
import { bookingLimiter, confirmationLimiter } from '../middleware/rateLimit.js';
import { createAppointmentSchema, idParamSchema } from '../schemas/validation.js';
import { createAppointment, getAppointmentById } from '../services/appointment.service.js';

export const appointmentsRouter = Router();

/**
 * POST /api/appointments
 * Crea una reserva. El backend es la autoridad de disponibilidad:
 * valida, verifica solapamiento y el índice único impide duplicados.
 */
appointmentsRouter.post(
  '/',
  bookingLimiter,
  validateBody(createAppointmentSchema),
  asyncHandler(async (req, res) => {
    const appointment = await createAppointment(req.body);
    res.status(201).json({
      data: {
        id: appointment.id,
        message: 'Tu solicitud de reserva fue registrada correctamente.',
        appointment,
      },
    });
  }),
);

/**
 * GET /api/appointments/:id
 * Devuelve una reserva concreta (usada por la página de confirmación).
 * No existe un listado público de reservas para proteger datos personales.
 */
appointmentsRouter.get(
  '/:id',
  confirmationLimiter,
  validateParams(idParamSchema),
  asyncHandler(async (req, res) => {
    const appointment = await getAppointmentById(Number(req.validatedParams.id));
    res.json({ data: appointment });
  }),
);