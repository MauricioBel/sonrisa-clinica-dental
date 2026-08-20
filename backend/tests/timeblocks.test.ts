import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  closeTestDatabase,
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

interface TimeBlock {
  id: number;
  dentistId: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string | null;
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

const monday = nextWeekday(1);
const tuesday = nextWeekday(2);
const wednesday = nextWeekday(3);
const thursday = nextWeekday(4);

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

function blockPayload(date: string, startTime: string, endTime: string, overrides: Record<string, unknown> = {}) {
  return {
    dentistId,
    date,
    startTime,
    endTime,
    reason: 'Bloqueo de prueba',
    ...overrides,
  };
}

async function availability(date: string, targetDentistId: number) {
  const query = `/api/availability?date=${date}&treatmentId=${treatmentId}&dentistId=${targetDentistId}`;
  const { status, body } = await request(server.baseUrl, query);
  assert.equal(status, 200);
  return (body as ApiEnvelope<{ slots: string[]; isOpen: boolean }>).data;
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

describe('Acceso administrativo a bloqueos', () => {
  test('sin token devuelve 401', async () => {
    const { status, body } = await request(server.baseUrl, '/api/admin/timeblocks');
    assert.equal(status, 401);
    assert.equal((body as ApiErrorBody).error?.code, 'UNAUTHORIZED');
  });

  test('listado inicial vacío', async () => {
    const { status, body } = await authed('GET', '/api/admin/timeblocks');
    assert.equal(status, 200);
    const blocks = (body as ApiEnvelope<TimeBlock[]>).data;
    assert.deepEqual(blocks, []);
  });
});

describe('Creación de bloqueos (admin)', () => {
  test('crea un bloqueo y devuelve sus datos', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload(tuesday, '09:00', '10:30'),
    );
    assert.equal(status, 201);
    const block = (body as ApiEnvelope<TimeBlock>).data;
    assert.equal(typeof block.id, 'number');
    assert.equal(block.dentistId, dentistId);
    assert.equal(block.date, tuesday);
    assert.equal(block.startTime, '09:00');
    assert.equal(block.endTime, '10:30');
    assert.equal(block.reason, 'Bloqueo de prueba');
  });

  test('rechaza un bloqueo cuyo fin no es posterior al inicio', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload(tuesday, '10:30', '10:00'),
    );
    assert.equal(status, 400);
    assert.equal((body as ApiErrorBody).error?.code, 'VALIDATION_ERROR');
  });

  test('rechaza un bloqueo con fecha inválida', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload('2026-99-99', '09:00', '10:00'),
    );
    assert.equal(status, 400);
    assert.equal((body as ApiErrorBody).error?.code, 'VALIDATION_ERROR');
  });

  test('rechaza un bloqueo para un profesional inexistente', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload(tuesday, '09:00', '10:00', { dentistId: 999999 }),
    );
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });

  test('rechaza un bloqueo que se solapa con otro existente', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload(tuesday, '10:00', '11:00'),
    );
    assert.equal(status, 409);
    assert.equal((body as ApiErrorBody).error?.code, 'CONFLICT');
  });
});

describe('Listado y detalle (admin)', () => {
  test('listado filtrado por fecha devuelve solo ese día', async () => {
    await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload(wednesday, '09:00', '10:00', { reason: 'Otro día' }),
    );

    const { status, body } = await authed(
      'GET',
      `/api/admin/timeblocks?date=${tuesday}`,
    );
    assert.equal(status, 200);
    const blocks = (body as ApiEnvelope<TimeBlock[]>).data;
    assert.ok(blocks.length >= 1);
    assert.ok(blocks.every((b) => b.date === tuesday));
  });

  test('detalle devuelve un bloqueo con el profesional incluido', async () => {
    const list = await authed('GET', `/api/admin/timeblocks?date=${tuesday}`);
    const blocks = (list.body as ApiEnvelope<TimeBlock[]>).data;
    assert.ok(blocks.length > 0);
    const id = blocks[0]?.id as number;

    const { status, body } = await authed('GET', `/api/admin/timeblocks/${id}`);
    assert.equal(status, 200);
    const block = body as ApiEnvelope<TimeBlock & { dentist: { name: string } }>;
    assert.equal(block.data.id, id);
    assert.equal(block.data.dentist.name, 'Dra. Prueba Test');
  });

  test('detalle de un bloqueo inexistente devuelve 404', async () => {
    const { status, body } = await authed('GET', '/api/admin/timeblocks/999999');
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });
});

describe('Eliminación (admin)', () => {
  test('elimina un bloqueo', async () => {
    const created = await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload(wednesday, '11:00', '12:00', { reason: 'A eliminar' }),
    );
    const block = (created.body as ApiEnvelope<TimeBlock>).data;
    const id = block.id;

    const { status, body } = await authed('DELETE', `/api/admin/timeblocks/${id}`);
    assert.equal(status, 200);
    assert.equal((body as ApiEnvelope<{ id: number }>).data.id, id);

    const after = await authed('GET', `/api/admin/timeblocks/${id}`);
    assert.equal(after.status, 404);
  });

  test('eliminar un bloqueo inexistente devuelve 404', async () => {
    const { status, body } = await authed('DELETE', '/api/admin/timeblocks/999999');
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });
});

describe('Integración con disponibilidad', () => {
  test('línea base: sin bloqueos el lunes incluye 09:00', async () => {
    const av = await availability(monday, dentistId);
    assert.ok(av.slots.includes('09:00'));
  });

  test('un bloqueo elimina el slot correspondiente', async () => {
    await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload(monday, '09:00', '09:30'),
    );

    const av = await availability(monday, dentistId);
    assert.ok(!av.slots.includes('09:00'));
    assert.ok(av.slots.includes('09:30'));
  });

  test('el bloqueo no afecta a otros profesionales ni a otros días', async () => {
    // Mismo dentista, otro día sin bloqueos: 09:00 sigue disponible.
    const avThursday = await availability(thursday, dentistId);
    assert.ok(avThursday.slots.includes('09:00'));

    // Otro dentista, misma fecha del bloqueo: 09:00 sigue disponible.
    const avOther = await availability(monday, otherDentistId);
    assert.ok(avOther.slots.includes('09:00'));
  });

  test('bloqueo + reserva coexisten en el cálculo de slots', async () => {
    const booking = await request(server.baseUrl, '/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: 'Juan',
        patientLastName: 'Pérez',
        patientEmail: 'juan.perez@example.com',
        patientPhone: '+56912345678',
        treatmentId,
        dentistId,
        date: wednesday,
        time: '11:00',
      }),
    });
    assert.equal(booking.status, 201);

    await authed(
      'POST',
      '/api/admin/timeblocks',
      blockPayload(wednesday, '11:30', '12:00'),
    );

    const av = await availability(wednesday, dentistId);
    assert.ok(!av.slots.includes('11:00'), 'slot con reserva debe estar ocupado');
    assert.ok(!av.slots.includes('11:30'), 'slot dentro del bloqueo debe estar ocupado');
    assert.ok(av.slots.includes('12:00'), 'slot fuera de ambos debe estar libre');
  });

  test('impedir una reserva en una franja bloqueada devuelve 409', async () => {
    const { status, body } = await request(server.baseUrl, '/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: 'Ana',
        patientLastName: 'López',
        patientEmail: 'ana.lopez@example.com',
        patientPhone: '+56912345678',
        treatmentId,
        dentistId,
        date: monday,
        time: '09:00',
      }),
    });
    assert.equal(status, 409);
    assert.equal((body as ApiErrorBody).error?.code, 'CONFLICT');
  });
});