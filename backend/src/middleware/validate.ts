import type { NextFunction, Request, Response } from 'express';
import type { z, ZodTypeAny } from 'zod';
import { ApiError } from '../utils/ApiError.js';

interface ValidationResult<T> {
  ok: true;
  data: T;
}

interface ValidationFailure {
  ok: false;
  details: { field: string; message: string }[];
}

function validate<T extends ZodTypeAny>(
  schema: T,
  data: unknown,
): ValidationResult<z.output<T>> | ValidationFailure {
  const result = schema.safeParse(data);
  if (result.success) return { ok: true, data: result.data };
  return {
    ok: false,
    details: result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    })),
  };
}

/**
 * Valida el body de la request con un esquema Zod.
 * En caso de error responde 400 con los errores por campo.
 */
export function validateBody<T extends ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = validate(schema, req.body);
    if (!result.ok) {
      next(
        new ApiError(
          400,
          'Los datos enviados no son válidos',
          'VALIDATION_ERROR',
          result.details,
        ),
      );
      return;
    }
    req.body = result.data;
    next();
  };
}

/**
 * Valida la query string con un esquema Zod.
 * Express 5 expone req.query como getter de solo lectura, por lo que el
 * resultado validado se guarda en `req.validatedQuery`.
 */
export function validateQuery<T extends ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = validate(schema, req.query);
    if (!result.ok) {
      next(
        new ApiError(
          400,
          'Los parámetros de la consulta no son válidos',
          'VALIDATION_ERROR',
          result.details,
        ),
      );
      return;
    }
    req.validatedQuery = result.data as Record<string, unknown>;
    next();
  };
}

/**
 * Valida los parámetros de la URL (por ejemplo /:id) con un esquema Zod.
 * El resultado se guarda en `req.validatedParams` (req.params es de solo
 * lectura en Express 5).
 */
export function validateParams<T extends ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = validate(schema, req.params);
    if (!result.ok) {
      next(
        new ApiError(
          400,
          'Los parámetros de la URL no son válidos',
          'VALIDATION_ERROR',
          result.details,
        ),
      );
      return;
    }
    req.validatedParams = result.data as Record<string, string>;
    next();
  };
}