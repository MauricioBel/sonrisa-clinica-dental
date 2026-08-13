export class ApiError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(
    statusCode: number,
    message: string,
    code = 'API_ERROR',
    details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export function notFoundError(resource = 'Recurso') {
  return new ApiError(404, `${resource} no encontrado`, 'NOT_FOUND');
}

export function validationError(message: string, details?: unknown) {
  return new ApiError(400, message, 'VALIDATION_ERROR', details);
}

export function conflictError(message: string, details?: unknown) {
  return new ApiError(409, message, 'CONFLICT', details);
}