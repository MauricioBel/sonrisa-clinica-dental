export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export interface PatientInfo {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AppointmentInfo {
  id: number;
  date: string;
  time: string;
  comment: string | null;
  treatment: { id: number; name: string };
  dentist: { id: number; name: string };
  patient: PatientInfo;
}

export interface AppointmentCreatedEvent {
  type: 'appointment.created';
  occurredAt: string;
  data: {
    appointment: AppointmentInfo;
    source: 'WEB' | 'ADMIN';
  };
}

export interface AppointmentUpdatedEvent {
  type: 'appointment.updated';
  occurredAt: string;
  data: {
    appointmentId: number;
    previousStatus: AppointmentStatus;
    newStatus: AppointmentStatus;
  };
}

export interface AppointmentCancelledEvent {
  type: 'appointment.cancelled';
  occurredAt: string;
  data: {
    appointmentId: number;
    reason: string;
    date: string;
    time: string;
    patient: PatientInfo;
  };
}

export interface AppointmentRescheduledEvent {
  type: 'appointment.rescheduled';
  occurredAt: string;
  data: {
    previousAppointmentId: number;
    newAppointmentId: number;
    previousDate: string;
    previousTime: string;
    newDate: string;
    newTime: string;
    previousDentistId: number;
    newDentistId: number;
    patient: PatientInfo;
    treatment: { id: number; name: string };
  };
}

export interface DentistCreatedEvent {
  type: 'dentist.created';
  occurredAt: string;
  data: {
    dentistId: number;
    name: string;
    role: string;
    specialty: string;
    isActive: boolean;
  };
}

export interface DentistUpdatedEvent {
  type: 'dentist.updated';
  occurredAt: string;
  data: {
    dentistId: number;
    name: string;
    role: string;
    specialty: string;
    isActive: boolean;
  };
}

export interface DentistActivatedEvent {
  type: 'dentist.activated';
  occurredAt: string;
  data: { dentistId: number; name: string };
}

export interface DentistDeactivatedEvent {
  type: 'dentist.deactivated';
  occurredAt: string;
  data: { dentistId: number; name: string };
}

export interface TreatmentCreatedEvent {
  type: 'treatment.created';
  occurredAt: string;
  data: {
    treatmentId: number;
    name: string;
    slug: string;
    isActive: boolean;
  };
}

export interface TreatmentUpdatedEvent {
  type: 'treatment.updated';
  occurredAt: string;
  data: {
    treatmentId: number;
    name: string;
    slug: string;
    isActive: boolean;
  };
}

export interface TreatmentActivatedEvent {
  type: 'treatment.activated';
  occurredAt: string;
  data: { treatmentId: number; name: string };
}

export interface TreatmentDeactivatedEvent {
  type: 'treatment.deactivated';
  occurredAt: string;
  data: { treatmentId: number; name: string };
}

export type DomainEvent =
  | AppointmentCreatedEvent
  | AppointmentUpdatedEvent
  | AppointmentCancelledEvent
  | AppointmentRescheduledEvent
  | DentistCreatedEvent
  | DentistUpdatedEvent
  | DentistActivatedEvent
  | DentistDeactivatedEvent
  | TreatmentCreatedEvent
  | TreatmentUpdatedEvent
  | TreatmentActivatedEvent
  | TreatmentDeactivatedEvent;

export const EVENT_TYPES: DomainEvent['type'][] = [
  'appointment.created',
  'appointment.updated',
  'appointment.cancelled',
  'appointment.rescheduled',
  'dentist.created',
  'dentist.updated',
  'dentist.activated',
  'dentist.deactivated',
  'treatment.created',
  'treatment.updated',
  'treatment.activated',
  'treatment.deactivated',
];
