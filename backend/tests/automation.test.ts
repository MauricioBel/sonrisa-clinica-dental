import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  closeTestDatabase,
  nextWeekday,
  removeTestDatabase,
  request,
  resetDatabase,
  seedAdmin,
  seedClinic,
  startTestServer,
} from './helpers.ts';
import type { TestServer } from './helpers.ts';
import { EventBus } from '../src/automation/eventBus.js';
import { clearEventHistory, getEventHistory } from '../src/automation/index.js';
import type {
  AppointmentCancelledEvent,
  AppointmentCreatedEvent,
  AppointmentRescheduledEvent,
  AppointmentUpdatedEvent,
  DentistActivatedEvent,
  DentistCreatedEvent,
  DentistDeactivatedEvent,
  DentistUpdatedEvent,
  TreatmentActivatedEvent,
  TreatmentCreatedEvent,
  TreatmentDeactivatedEvent,
  TreatmentUpdatedEvent,
} from '../src/automation/events.js';

interface ApiEnvelope<T> {
  data: T;
}

interface AuthData {
  token: string;
}

interface Appointment {
  id: number;
  status: string;
  source: string;
}

const ADMIN_EMAIL = 'admin@test.cl';
const ADMIN_PASSWORD = 'TestAdmin-123';

let server: TestServer;
let dentistId: number;
let treatmentId: number;
let authToken: string;

const monday = nextWeekday(1);
const tuesday = nextWeekday(2);

function dentistPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Dr. Automatización Test',
    role: 'Odontólogo General',
    specialty: 'Odontología General',
    description: 'Profesional creado para la suite de automatización.',
    experienceYears: 5,
    imageUrl: '/images/dentists/auto-test.svg',
    ...overrides,
  };
}

function treatmentPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Tratamiento Automatización Test',
    slug: 'tratamiento-auto-test',
    shortDescription: 'Tratamiento de prueba de automatización.',
    description: 'Descripción completa del tratamiento de automatización.',
    benefits: ['Beneficio uno'],
    durationMinutes: 30,
    price: 20000,
    imageUrl: '/images/treatments/auto-test.svg',
    ...overrides,
  };
}

async function authed(method: string, pathname: string, body?: unknown) {
  return request(server.baseUrl, pathname, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
}

async function book(date: string, time: string) {
  const { status, body } = await request(server.baseUrl, '/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientName: 'Paciente Auto',
      patientLastName: 'Automatización',
      patientEmail: 'auto@test.cl',
      patientPhone: '+56912345678',
      treatmentId,
      dentistId,
      date,
      time,
    }),
  });
  assert.equal(status, 201, `reserva falló: ${JSON.stringify(body)}`);
  return (body as ApiEnvelope<{ appointment: Appointment }>).data.appointment;
}

describe('EventBus (unidad)', () => {
  test('entrega eventos solo a los suscriptores de su tipo', async () => {
    const bus = new EventBus('unit');
    const seen: string[] = [];
    const unsubscribe = bus.subscribe('dentist.activated', (event) => {
      seen.push(event.type);
    });

    await bus.emit({
      type: 'dentist.activated',
      occurredAt: new Date().toISOString(),
      data: { dentistId: 1, name: 'Dr. Uno' },
    });
    await bus.emit({
      type: 'treatment.deactivated',
      occurredAt: new Date().toISOString(),
      data: { treatmentId: 2, name: 'Tto' },
    });

    assert.deepEqual(seen, ['dentist.activated']);
    unsubscribe();
  });

  test('un suscriptor que falla no propaga el error ni bloquea a otros', async () => {
    const bus = new EventBus('unit');
    const executed: string[] = [];
    bus.subscribe('dentist.activated', () => {
      throw new Error('fallo intencional de acción');
    }, 'accion-que-falla');
    bus.subscribe('dentist.activated', () => {
      executed.push('accion-b');
    });

    await assert.doesNotReject(
      bus.emit({
        type: 'dentist.activated',
        occurredAt: new Date().toISOString(),
        data: { dentistId: 1, name: 'Dr. Uno' },
      }),
    );
    assert.deepEqual(executed, ['accion-b']);
  });

  test('unsubscribe detiene la entrega de eventos', async () => {
    const bus = new EventBus('unit');
    const seen: string[] = [];
    const unsubscribe = bus.subscribe('dentist.activated', (event) => {
      seen.push(event.type);
    });
    unsubscribe();

    await bus.emit({
      type: 'dentist.activated',
      occurredAt: new Date().toISOString(),
      data: { dentistId: 1, name: 'Dr. Uno' },
    });

    assert.deepEqual(seen, []);
  });
});

describe('Automatización (integración)', () => {
  before(async () => {
    resetDatabase();
    await seedAdmin({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    const fixture = seedClinic();
    dentistId = fixture.dentistId;
    treatmentId = fixture.treatmentId;
    server = await startTestServer();

    const login = await request(server.baseUrl, '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });
    assert.equal(login.status, 200);
    authToken = (login.body as ApiEnvelope<AuthData>).data.token;
  });

  after(async () => {
    await server.close();
    await closeTestDatabase();
    removeTestDatabase();
  });

  test('crear una reserva emite appointment.created', async () => {
    clearEventHistory();
    const created = await book(tuesday, '09:00');

    const history = getEventHistory('appointment.created');
    assert.equal(history.length, 1);
    const event = history[0] as AppointmentCreatedEvent;
    assert.equal(event.data.appointment.id, created.id);
    assert.equal(event.data.source, 'WEB');
    assert.equal(event.data.appointment.patient.email, 'auto@test.cl');
  });

  test('cancelar una cita emite appointment.cancelled', async () => {
    clearEventHistory();
    const created = await book(monday, '09:00');

    const result = await authed(
      'POST',
      `/api/admin/appointments/${created.id}/cancel`,
      { reason: 'Paciente no puede asistir' },
    );
    assert.equal(result.status, 200);

    const event = getEventHistory('appointment.cancelled')[0] as
      | AppointmentCancelledEvent
      | undefined;
    assert.ok(event);
    assert.equal(event.data.appointmentId, created.id);
    assert.equal(event.data.reason, 'Paciente no puede asistir');
  });

  test('cambiar estado emite appointment.updated', async () => {
    clearEventHistory();
    const created = await book(monday, '11:00');

    const result = await authed(
      'PATCH',
      `/api/admin/appointments/${created.id}/status`,
      { status: 'COMPLETED' },
    );
    assert.equal(result.status, 200);

    const event = getEventHistory('appointment.updated')[0] as
      | AppointmentUpdatedEvent
      | undefined;
    assert.ok(event);
    assert.equal(event.data.appointmentId, created.id);
    assert.equal(event.data.previousStatus, 'CONFIRMED');
    assert.equal(event.data.newStatus, 'COMPLETED');
  });

  test('reagendar emite appointment.cancelled y appointment.rescheduled', async () => {
    clearEventHistory();
    const created = await book(tuesday, '10:00');

    const result = await authed(
      'POST',
      `/api/admin/appointments/${created.id}/reschedule`,
      { date: tuesday, startTime: '12:00' },
    );
    assert.equal(result.status, 201);

    const cancelled = getEventHistory('appointment.cancelled')[0] as
      | AppointmentCancelledEvent
      | undefined;
    assert.ok(cancelled);
    assert.equal(cancelled.data.appointmentId, created.id);
    assert.equal(cancelled.data.reason, 'Reagendada por el administrador');

    const rescheduled = getEventHistory('appointment.rescheduled')[0] as
      | AppointmentRescheduledEvent
      | undefined;
    assert.ok(rescheduled);
    assert.equal(rescheduled.data.previousAppointmentId, created.id);
    assert.equal(rescheduled.data.newDate, tuesday);
    assert.equal(rescheduled.data.newTime, '12:00');
  });

  test('operaciones de dentista emiten creados/actualizaciones/activaciones', async () => {
    clearEventHistory();

    const createdRes = await authed('POST', '/api/admin/dentists', dentistPayload());
    assert.equal(createdRes.status, 201);
    const dentistIdCreated = (createdRes.body as ApiEnvelope<{ id: number }>).data.id;
    const created = getEventHistory('dentist.created')[0] as
      | DentistCreatedEvent
      | undefined;
    assert.ok(created);
    assert.equal(created.data.dentistId, dentistIdCreated);
    assert.equal(created.data.isActive, true);

    await authed('PATCH', `/api/admin/dentists/${dentistIdCreated}`, {
      specialty: 'Endodoncia',
    });
    const updated = getEventHistory('dentist.updated')[0] as
      | DentistUpdatedEvent
      | undefined;
    assert.ok(updated);
    assert.equal(updated.data.dentistId, dentistIdCreated);

    await authed('PATCH', `/api/admin/dentists/${dentistIdCreated}/active`, {
      isActive: false,
    });
    const deactivated = getEventHistory('dentist.deactivated')[0] as
      | DentistDeactivatedEvent
      | undefined;
    assert.ok(deactivated);
    assert.equal(deactivated.data.dentistId, dentistIdCreated);

    await authed('PATCH', `/api/admin/dentists/${dentistIdCreated}/active`, {
      isActive: true,
    });
    const activated = getEventHistory('dentist.activated')[0] as
      | DentistActivatedEvent
      | undefined;
    assert.ok(activated);
    assert.equal(activated.data.dentistId, dentistIdCreated);
  });

  test('operaciones de tratamiento emiten creados/actualizaciones/activaciones', async () => {
    clearEventHistory();

    const createdRes = await authed('POST', '/api/admin/treatments', treatmentPayload());
    assert.equal(createdRes.status, 201);
    const treatmentIdCreated = (createdRes.body as ApiEnvelope<{ id: number }>).data.id;
    const created = getEventHistory('treatment.created')[0] as
      | TreatmentCreatedEvent
      | undefined;
    assert.ok(created);
    assert.equal(created.data.treatmentId, treatmentIdCreated);
    assert.equal(created.data.isActive, true);

    await authed('PATCH', `/api/admin/treatments/${treatmentIdCreated}`, {
      price: 30000,
    });
    const updated = getEventHistory('treatment.updated')[0] as
      | TreatmentUpdatedEvent
      | undefined;
    assert.ok(updated);
    assert.equal(updated.data.treatmentId, treatmentIdCreated);

    await authed('PATCH', `/api/admin/treatments/${treatmentIdCreated}/active`, {
      isActive: false,
    });
    const deactivated = getEventHistory('treatment.deactivated')[0] as
      | TreatmentDeactivatedEvent
      | undefined;
    assert.ok(deactivated);
    assert.equal(deactivated.data.treatmentId, treatmentIdCreated);

    await authed('PATCH', `/api/admin/treatments/${treatmentIdCreated}/active`, {
      isActive: true,
    });
    const activated = getEventHistory('treatment.activated')[0] as
      | TreatmentActivatedEvent
      | undefined;
    assert.ok(activated);
    assert.equal(activated.data.treatmentId, treatmentIdCreated);
  });

  test('getEventHistory devuelve copias y clearEventHistory vacía el historial', () => {
    clearEventHistory();
    assert.deepEqual(getEventHistory(), []);
    const history = getEventHistory('appointment.created');
    assert.deepEqual(history, []);
  });
});