import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '../generated/prisma/client.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

const isPrismaUniqueError = (e: unknown): boolean =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';

/** Convierte errores Prisma conocidos en ApiError legibles. */
export function prismaErrorHandler(
  err: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (isPrismaUniqueError(err)) {
    next(
      new ApiError(
        409,
        'Esta hora ya fue reservada por otro paciente',
        'CONFLICT',
      ),
    );
    return;
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    next(
      new ApiError(
        400,
        'Los datos enviados no son válidos',
        'VALIDATION_ERROR',
      ),
    );
    return;
  }
  next(err);
}

/** Manejo centralizado de errores. Devuelve un JSON consistente. */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
    });
    return;
  }

  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'El cuerpo de la solicitud no es JSON válido',
      },
    });
    return;
  }

  console.error('[error]', err);
  const message =
    env.nodeEnv === 'production'
      ? 'Error interno del servidor'
      : err instanceof Error
        ? err.message
        : 'Error interno del servidor';

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message,
      ...(env.nodeEnv === 'development'
        ? { stack: err instanceof Error ? err.stack : undefined }
        : {}),
    },
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Ruta no encontrada',
    },
  });
}