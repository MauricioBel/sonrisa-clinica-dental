import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../lib/token.js';

/**
 * Exige un token Bearer válido. En caso contrario responde 401 y no continúa.
 * El payload verificado queda en `req.auth` para los servicios posteriores.
 */
export function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7).trim() : undefined;

  if (!token) {
    next(new ApiError(401, 'Autenticación requerida', 'UNAUTHORIZED'));
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    next(new ApiError(401, 'Sesión inválida o expirada', 'UNAUTHORIZED'));
    return;
  }

  req.auth = payload;
  next();
}