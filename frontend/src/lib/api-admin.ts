import type { AdminUser, AdminAppointmentsResponse, AdminAppointment, LoginCredentials, UpdateAppointmentStatusInput } from '../types/admin.ts';

interface Dentist {
  id: number;
  name: string;
  role: string;
  specialty: string;
  businessHours: { dayOfWeek: number; openTime: string; closeTime: string }[];
}

interface Treatment {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  durationMinutes: number;
}

interface CreateAppointmentInput {
  patientName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  comment?: string | null;
  dentistId: number;
  treatmentId: number;
  clinicaId: string;
}

interface DentistsResponse {
  data: Dentist[];
  pagination?: AdminAppointmentsResponse['pagination'];
}

interface TreatmentsResponse {
  data: Treatment[];
  pagination?: AdminAppointmentsResponse['pagination'];
}

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

  // El backend siempre devuelve { data: [...], pagination: {...} }
  // Devolvemos el objeto completo para que el caller acceda a .data y .pagination
  return body as T;
}

function getTodayISO(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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

  getTodayAppointments: (params?: {
    limit?: number;
    status?: string;
    dentistId?: number;
  }) => {
    const today = getTodayISO();
    const searchParams = new URLSearchParams({
      dateFrom: today,
      dateTo: today,
      ...(params?.limit && { limit: String(params.limit) }),
      ...(params?.status && { status: params.status }),
      ...(params?.dentistId && { dentistId: String(params.dentistId) }),
    });
    return request<AdminAppointmentsResponse>(`/appointments?${searchParams.toString()}`);
  },

  getAppointmentMetrics: () => {
    const today = getTodayISO();
    const searchParams = new URLSearchParams({
      dateFrom: today,
      dateTo: today,
      limit: '100',
    });
    return request<AdminAppointmentsResponse>(`/appointments?${searchParams.toString()}`);
  },

  updateAppointmentStatus: (id: number, input: UpdateAppointmentStatusInput) =>
    request<AdminAppointment>(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    }),

  getDentists: () =>
    request<DentistsResponse>('/dentists'),

  getTreatments: () =>
    request<TreatmentsResponse>('/treatments'),

  createAppointment: (input: CreateAppointmentInput) =>
    request<AdminAppointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
};