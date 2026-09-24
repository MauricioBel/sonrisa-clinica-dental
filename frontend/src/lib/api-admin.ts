import type { AdminUser, AdminAppointmentsResponse, AdminAppointment, LoginCredentials, UpdateAppointmentStatusInput } from '../types/admin.ts';

const API_BASE = '/api/admin';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    credentials: 'include',
  });

  let body:
    | { data: T; pagination?: AdminAppointmentsResponse['pagination'] }
    | { error?: { code?: string; message?: string; details?: unknown } }
    | null = null;
  try {
    body = await response.json();
  } catch {
    /* respuesta sin cuerpo JSON */
  }

  if (!response.ok) {
    const error = body && 'error' in body ? body.error : undefined;
    throw new Error(error?.message ?? 'Ocurrió un error inesperado');
  }

  if (!body || !('data' in body)) {
    throw new Error('Respuesta inválida del servidor');
  }

  if ('pagination' in body) {
    return { ...body.data, pagination: body.pagination } as T;
  }

  return body.data;
}

export const adminApi = {
  login: (credentials: LoginCredentials) =>
    request<AdminUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    request<{ message: string }>('/auth/logout', {
      method: 'POST',
    }),

  getAppointments: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    dentistId?: number;
    treatmentId?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }
    return request<AdminAppointmentsResponse>(`/appointments?${searchParams.toString()}`);
  },

  updateAppointmentStatus: (id: number, input: UpdateAppointmentStatusInput) =>
    request<AdminAppointment>(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    }),
};