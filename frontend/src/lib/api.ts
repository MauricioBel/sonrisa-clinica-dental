import type {
  Appointment,
  Availability,
  CreateAppointmentPayload,
  CreateAppointmentResponse,
  Dentist,
  Treatment,
} from '../types/index.ts';

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, message: string, code: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

interface ApiResponse<T> {
  data: T;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  let body:
    | ApiResponse<T>
    | { error?: { code?: string; message?: string; details?: unknown } }
    | null = null;
  try {
    body = await response.json();
  } catch {
    /* respuesta sin cuerpo JSON */
  }

  if (!response.ok) {
    const error = body && 'error' in body ? body.error : undefined;
    throw new ApiError(
      response.status,
      error?.message ?? 'Ocurrió un error inesperado',
      error?.code ?? 'UNKNOWN',
      error?.details,
    );
  }

  if (!body || !('data' in body)) {
    throw new ApiError(500, 'Respuesta inválida del servidor', 'INVALID_RESPONSE');
  }

  return body.data;
}

export const api = {
  getTreatments: () => request<Treatment[]>('/api/treatments'),
  getTreatmentBySlug: (slug: string) =>
    request<Treatment>(`/api/treatments/${encodeURIComponent(slug)}`),
  getDentists: () => request<Dentist[]>('/api/dentists'),
  getAvailability: (params: {
    date: string;
    treatmentId: number;
    dentistId: number;
  }) =>
    request<Availability>(
      `/api/availability?date=${encodeURIComponent(params.date)}&treatmentId=${params.treatmentId}&dentistId=${params.dentistId}`,
    ),
  createAppointment: (payload: CreateAppointmentPayload) =>
    request<CreateAppointmentResponse>('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getAppointment: (id: number) =>
    request<Appointment>(`/api/appointments/${id}`),
};