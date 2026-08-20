import rateLimit from 'express-rate-limit';
import type { NextFunction, Request, Response } from 'express';

const defaultHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(429).json({
    error: {
      code: 'RATE_LIMITED',
      message: 'Demasiadas solicitudes. Inténtalo nuevamente en un momento.',
    },
  });
};

/** Límite general de la API. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
});

/** Límite estricto para creación de reservas (protege contra abuso). */
export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
});

/**
 * Límite para consumo de la página de confirmación (GET /api/appointments/:id).
 * Acota la enumeración de IDs por IP.
 */
export const confirmationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
});

/** Límite estricto para autenticación (protege contra fuerza bruta). */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
});