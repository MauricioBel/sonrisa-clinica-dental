import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  closeTestDatabase,
  nextWeekday,
  removeTestDatabase,
  request,
  resetDatabase,
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

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

let server: TestServer;
let dentistId: number;
let treatmentId: number;
let createdAppointmentId: number;

/** Lunes, Martes y Domingo futuros (fechas deterministas, nunca hoy). */
const monday = nextWeekday(1);
const tuesday = nextWeekday(2);
const sunday = nextWeekday(0);

function bookingPayload(
  date: string,
  time: string,
  overrides: Record<string, unknown> = {},
) {
  return {
    patientName: 'María',
    patientLastName: 'González',
    patientEmail: 'maria.gonzalez@example.com',
    patientPhone: '+56912345678',
    treatmentId,
    dentistId,
    date,
    time,
    comment: 'Reserva de prueba de la suite de regresión.',
    ...overrides,
  };
}

before(async () => {
  resetDatabase();
  const fixture = seedClinic();
  dentistId = fixture.dentistId;
  treatmentId = fixture.treatmentId;
  server = await startTestServer();
});

after(async () => {
  await server.close();
  await closeTestDatabase();
  removeTestDatabase();
});

describe('GET /api/health', () => {
  test('responde 200 con status ok', async () => {
    const { status, body } = await request(server.baseUrl, '/api/health');
    assert.equal(status, 200);
    // El endpoint de health devuelve el objeto directamente (sin envoltorio { data }).
    assert.equal((body as { status: string }).status, 'ok');
  });
});

describe('Ruta desconocida', () => {
  test('responde 404 NOT_FOUND', async () => {
    const { status, body } = await request(server.baseUrl, '/api/no-existe');
    assert.equal(status, 404);
    const error = (body as ApiErrorBody).error;
    assert.equal(error?.code, 'NOT_FOUND');
  });
});

describe('Tratamientos públicos', () => {
  test('GET /api/treatments lista tratamientos ordenados', async () => {
    const { status, body } = await request(server.baseUrl, '/api/treatments');
    assert.equal(status, 200);
    const items = (body as ApiEnvelope<{ slug: string }[]>).data;
    assert.ok(Array.isArray(items));
    assert.ok(items.some((t) => t.slug === 'limpieza-test'));
  });

  test('GET /api/treatments/:slug devuelve el detalle', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/treatments/limpieza-test',
    );
    assert.equal(status, 200);
    const treatment = (body as ApiEnvelope<{ slug: string; durationMinutes: number }>).data;
    assert.equal(treatment.slug, 'limpieza-test');
    assert.equal(treatment.durationMinutes, 30);
  });

  test('GET /api/treatments/:slug desconocido devuelve 404', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/treatments/slug-inexistente',
    );
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });
});

describe('Dentistas públicos', () => {
  test('GET /api/dentists lista solo profesionales activos', async () => {
    const { status, body } = await request(server.baseUrl, '/api/dentists');
    assert.equal(status, 200);
    const items = (body as ApiEnvelope<{ id: number; isActive: boolean }[]>).data;
    assert.ok(Array.isArray(items));
    assert.ok(items.some((d) => d.id === dentistId));
    assert.ok(items.every((d) => d.isActive === true));
  });

  test('GET /api/dentists/:id devuelve el detalle', async () => {
    const { status, body } = await request(
      server.baseUrl,
      `/api/dentists/${dentistId}`,
    );
    assert.equal(status, 200);
    const dentist = (body as ApiEnvelope<{ id: number }>).data;
    assert.equal(dentist.id, dentistId);
  });

  test('GET /api/dentists/:id inexistente devuelve 404', async () => {
    const { status, body } = await request(server.baseUrl, '/api/dentists/999999');
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });

  test('GET /api/dentists/:id no numérico devuelve 400', async () => {
    const { status, body } = await request(server.baseUrl, '/api/dentists/abc');
    assert.equal(status, 400);
    assert.equal((body as ApiErrorBody).error?.code, 'VALIDATION_ERROR');
  });
});

describe('Disponibilidad pública', () => {
  test('día laboral entrega slots válidos', async () => {
    const query = `/api/availability?date=${monday}&treatmentId=${treatmentId}&dentistId=${dentistId}`;
    const { status, body } = await request(server.baseUrl, query);
    assert.equal(status, 200);
    const availability = (body as ApiEnvelope<{
      isOpen: boolean;
      slots: string[];
    }>).data;
    assert.equal(availability.isOpen, true);
    assert.ok(availability.slots.length > 0);
    assert.ok(availability.slots.includes('09:00'));
    assert.ok(availability.slots.every((slot) => TIME_PATTERN.test(slot)));
  });

  test('día sin atención (domingo) entrega isOpen=false', async () => {
    const query = `/api/availability?date=${sunday}&treatmentId=${treatmentId}&dentistId=${dentistId}`;
    const { status, body } = await request(server.baseUrl, query);
    assert.equal(status, 200);
    const availability = (body as ApiEnvelope<{
      isOpen: boolean;
      slots: string[];
    }>).data;
    assert.equal(availability.isOpen, false);
    assert.deepEqual(availability.slots, []);
  });

  test('faltan parámetros obligatorios y devuelve 400', async () => {
    const { status, body } = await request(server.baseUrl, '/api/availability');
    assert.equal(status, 400);
    assert.equal((body as ApiErrorBody).error?.code, 'VALIDATION_ERROR');
  });

  test('fecha inválida devuelve 400', async () => {
    const query = `/api/availability?date=2026-99-99&treatmentId=${treatmentId}&dentistId=${dentistId}`;
    const { status, body } = await request(server.baseUrl, query);
    assert.equal(status, 400);
    assert.equal((body as ApiErrorBody).error?.code, 'VALIDATION_ERROR');
  });

  test('profesional inexistente devuelve 404', async () => {
    const query = `/api/availability?date=${monday}&treatmentId=${treatmentId}&dentistId=999999`;
    const { status, body } = await request(server.baseUrl, query);
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });
});

describe('Reservas (POST /api/appointments)', () => {
  test('crea una reserva CONFIRMED y devuelve id y mensaje', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload(monday, '09:00')),
      },
    );
    assert.equal(status, 201);
    const payload = (body as ApiEnvelope<{
      id: number;
      message: string;
      appointment: { status: string; patientEmail: string };
    }>).data;
    assert.equal(typeof payload.id, 'number');
    assert.equal(payload.message.length > 0, true);
    assert.equal(payload.appointment.status, 'CONFIRMED');
    assert.equal(
      payload.appointment.patientEmail,
      'maria.gonzalez@example.com',
    );
    createdAppointmentId = payload.id;
  });

  test('duplicar la misma hora devuelve 409', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload(monday, '09:00')),
      },
    );
    assert.equal(status, 409);
    assert.equal((body as ApiErrorBody).error?.code, 'CONFLICT');
  });

  test('nombre muy corto devuelve 400 con detalles', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          bookingPayload(monday, '10:00', { patientName: 'A' }),
        ),
      },
    );
    assert.equal(status, 400);
    const error = (body as ApiErrorBody).error;
    assert.equal(error?.code, 'VALIDATION_ERROR');
    assert.ok(Array.isArray(error?.details));
  });

  test('email inválido devuelve 400', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          bookingPayload(monday, '10:00', { patientEmail: 'correo-invalido' }),
        ),
      },
    );
    assert.equal(status, 400);
    assert.equal((body as ApiErrorBody).error?.code, 'VALIDATION_ERROR');
  });

  test('hora malformada devuelve 400', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload(monday, '25:00')),
      },
    );
    assert.equal(status, 400);
    assert.equal((body as ApiErrorBody).error?.code, 'VALIDATION_ERROR');
  });

  test('tratamiento inexistente devuelve 404', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          bookingPayload(monday, '10:00', { treatmentId: 999999 }),
        ),
      },
    );
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });

  test('profesional inexistente devuelve 404', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          bookingPayload(monday, '10:00', { dentistId: 999999 }),
        ),
      },
    );
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });
});

describe('Disponibilidad excluye horas ya reservadas', () => {
  test('tras reservar 09:00, el slot desaparece', async () => {
    const created = await request(
      server.baseUrl,
      '/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload(tuesday, '09:00')),
      },
    );
    assert.equal(created.status, 201);

    const query = `/api/availability?date=${tuesday}&treatmentId=${treatmentId}&dentistId=${dentistId}`;
    const { status, body } = await request(server.baseUrl, query);
    assert.equal(status, 200);
    const availability = (body as ApiEnvelope<{ slots: string[] }>).data;
    assert.ok(!availability.slots.includes('09:00'));
    assert.ok(availability.slots.includes('09:30'));
  });
});

describe('Confirmación (GET /api/appointments/:id)', () => {
  test('devuelve la reserva creada con sus relaciones', async () => {
    const { status, body } = await request(
      server.baseUrl,
      `/api/appointments/${createdAppointmentId}`,
    );
    assert.equal(status, 200);
    const appointment = (body as ApiEnvelope<{
      id: number;
      status: string;
      treatment: { name: string };
      dentist: { name: string };
      patientName: string;
    }>).data;
    assert.equal(appointment.id, createdAppointmentId);
    assert.equal(appointment.status, 'CONFIRMED');
    assert.equal(appointment.treatment.name, 'Limpieza Test');
    assert.equal(appointment.dentist.name, 'Dra. Prueba Test');
    assert.equal(appointment.patientName, 'María');
  });

  test('reserva inexistente devuelve 404', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments/999999',
    );
    assert.equal(status, 404);
    assert.equal((body as ApiErrorBody).error?.code, 'NOT_FOUND');
  });

  test('id no numérico devuelve 400', async () => {
    const { status, body } = await request(
      server.baseUrl,
      '/api/appointments/abc',
    );
    assert.equal(status, 400);
    assert.equal((body as ApiErrorBody).error?.code, 'VALIDATION_ERROR');
  });
});