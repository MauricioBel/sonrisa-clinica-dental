import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { requireAuth } from '../../middleware/auth.js';
import { validateBody, validateParams, validateQuery } from '../../middleware/validate.js';
import {
  appointmentListQuerySchema,
  cancelAppointmentSchema,
  changeAppointmentStatusSchema,
  idParamSchema,
  rescheduleAppointmentSchema,
} from '../../schemas/validation.js';
import {
  cancelAppointment,
  changeAppointmentStatus,
  getAdminAppointmentById,
  listAppointments,
  rescheduleAppointment,
} from '../../services/appointmentAdmin.service.js';

export const adminAppointmentsRouter = Router();

// Todas las operaciones de gestión requieren sesión de administrador.
adminAppointmentsRouter.use(requireAuth);

/** GET /api/admin/appointments?status=&dentistId=&from=&to= — listado con filtros. */
adminAppointmentsRouter.get(
  '/',
  validateQuery(appointmentListQuerySchema),
  asyncHandler(async (req, res) => {
    const appointments = await listAppointments(
      req.validatedQuery as {
        status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
        dentistId?: number;
        date?: string;
        from?: string;
        to?: string;
      },
    );
    res.json({ data: appointments });
  }),
);

/** GET /api/admin/appointments/:id — detalle de una cita (con historial de reagenda). */
adminAppointmentsRouter.get(
  '/:id',
  validateParams(idParamSchema),
  asyncHandler(async (req, res) => {
    const appointment = await getAdminAppointmentById(Number(req.validatedParams.id));
    res.json({ data: appointment });
  }),
);

/** POST /api/admin/appointments/:id/cancel — cancela una cita activa con su motivo. */
adminAppointmentsRouter.post(
  '/:id/cancel',
  validateParams(idParamSchema),
  validateBody(cancelAppointmentSchema),
  asyncHandler(async (req, res) => {
    const appointment = await cancelAppointment(
      Number(req.validatedParams.id),
      req.body.reason,
    );
    res.json({ data: appointment });
  }),
);

/** PATCH /api/admin/appointments/:id/status — transición de estado válida. */
adminAppointmentsRouter.patch(
  '/:id/status',
  validateParams(idParamSchema),
  validateBody(changeAppointmentStatusSchema),
  asyncHandler(async (req, res) => {
    const appointment = await changeAppointmentStatus(
      Number(req.validatedParams.id),
      req.body.status,
    );
    res.json({ data: appointment });
  }),
);

/** POST /api/admin/appointments/:id/reschedule — reagenda y cancela la original. */
adminAppointmentsRouter.post(
  '/:id/reschedule',
  validateParams(idParamSchema),
  validateBody(rescheduleAppointmentSchema),
  asyncHandler(async (req, res) => {
    const appointment = await rescheduleAppointment(
      Number(req.validatedParams.id),
      req.body,
    );
    res.status(201).json({ data: appointment });
  }),
);