import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateBody, validateParams, validateQuery } from '../middleware/validate.js';
import { adminLoginSchema, updateAppointmentStatusSchema, adminAppointmentsQuerySchema, idParamSchema } from '../schemas/validation.js';
import { loginAdmin, listAdminAppointments, updateAppointmentStatus } from '../services/admin.service.js';
import { authMiddleware } from '../middleware/auth.js';

export const adminRouter = Router();

adminRouter.post(
  '/auth/login',
  validateBody(adminLoginSchema),
  asyncHandler(async (req, res) => {
    const admin = await loginAdmin(req.body);
    req.session = req.session || {};
    req.session.admin = admin;
    res.json({ data: admin });
  })
);

adminRouter.get(
  '/auth/me',
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.json({ data: req.admin });
  })
);

adminRouter.post(
  '/auth/logout',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destruyendo sesión:', err);
      }
      res.json({ data: { message: 'Sesión cerrada' } });
    });
  })
);

adminRouter.get(
  '/appointments',
  authMiddleware,
  validateQuery(adminAppointmentsQuerySchema),
  asyncHandler(async (req, res) => {
    const clinicaId = req.admin!.clinicaId;
    const result = await listAdminAppointments(clinicaId, req.validatedQuery);
    res.json(result);
  })
);

adminRouter.patch(
  '/appointments/:id/status',
  authMiddleware,
  validateParams(idParamSchema),
  validateBody(updateAppointmentStatusSchema),
  asyncHandler(async (req, res) => {
    const clinicaId = req.admin!.clinicaId;
    const appointmentId = Number(req.validatedParams.id);
    const appointment = await updateAppointmentStatus(appointmentId, clinicaId, req.body);
    res.json({ data: appointment });
  })
);