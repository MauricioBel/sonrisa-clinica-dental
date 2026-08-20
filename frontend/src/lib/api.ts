import type {
  AdminAppointment,
  AdminAppointmentDetail,
  AdminAppointmentParams,
  AdminTreatment,
  Appointment,
  AuthUser,
  Availability,
  CancelAppointmentPayload,
  ChangeAppointmentStatusPayload,
  CreateAppointmentPayload,
  CreateAppointmentResponse,
  Dentist,
  DentistCreatePayload,
  DentistUpdatePayload,
  LoginPayload,
  LoginResponse,
  RescheduleAppointmentPayload,
  TimeBlock,
  TimeBlockCreatePayload,
  TimeBlockParams,
  Treatment,
  TreatmentCreatePayload,
  TreatmentUpdatePayload,
} from '../types/index.ts';
import { getStoredToken } from './auth.ts';

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

/** Encabezados con el token de sesión del panel admin si existe. */
function withAuth(): Record<string, string> {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Serializa parámetros de query omitiendo valores vacíos/indefinidos. */
function queryString(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
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
  // ---- Panel administrativo ----
  login: (payload: LoginPayload) =>
    request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  me: () => request<AuthUser>('/api/auth/me', { headers: withAuth() }),
  adminAppointments: (params: AdminAppointmentParams = {}) =>
    request<AdminAppointment[]>(
      `/api/admin/appointments${queryString({ ...params })}`,
      { headers: withAuth() },
    ),
  getAdminAppointment: (id: number) =>
    request<AdminAppointmentDetail>(`/api/admin/appointments/${id}`, {
      headers: withAuth(),
    }),
  adminCancelAppointment: (id: number, payload: CancelAppointmentPayload) =>
    request<AdminAppointment>(`/api/admin/appointments/${id}/cancel`, {
      method: 'POST',
      headers: withAuth(),
      body: JSON.stringify(payload),
    }),
  adminChangeAppointmentStatus: (
    id: number,
    payload: ChangeAppointmentStatusPayload,
  ) =>
    request<AdminAppointment>(`/api/admin/appointments/${id}/status`, {
      method: 'PATCH',
      headers: withAuth(),
      body: JSON.stringify(payload),
    }),
  adminRescheduleAppointment: (
    id: number,
    payload: RescheduleAppointmentPayload,
  ) =>
    request<AdminAppointment>(`/api/admin/appointments/${id}/reschedule`, {
      method: 'POST',
      headers: withAuth(),
      body: JSON.stringify(payload),
    }),
  adminDentists: () =>
    request<Dentist[]>('/api/admin/dentists', { headers: withAuth() }),
  getAdminDentist: (id: number) =>
    request<Dentist>(`/api/admin/dentists/${id}`, { headers: withAuth() }),
  createDentist: (payload: DentistCreatePayload) =>
    request<Dentist>('/api/admin/dentists', {
      method: 'POST',
      headers: withAuth(),
      body: JSON.stringify(payload),
    }),
  updateDentist: (id: number, payload: DentistUpdatePayload) =>
    request<Dentist>(`/api/admin/dentists/${id}`, {
      method: 'PATCH',
      headers: withAuth(),
      body: JSON.stringify(payload),
    }),
  setDentistActive: (id: number, isActive: boolean) =>
    request<Dentist>(`/api/admin/dentists/${id}/active`, {
      method: 'PATCH',
      headers: withAuth(),
      body: JSON.stringify({ isActive }),
    }),
  adminTreatments: () =>
    request<AdminTreatment[]>('/api/admin/treatments', {
      headers: withAuth(),
    }),
  getAdminTreatment: (id: number) =>
    request<AdminTreatment>(`/api/admin/treatments/${id}`, {
      headers: withAuth(),
    }),
  createTreatment: (payload: TreatmentCreatePayload) =>
    request<AdminTreatment>('/api/admin/treatments', {
      method: 'POST',
      headers: withAuth(),
      body: JSON.stringify(payload),
    }),
  updateTreatment: (id: number, payload: TreatmentUpdatePayload) =>
    request<AdminTreatment>(`/api/admin/treatments/${id}`, {
      method: 'PATCH',
      headers: withAuth(),
      body: JSON.stringify(payload),
    }),
  setTreatmentActive: (id: number, isActive: boolean) =>
    request<AdminTreatment>(`/api/admin/treatments/${id}/active`, {
      method: 'PATCH',
      headers: withAuth(),
      body: JSON.stringify({ isActive }),
    }),
  adminTimeBlocks: (params: TimeBlockParams = {}) =>
    request<TimeBlock[]>(
      `/api/admin/timeblocks${queryString({ ...params })}`,
      { headers: withAuth() },
    ),
  createTimeBlock: (payload: TimeBlockCreatePayload) =>
    request<TimeBlock>('/api/admin/timeblocks', {
      method: 'POST',
      headers: withAuth(),
      body: JSON.stringify(payload),
    }),
  deleteTimeBlock: (id: number) =>
    request<{ id: number }>(`/api/admin/timeblocks/${id}`, {
      method: 'DELETE',
      headers: withAuth(),
    }),
};