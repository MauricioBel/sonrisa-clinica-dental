import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import Database from 'better-sqlite3';
import {
  closeTestDatabase,
  DB_PATH,
  nextWeekday,
  removeTestDatabase,
  request,
  resetDatabase,
  seedAdditionalDentist,
  seedAdmin,
  seedClinic,
  startTestServer,
} from './helpers.ts';
import type { TestServer } from './helpers.ts';

interface ApiEnvelope<T> {
  data: T;
}

interface ApiErrorBody {
  error?: { code?: string; message?: string; details?: unknown };
}

interface Appointment {
  id: number;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  source: string;
  cancelReason: string | null;
  canceledAt: string | null;
  rescheduledFromId: number | null;
  conflictKey: string | null;
  dentistId: number;
  treatmentId: number;
}

interface AuthData {
  token: string;
}

const ADMIN_EMAIL = 'admin@test.cl';
const ADMIN_PASSWORD = 'TestAdmin-123';

let server: TestServer;
let dentistId: number;
let treatmentId: number;
let otherDentistId: number;
let authToken: string;

const sunday = nextWeekday(0);
const monday = nextWeekday(1);
const tuesday = nextWeekday(2);
const wednesday = nextWeekday(3);
const thursday = nextWeekday(4);
const friday = nextWeekday(5);
const saturday = nextWeekday(6);

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

async function book(date: string, time: string, overrides: Record<string, unknown> = {}) {
  const { status, body } = await request(server.baseUrl, '/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientName: 'Paciente Test',
      patientLastName: 'Apellido Test',
      patientEmail: 'paciente@test.cl',
      patientPhone: '+56912345678',
      treatmentId,
      dentistId,
      date,
      time,
      ...overrides,
    }),
  });
  assert.equal(status, 201, `reserva falló: ${JSON.stringify(body)}`);
  return (body as ApiEnvelope<{ appointment: Appointment }>).data.appointment;
}

async function availability(date: string) {
  const { status, body } = await request(
    server.baseUrl,
    `/api/availability?date=${date}&treatmentId=${treatmentId}&dentistId=${dentistId}`,
  );
  assert.equal(status, 200);
  return (body as ApiEnvelope<{ slots: string[]; isOpen: boolean }>).data;
}

/** Inserta directamente una cita PENDING (el flujo público solo genera CONFIRMED). */
function insertPending(date: string, time: string): number {
  const db = new Database(DB_PATH);
  const info = db
    .prepare(
      `INSERT INTO "Appointment"
        ("patientName", "patientLastName", "patientEmail", "patientPhone", "date", "time",
         "comment", "status", "source", "conflictKey", "dentistId", "treatmentId", "createdAt")
       VALUES (?, ?, ?, ?, ?, ?, NULL, 'PENDING', 'WEB', ?, ?, ?, ?)`,
    )
    .run(
      'Paciente Pendiente',
      'Pendiente Test',
      'pendiente@test.cl',
      '+56912345678',
      date,
      time,
      `${dentistId}:${date}:${time}`,
      dentistId,
      treatmentId,
      new Date().toISOString(),
    );
  db.close();
  return Number(info.lastInsertRowid);
}

before(async () => {
  resetDatabase();
  const admin = await seedAdmin({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
  assert.ok(admin.id > 0);
  const fixture = seedClinic();
  dentistId = fixture.dentistId;
  treatmentId = fixture.treatmentId;
  otherDentistId = seedAdditionalDentist();
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

describe('Acceso administrativo a citas', () => {
  test('sin token devuelve 401', async () => {
    const { status, body } = await request(server.baseUrl, '/api/admin/appointments');
    assert.equal(status, 401);
    assert.equal((body as ApiErrorBody).error?.code, 'UNAUTHORIZED');
  });

  test('listado inicial vacío', async () => {
    const { status, body } = await authed('GET', '/api/admin/appointments');
    assert.equal(status, 200);
    assert.deepEqual((body as ApiEnvelope<Appointment[]>).data, []);
  });
});

describe('Cancelación de citas (admin)', () => {
  test('cancela una cita CONFIRMED y registra motivo y fecha', async () => {
    const appt = await book(monday, '09:00');
    const { status, body } = await authed('POST', `/api/admin/appointments/${appt.id}/cancel`, {
      reason: 'El paciente no puede asistir',
    });
    assert.equal(status, 200);
    const cancelled = (body as ApiEnvelope<Appointment>).data;
    assert.equal(cancelled.status, 'CANCELLED');
    assert.equal(cancelled.cancelReason, 'El paciente no puede asistir');
    assert.ok(cancelled.canceledAt);
    assert.equal(cancelled.conflictKey, null);
  });

  test('requiere un motivo válido', async () => {
    const appt = await book(monday, '09:30');
    const { status } = await authed('POST', `/api/admin/appointments/${appt.id}/cancel`, {
      reason: 'x',
    });
    assert.equal(status, 400);
  });

  test('rechaza cancelar una cita ya cancelada', async () => {
    const appt = await book(monday, '10:00');
    await authed('POST', `/api/admin/appointments/${appt.id}/cancel`, { reason: 'Motivo válido' });
    const { status, body } = await authed('POST', `/api/admin/appointments/${appt.id}/cancel`, {
      reason: 'Intentar de nuevo',
    });
    assert.equal(status, 409);
    assert.equal((body as ApiErrorBody).error?.code, 'CONFLICT');
  });

  test('rechaza cancelar una cita completada', async () => {
    const appt = await book(monday, '10:30');
    await authed('PATCH', `/api/admin/appointments/${appt.id}/status`, { status: 'COMPLETED' });
    const { status } = await authed('POST', `/api/admin/appointments/${appt.id}/cancel`, {
      reason: 'Motivo válido',
    });
    assert.equal(status, 409);
  });

  test('el slot cancelado vuelve a estar disponible y es reservable de nuevo', async () => {
    const appt = await book(monday, '11:00');
    await authed('POST', `/api/admin/appointments/${appt.id}/cancel`, { reason: 'Motivo válido' });

    const { slots } = await availability(monday);
    assert.ok(slots.includes('11:00'), 'slot cancelado debe reaparecer');

    const rebook = await book(monday, '11:00');
    assert.equal(rebook.status, 'CONFIRMED');
  });
});

describe('Cambio de estado de citas (admin)', () => {
  test('confirma una cita PENDING', async () => {
    const id = insertPending(tuesday, '09:00');
    const { status, body } = await authed('PATCH', `/api/admin/appointments/${id}/status`, {
      status: 'CONFIRMED',
    });
    assert.equal(status, 200);
    assert.equal((body as ApiEnvelope<Appointment>).data.status, 'CONFIRMED');
  });

  test('completa una cita CONFIRMED', async () => {
    const appt = await book(tuesday, '11:00');
    const { status, body } = await authed('PATCH', `/api/admin/appointments/${appt.id}/status`, {
      status: 'COMPLETED',
    });
    assert.equal(status, 200);
    assert.equal((body as ApiEnvelope<Appointment>).data.status, 'COMPLETED');
  });

  test('completa una cita PENDING', async () => {
    const id = insertPending(tuesday, '10:00');
    const { status, body } = await authed('PATCH', `/api/admin/appointments/${id}/status`, {
      status: 'COMPLETED',
    });
    assert.equal(status, 200);
    assert.equal((body as ApiEnvelope<Appointment>).data.status, 'COMPLETED');
  });

  test('rechaza transiciones inválidas y estados finales', async () => {
    const appt = await book(tuesday, '12:00');
    await authed('PATCH', `/api/admin/appointments/${appt.id}/status`, { status: 'COMPLETED' });
    const { status, body } = await authed('PATCH', `/api/admin/appointments/${appt.id}/status`, {
      status: 'CONFIRMED',
    });
    assert.equal(status, 409);
    assert.equal((body as ApiErrorBody).error?.code, 'CONFLICT');
  });

  test('la cancelación no se realiza por el endpoint de estado', async () => {
    const appt = await book(tuesday, '13:00');
    const { status } = await authed('PATCH', `/api/admin/appointments/${appt.id}/status`, {
      status: 'CANCELLED',
    });
    assert.equal(status, 409);
  });

  test('rechaza cuerpo inválido', async () => {
    const { status } = await authed('PATCH', `/api/admin/appointments/1/status`, {
      status: 'BOGUS',
    });
    assert.equal(status, 400);
  });

  test('cita inexistente devuelve 404', async () => {
    const { status } = await authed('PATCH', '/api/admin/appointments/999999/status', {
      status: 'CONFIRMED',
    });
    assert.equal(status, 404);
  });
});

describe('Reagendamiento de citas (admin)', () => {
  // Reutilizado por tests posteriores para evitar llamadas extra a /api/appointments
  // sin superar el rate limit de reservas (20 por IP).
  let thursdayNineId = 0;

  test('reagenda a otro horario conservando paciente y tratamiento', async () => {
    const appt = await book(wednesday, '09:00');
    const { status, body } = await authed('POST', `/api/admin/appointments/${appt.id}/reschedule`, {
      date: thursday,
      startTime: '09:00',
    });
    assert.equal(status, 201);
    const created = (body as ApiEnvelope<Appointment>).data;
    assert.equal(created.status, 'CONFIRMED');
    assert.equal(created.source, 'ADMIN');
    assert.equal(created.rescheduledFromId, appt.id);
    assert.equal(created.patientName, appt.patientName);
    assert.equal(created.treatmentId, appt.treatmentId);
    assert.equal(created.date, thursday);
    assert.equal(created.time, '09:00');
    thursdayNineId = created.id;

    // La original queda cancelada y su franja libre.
    const original = (await authed('GET', `/api/admin/appointments/${appt.id}`)) as {
      status: number;
      body: ApiEnvelope<Appointment>;
    };
    assert.equal(original.status, 200);
    assert.equal(original.body.data.status, 'CANCELLED');
    const { slots } = await availability(wednesday);
    assert.ok(slots.includes('09:00'));
  });

  test('permite cambiar de profesional en el reagendamiento', async () => {
    const appt = await book(wednesday, '10:00');
    const { status, body } = await authed('POST', `/api/admin/appointments/${appt.id}/reschedule`, {
      date: thursday,
      startTime: '10:00',
      dentistId: otherDentistId,
    });
    assert.equal(status, 201);
    assert.equal((body as ApiEnvelope<Appointment>).data.dentistId, otherDentistId);
  });

  test('rechaza reagendar a la misma franja', async () => {
    // Cita CONFIRMED creada por el reagendamiento del primer test del bloque.
    const { status } = await authed('POST', `/api/admin/appointments/${thursdayNineId}/reschedule`, {
      date: thursday,
      startTime: '09:00',
    });
    assert.equal(status, 409);
  });

  test('rechaza reagendar a una franja ya ocupada', async () => {
    // El jueves 09:00 ya está ocupada por la cita reagendada en el primer test
    // del bloque (mismo dentista, CONFIRMED). Debe rechazarse con conflicto.
    const appt = await book(wednesday, '12:00');
    const { status, body } = await authed('POST', `/api/admin/appointments/${appt.id}/reschedule`, {
      date: thursday,
      startTime: '09:00',
    });
    assert.equal(status, 409);
    assert.equal((body as ApiErrorBody).error?.code, 'CONFLICT');
  });

  test('rechaza reagendar a una franja bloqueada', async () => {
    await authed('POST', '/api/admin/timeblocks', {
      dentistId,
      date: friday,
      startTime: '11:00',
      endTime: '12:00',
      reason: 'Ferias',
    });
    const appt = await book(wednesday, '13:00');
    const { status } = await authed('POST', `/api/admin/appointments/${appt.id}/reschedule`, {
      date: friday,
      startTime: '11:00',
    });
    assert.equal(status, 409);
  });

  test('rechaza reagendar a un día sin atención', async () => {
    const appt = await book(wednesday, '14:00');
    const { status } = await authed('POST', `/api/admin/appointments/${appt.id}/reschedule`, {
      date: sunday,
      startTime: '09:00',
    });
    assert.equal(status, 409);
  });

  test('rechaza reagendar una cita cancelada', async () => {
    const appt = await book(wednesday, '15:00');
    await authed('POST', `/api/admin/appointments/${appt.id}/cancel`, { reason: 'Motivo válido' });
    const { status } = await authed('POST', `/api/admin/appointments/${appt.id}/reschedule`, {
      date: thursday,
      startTime: '15:00',
    });
    assert.equal(status, 409);
  });

  test('rechaza datos inválidos', async () => {
    const { status } = await authed('POST', '/api/admin/appointments/1/reschedule', {
      date: '2026-02-30',
      startTime: '99:99',
    });
    assert.equal(status, 400);
  });

  test('cita inexistente devuelve 404', async () => {
    const { status } = await authed('POST', '/api/admin/appointments/999999/reschedule', {
      date: thursday,
      startTime: '09:00',
    });
    assert.equal(status, 404);
  });

  test('el detalle expone la cadena de reagendamiento', async () => {
    const appt = await book(thursday, '15:00');
    await authed('POST', `/api/admin/appointments/${appt.id}/reschedule`, {
      date: friday,
      startTime: '15:00',
    });

    const detail = (await authed('GET', `/api/admin/appointments/${appt.id}`)) as {
      status: number;
      body: ApiEnvelope<
        Appointment & {
          rescheduledFrom: Appointment | null;
          rescheduledTo: Appointment[];
        }
      >;
    };
    assert.equal(detail.status, 200);
    assert.equal(detail.body.data.status, 'CANCELLED');
    assert.equal(detail.body.data.rescheduledTo.length, 1);
    const movedId = detail.body.data.rescheduledTo[0]!.id;

    const moved = (await authed('GET', `/api/admin/appointments/${movedId}`)) as {
      status: number;
      body: ApiEnvelope<
        Appointment & { rescheduledFrom: Appointment | null; rescheduledTo: Appointment[] }
      >;
    };
    assert.equal(moved.status, 200);
    assert.equal(moved.body.data.rescheduledFrom?.id, appt.id);
  });
});

describe('Listado y detalle (admin)', () => {
  test('filtra por estado y por dentista', async () => {
    const a = await book(saturday, '09:00');
    const b = await book(saturday, '10:00');
    await authed('POST', `/api/admin/appointments/${b.id}/cancel`, { reason: 'Motivo válido' });

    const cancelled = (await authed('GET', `/api/admin/appointments?status=CANCELLED&date=${saturday}`)) as {
      status: number;
      body: ApiEnvelope<Appointment[]>;
    };
    assert.equal(cancelled.status, 200);
    assert.equal(cancelled.body.data.length, 1);
    assert.equal(cancelled.body.data[0]!.id, b.id);

    const confirmed = (await authed('GET', `/api/admin/appointments?status=CONFIRMED&date=${saturday}`)) as {
      status: number;
      body: ApiEnvelope<Appointment[]>;
    };
    assert.equal(confirmed.body.data.length, 1);
    assert.equal(confirmed.body.data[0]!.id, a.id);

    const byDentist = (await authed('GET', `/api/admin/appointments?dentistId=${dentistId}`)) as {
      status: number;
      body: ApiEnvelope<Appointment[]>;
    };
    assert.equal(byDentist.status, 200);
    assert.ok(
      byDentist.body.data.every((appt) => appt.dentistId === dentistId),
    );

    const none = (await authed('GET', `/api/admin/appointments?dentistId=999999`)) as {
      status: number;
      body: ApiEnvelope<Appointment[]>;
    };
    assert.equal(none.status, 200);
    assert.deepEqual(none.body.data, []);

    // Cada cita creada por el flujo público expone su origen WEB y el detalle
    // administrativo conserva los datos de la reserva.
    assert.equal(a.source, 'WEB');
    const detail = (await authed('GET', `/api/admin/appointments/${a.id}`)) as {
      status: number;
      body: ApiEnvelope<Appointment>;
    };
    assert.equal(detail.status, 200);
    assert.equal(detail.body.data.source, 'WEB');
    assert.equal(detail.body.data.patientName, 'Paciente Test');
  });

  test('detalle inexistente devuelve 404', async () => {
    const { status } = await authed('GET', '/api/admin/appointments/999999');
    assert.equal(status, 404);
  });
});