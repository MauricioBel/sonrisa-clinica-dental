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

interface DentalBusinessHours {
  id: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

interface DentistRecord {
  id: number;
  name: string;
  role: string;
  specialty: string;
  description: string;
  experienceYears: number;
  imageUrl: string;
  isActive: boolean;
  businessHours?: DentalBusinessHours[];
}

interface AuthData {
  token: string;
}

interface Appointment {
  id: number;
  status: string;
  dentistId: number;
}

const ADMIN_EMAIL = 'admin@test.cl';
const ADMIN_PASSWORD = 'TestAdmin-123';

let server: TestServer;
let dentistId: number;
let treatmentId: number;
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

function dentistPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Dr. Nuevo Test',
    role: 'Odontólogo General',
    specialty: 'Odontología General',
    description: 'Profesional creado desde el panel administrativo.',
    experienceYears: 5,
    imageUrl: '/images/dentists/nuevo-test.svg',
    ...overrides,
  };
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

async function publicDentists() {
  const { status, body } = await request(server.baseUrl, '/api/dentists');
  assert.equal(status, 200);
  return (body as ApiEnvelope<DentistRecord[]>).data;
}

before(async () => {
  resetDatabase();
  const admin = await seedAdmin({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
  assert.ok(admin.id > 0);
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

describe('Acceso administrativo a dentistas', () => {
  test('sin token devuelve 401', async () => {
    const { status, body } = await request(server.baseUrl, '/api/admin/dentists');
    assert.equal(status, 401);
    assert.equal((body as ApiErrorBody).error?.code, 'UNAUTHORIZED');
  });

  test('listado inicial incluye al profesional sembrado', async () => {
    const { status, body } = await authed('GET', '/api/admin/dentists');
    assert.equal(status, 200);
    const dentists = (body as ApiEnvelope<DentistRecord[]>).data;
    assert.equal(dentists.length, 1);
    assert.equal(dentists[0]!.id, dentistId);
    assert.equal(dentists[0]!.isActive, true);
    assert.ok(dentists[0]!.businessHours!.length > 0);
  });
});

describe('Creación de dentistas (admin)', () => {
  test('crea un dentista activo por defecto', async () => {
    const { status, body } = await authed('POST', '/api/admin/dentists', dentistPayload());
    assert.equal(status, 201);
    const created = (body as ApiEnvelope<DentistRecord>).data;
    assert.equal(created.name, 'Dr. Nuevo Test');
    assert.equal(created.isActive, true);
    assert.deepEqual(created.businessHours, []);

    const publics = await publicDentists();
    assert.ok(publics.some((d) => d.id === created.id));
  });

  test('permite crear un dentista inactivo', async () => {
    const { status, body } = await authed(
      'POST',
      '/api/admin/dentists',
      dentistPayload({ name: 'Dra. Inactiva Test', isActive: false }),
    );
    assert.equal(status, 201);
    const created = (body as ApiEnvelope<DentistRecord>).data;
    assert.equal(created.isActive, false);

    // No aparece en el listado público, pero sí en el administrativo.
    const publics = await publicDentists();
    assert.ok(!publics.some((d) => d.id === created.id));
    const admin = (await authed('GET', '/api/admin/dentists')) as {
      status: number;
      body: ApiEnvelope<DentistRecord[]>;
    };
    assert.ok(admin.body.data.some((d) => d.id === created.id && !d.isActive));
  });

  test('rechaza datos inválidos', async () => {
    const shortName = await authed('POST', '/api/admin/dentists', dentistPayload({ name: 'A' }));
    assert.equal(shortName.status, 400);

    const negativeYears = await authed(
      'POST',
      '/api/admin/dentists',
      dentistPayload({ experienceYears: -1 }),
    );
    assert.equal(negativeYears.status, 400);
  });
});

describe('Edición de dentistas (admin)', () => {
  test('edita parcialmente conservando el resto de campos', async () => {
    const created = (await authed('POST', '/api/admin/dentists', dentistPayload())) as {
      status: number;
      body: ApiEnvelope<DentistRecord>;
    };
    const id = created.body.data.id;

    const { status, body } = await authed('PATCH', `/api/admin/dentists/${id}`, {
      name: 'Dra. Editada Test',
      specialty: 'Ortodoncia',
    });
    assert.equal(status, 200);
    const updated = (body as ApiEnvelope<DentistRecord>).data;
    assert.equal(updated.name, 'Dra. Editada Test');
    assert.equal(updated.specialty, 'Ortodoncia');
    assert.equal(updated.role, 'Odontólogo General');
    assert.equal(updated.experienceYears, 5);
  });

  test('rechaza edición inválida y devuelve 404 si no existe', async () => {
    const created = (await authed('POST', '/api/admin/dentists', dentistPayload())) as {
      status: number;
      body: ApiEnvelope<DentistRecord>;
    };
    const id = created.body.data.id;

    const invalid = await authed('PATCH', `/api/admin/dentists/${id}`, { name: 'A' });
    assert.equal(invalid.status, 400);

    const missing = await authed('PATCH', '/api/admin/dentists/999999', { name: 'Dr. X' });
    assert.equal(missing.status, 404);
  });

  test('detalle inexistente y no numérico', async () => {
    const missing = await authed('GET', '/api/admin/dentists/999999');
    assert.equal(missing.status, 404);

    const notNumeric = await authed('GET', '/api/admin/dentists/abc');
    assert.equal(notNumeric.status, 400);
  });
});

describe('Activación / desactivación de dentistas (admin)', () => {
  test('desactiva sin eliminar: cita histórica se conserva y el slot se cierra', async () => {
    // Reserva previa a la desactivación (historial existente).
    const appointment = await book(monday, '09:00');

    const { status, body } = await authed('PATCH', `/api/admin/dentists/${dentistId}/active`, {
      isActive: false,
    });
    assert.equal(status, 200);
    assert.equal((body as ApiEnvelope<DentistRecord>).data.isActive, false);

    // Sigue en el listado administrativo, pero no en el público.
    const adminList = (await authed('GET', '/api/admin/dentists')) as {
      status: number;
      body: ApiEnvelope<DentistRecord[]>;
    };
    assert.ok(adminList.body.data.some((d) => d.id === dentistId && !d.isActive));
    const publics = await publicDentists();
    assert.ok(!publics.some((d) => d.id === dentistId));

    // No acepta nuevas consultas de disponibilidad ni reservas.
    const availability = await request(
      server.baseUrl,
      `/api/availability?date=${monday}&treatmentId=${treatmentId}&dentistId=${dentistId}`,
    );
    assert.equal(availability.status, 404);

    // La cita histórica permanece intacta (por confirmación pública).
    const confirmation = await request(
      server.baseUrl,
      `/api/appointments/${appointment.id}`,
    );
    assert.equal(confirmation.status, 200);
    const appt = (confirmation.body as ApiEnvelope<Appointment>).data;
    assert.equal(appt.status, 'CONFIRMED');
    assert.equal(appt.dentistId, dentistId);
  });

  test('reactiva y el profesional vuelve a estar disponible', async () => {
    const { status, body } = await authed('PATCH', `/api/admin/dentists/${dentistId}/active`, {
      isActive: true,
    });
    assert.equal(status, 200);
    assert.equal((body as ApiEnvelope<DentistRecord>).data.isActive, true);

    const publics = await publicDentists();
    assert.ok(publics.some((d) => d.id === dentistId));

    const availability = await request(
      server.baseUrl,
      `/api/availability?date=${nextWeekday(2)}&treatmentId=${treatmentId}&dentistId=${dentistId}`,
    );
    assert.equal(availability.status, 200);
  });

  test('activar o desactivar un dentista inexistente devuelve 404', async () => {
    const { status } = await authed('PATCH', '/api/admin/dentists/999999/active', {
      isActive: false,
    });
    assert.equal(status, 404);
  });
});

describe('Sin eliminación física', () => {
  test('no existe endpoint de borrado de dentistas', async () => {
    const { status } = await authed('DELETE', `/api/admin/dentists/${dentistId}`);
    assert.equal(status, 404);
  });
});