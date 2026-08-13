export interface BusinessHour {
  id: number;
  dentistId: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export interface Dentist {
  id: number;
  name: string;
  role: string;
  specialty: string;
  description: string;
  experienceYears: number;
  imageUrl: string;
  isActive: boolean;
  businessHours: BusinessHour[];
}

export interface Treatment {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  durationMinutes: number;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  sortOrder: number;
}

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export interface AppointmentDentist {
  id: number;
  name: string;
  role: string;
  specialty: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  comment: string | null;
  status: AppointmentStatus;
  dentistId: number;
  treatmentId: number;
  dentist: AppointmentDentist;
  treatment: Treatment;
}

export interface Availability {
  date: string;
  dentistId: number;
  treatmentId: number;
  durationMinutes: number;
  slots: string[];
  isOpen: boolean;
}

export interface CreateAppointmentPayload {
  patientName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  treatmentId: number;
  dentistId: number;
  date: string;
  time: string;
  comment?: string | null;
}

export interface CreateAppointmentResponse {
  id: number;
  message: string;
  appointment: Appointment;
}