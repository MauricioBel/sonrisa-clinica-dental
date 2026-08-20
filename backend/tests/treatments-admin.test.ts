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

interface ApiEnvelope<T> {
  data: T;
}

interface ApiErrorBody {
  error?: { code?: string; message?: string; details?: unknown };
}

interface Treatment {
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
  isActive: boolean;
}

interface AuthData {
  token: string;
}

interface Appointment {
  id: number;
  status: string;
  treatmentId: number;
}

const ADMIN_EMAIL = 'admin@test.cl';
const ADMIN_PASSWORD = 'TestAdmin-123';

let server: TestServer;
let dentistId: number;
let treatmentId: number;
let treatmentSlug: string;
let authToken: string;

const monday = nextWeekday(1);

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

function treatmentPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Tratamiento Nuevo Test',
    slug: 'tratamiento-nuevo-test',
    shortDescription: 'Tratamiento de prueba desde el panel.',
    description: 'Descripción completa del tratamiento de prueba administrativo.',
    benefits: ['Beneficio uno', 'Beneficio dos'],
    durationMinutes: 30,
    price: 25000,
    imageUrl: '/images/treatments/nuevo-test.svg',
    ...overrides,
  };
}

async function publicTreatments() {
  const { status, body } = await request(server.baseUrl, '/api/treatments');
  assert.equal(status, 200);
  return (body as ApiEnvelope<Treatment[]>).data;
}

async function book(date: string, time: string) {
  const { status, body } = await request(server.baseUrl, '/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientName: 'Paciente Histórico',
      patientLastName: 'Historia Test',
      patientEmail: 'historia@test.cl',
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

before(async () => {
  resetDatabase();
  const admin = await seedAdmin({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
  assert.ok(admin.id > 0);
  const fixture = seedClinic();
  dentistId = fixture.dentistId;
  treatmentId = fixture.treatmentId;
  treatmentSlug = 'limpieza-test';
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

describe('Acceso administrativo a tratamientos', () => {
  test('sin token devuelve 401', async () => {
    const { status, body } = await request(server.baseUrl, '/api/admin/treatments');
    assert.equal(status, 401);
    assert.equal((body as ApiErrorBody).error?.code, 'UNAUTHORIZED');
  });

  test('listado inicial incluye al tratamiento sembrado', async () => {
    const { status, body } = await authed('GET', '/api/admin/treatments');
    assert.equal(status, 200);
    const treatments = (body as ApiEnvelope<Treatment[]>).data;
    const seeded = treatments.find((t) => t.id === treatmentId);
    assert.ok(seeded);
    assert.equal(seeded.isActive, true);
    assert.ok((seeded as Treatment & { _count: { appointments: number } })._count);
  });
});

describe('Creación de tratamientos (admin)', () => {
  test('crea un tratamiento activo por defecto, visible y reservable', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ name: 'Blanqueo Test', slug: 'blanqueo-test' }),
    );
    assert.equal(status, 201);
    const created = (body as ApiEnvelope<Treatment>).data;
    assert.equal(created.isActive, true);
    assert.equal(created.isFeatured, false);
    assert.equal(created.sortOrder, 0);
    assert.deepEqual(created.benefits, ['Beneficio uno', 'Beneficio dos']);

    const publics = await publicTreatments();
    assert.ok(publics.some((t) => t.slug === 'blanqueo-test'));

    const availability = await request(
      server.baseUrl,
      `/api/availability?date=${monday}&treatmentId=${created.id}&dentistId=${dentistId}`,
    );
    assert.equal(availability.status, 200);
  });

  test('permite crear un tratamiento inactivo fuera del catálogo público', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ name: 'Oculto Test', slug: 'oculto-test', isActive: false }),
    );
    assert.equal(status, 201);
    const created = (body as ApiEnvelope<Treatment>).data;
    assert.equal(created.isActive, false);

    const publics = await publicTreatments();
    assert.ok(!publics.some((t) => t.slug === 'oculto-test'));

    const slugPublic = await request(server.baseUrl, '/api/treatments/oculto-test');
    assert.equal(slugPublic.status, 404);

    const admin = (await authed('GET', '/api/admin/treatments')) as {
      status: number;
      body: ApiEnvelope<Treatment[]>;
    };
    assert.ok(admin.body.data.some((t) => t.id === created.id && !t.isActive));
  });

  test('rechaza un slug duplicado con 409', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ name: 'Duplicado Test', slug: treatmentSlug }),
    );
    assert.equal(status, 409);
    assert.equal((body as ApiErrorBody).error?.code, 'CONFLICT');
  });

  test('rechaza datos inválidos', async () => {
    const badSlug = await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ slug: 'Slug Con Mayúsculas' }),
    );
    assert.equal(badSlug.status, 400);

    const badPrice = await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ slug: 'precio-negativo', price: -100 }),
    );
    assert.equal(badPrice.status, 400);

    const badBenefits = await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ slug: 'sin-beneficios', benefits: [] }),
    );
    assert.equal(badBenefits.status, 400);
  });
});

describe('Edición de tratamientos (admin)', () => {
  test('edita parcialmente conservando el resto de campos', async () => {
    const created = (await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ name: 'Editable Test', slug: 'editable-test' }),
    )) as { status: number; body: ApiEnvelope<Treatment> };
    const id = created.body.data.id;

    const { status, body } = await authed('PATCH', `/api/admin/treatments/${id}`, {
      price: 50000,
      isFeatured: true,
    });
    assert.equal(status, 200);
    const updated = (body as ApiEnvelope<Treatment>).data;
    assert.equal(updated.price, 50000);
    assert.equal(updated.isFeatured, true);
    assert.equal(updated.name, 'Editable Test');
    assert.equal(updated.durationMinutes, 30);
  });

  test('rechaza slug duplicado al editar con 409', async () => {
    const created = (await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ name: 'Renombrable Test', slug: 'renombrable-test' }),
    )) as { status: number; body: ApiEnvelope<Treatment> };
    const id = created.body.data.id;

    const { status } = await authed('PATCH', `/api/admin/treatments/${id}`, {
      slug: treatmentSlug,
    });
    assert.equal(status, 409);
  });

  test('rechaza edición inválida y 404 si no existe', async () => {
    const created = (await authed(
      'POST',
      '/api/admin/treatments',
      treatmentPayload({ name: 'Otra Edición Test', slug: 'otra-edicion' }),
    )) as { status: number; body: ApiEnvelope<Treatment> };
    const id = created.body.data.id;

    const invalid = await authed('PATCH', `/api/admin/treatments/${id}`, {
      durationMinutes: 0,
    });
    assert.equal(invalid.status, 400);

    const missing = await authed('PATCH', '/api/admin/treatments/999999', {
      name: 'Tratamiento X',
    });
    assert.equal(missing.status, 404);
  });
});

describe('Activación / desactivación de tratamientos (admin)', () => {
  test('desactiva sin eliminar: cita histórica se conserva y sale del flujo público', async () => {
    // Reserva previa a la desactivación (historial existente).
    const appointment = await book(monday, '09:00');

    const { status, body } = await authed('PATCH', `/api/admin/treatments/${treatmentId}/active`, {
      isActive: false,
    });
    assert.equal(status, 200);
    assert.equal((body as ApiEnvelope<Treatment>).data.isActive, false);

    // Fuera del catálogo y del flujo de reservas.
    const publics = await publicTreatments();
    assert.ok(!publics.some((t) => t.id === treatmentId));
    const slugPublic = await request(server.baseUrl, `/api/treatments/${treatmentSlug}`);
    assert.equal(slugPublic.status, 404);

    const availability = await request(
      server.baseUrl,
      `/api/availability?date=${monday}&treatmentId=${treatmentId}&dentistId=${dentistId}`,
    );
    assert.equal(availability.status, 404);

    const booking = await request(server.baseUrl, '/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: 'Paciente Nuevo',
        patientLastName: 'Nuevo Test',
        patientEmail: 'nuevo@test.cl',
        patientPhone: '+56912345678',
        treatmentId,
        dentistId,
        date: monday,
        time: '10:00',
      }),
    });
    assert.equal(booking.status, 404);

    // El historial sigue disponible para administración y confirmación pública.
    const admin = (await authed('GET', '/api/admin/treatments')) as {
      status: number;
      body: ApiEnvelope<Treatment[]>;
    };
    assert.ok(admin.body.data.some((t) => t.id === treatmentId && !t.isActive));

    const confirmation = await request(server.baseUrl, `/api/appointments/${appointment.id}`);
    assert.equal(confirmation.status, 200);
    const appt = (confirmation.body as ApiEnvelope<Appointment>).data;
    assert.equal(appt.status, 'CONFIRMED');
    assert.equal(appt.treatmentId, treatmentId);
  });

  test('reactiva y el tratamiento vuelve a estar disponible', async () => {
    const { status, body } = await authed('PATCH', `/api/admin/treatments/${treatmentId}/active`, {
      isActive: true,
    });
    assert.equal(status, 200);
    assert.equal((body as ApiEnvelope<Treatment>).data.isActive, true);

    const publics = await publicTreatments();
    assert.ok(publics.some((t) => t.id === treatmentId));

    const availability = await request(
      server.baseUrl,
      `/api/availability?date=${nextWeekday(2)}&treatmentId=${treatmentId}&dentistId=${dentistId}`,
    );
    assert.equal(availability.status, 200);

    // La reserva vuelve a ser posible.
    const rebook = await book(nextWeekday(2), '09:00');
    assert.equal(rebook.status, 'CONFIRMED');
  });

  test('activar o desactivar un tratamiento inexistente devuelve 404', async () => {
    const { status } = await authed('PATCH', '/api/admin/treatments/999999/active', {
      isActive: false,
    });
    assert.equal(status, 404);
  });
});

describe('Sin eliminación física', () => {
  test('no existe endpoint de borrado de tratamientos', async () => {
    const { status } = await authed('DELETE', `/api/admin/treatments/${treatmentId}`);
    assert.equal(status, 404);
  });
});