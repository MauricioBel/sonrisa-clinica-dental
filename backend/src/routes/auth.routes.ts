import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateBody } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { requireAuth } from '../middleware/auth.js';
import { loginSchema } from '../schemas/validation.js';
import { getCurrentUser, login } from '../services/auth.service.js';

export const authRouter = Router();

/**
 * POST /api/auth/login
 * Autentica al administrador y devuelve el token de sesión (Bearer).
 * Protegido con un rate limiter estricto contra fuerza bruta.
 */
authRouter.post(
  '/login',
  authLimiter,
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const result = await login(req.body.email, req.body.password);
    res.json({ data: result });
  }),
);

/**
 * GET /api/auth/me
 * Devuelve el usuario autenticado. Sirve para validar una sesión persistida.
 */
authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await getCurrentUser(Number(req.auth?.sub));
    res.json({ data: user });
  }),
);