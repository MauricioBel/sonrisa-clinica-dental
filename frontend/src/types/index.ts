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

// ---------- Panel administrativo ----------

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
  expiresInSeconds: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type AppointmentSource = 'WEB' | 'ADMIN';

export interface AppointmentTreatment {
  id: number;
  name: string;
  slug: string;
  durationMinutes: number;
  price: number;
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
  status: AppointmentStatus;
  source: AppointmentSource;
  cancelReason: string | null;
  canceledAt: string | null;
  rescheduledFromId: number | null;
  dentistId: number;
  treatmentId: number;
  dentist: AppointmentDentist;
  treatment: AppointmentTreatment;
}

export interface AdminAppointmentDetail extends AdminAppointment {
  rescheduledFrom: AdminAppointment | null;
  rescheduledTo: AdminAppointment[];
}

export interface AdminAppointmentParams {
  status?: AppointmentStatus;
  dentistId?: number;
  date?: string;
  from?: string;
  to?: string;
}

export interface CancelAppointmentPayload {
  reason: string;
}

export interface ChangeAppointmentStatusPayload {
  status: AppointmentStatus;
}

export interface RescheduleAppointmentPayload {
  date: string;
  startTime: string;
  dentistId?: number;
}

export interface AdminTreatment extends Treatment {
  isActive: boolean;
  _count: { appointments: number };
}

export interface DentistCreatePayload {
  name: string;
  role: string;
  specialty: string;
  description: string;
  experienceYears: number;
  imageUrl: string;
  isActive?: boolean;
}

export type DentistUpdatePayload = Partial<
  Omit<DentistCreatePayload, 'isActive'>
>;

export interface TreatmentCreatePayload {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  durationMinutes: number;
  price: number;
  imageUrl: string;
  isFeatured?: boolean;
  sortOrder?: number;
  isActive?: boolean;
}

export type TreatmentUpdatePayload = Partial<
  Omit<TreatmentCreatePayload, 'isActive'>
>;

export interface TimeBlock {
  id: number;
  dentistId: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string | null;
  dentist: AppointmentDentist;
}

export interface TimeBlockCreatePayload {
  dentistId: number;
  date: string;
  startTime: string;
  endTime: string;
  reason?: string | null;
}

export interface TimeBlockParams {
  dentistId?: number;
  date?: string;
}