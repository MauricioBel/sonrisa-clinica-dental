export interface AdminUser {
  id: number;
  email: string;
  nombre: string;
  clinicaId: string;
  clinicaNombre: string;
}

export interface AdminAppointment {
  id: number;
  patientName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  comment: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  dentistId: number;
  treatmentId: number;
  dentist: {
    id: number;
    name: string;
    role: string;
    specialty: string;
  };
  treatment: {
    id: number;
    name: string;
    durationMinutes: number;
    price: number;
  };
  createdAt: string;
}

export interface AdminAppointmentsResponse {
  data: AdminAppointment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: AdminUser;
}

export type UpdateAppointmentStatusInput = {
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
};