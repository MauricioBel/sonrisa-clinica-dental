import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import Database from 'better-sqlite3';
import {
  closeTestDatabase,
  DB_PATH,
  removeTestDatabase,
  request,
  resetDatabase,
  seedAdmin,
  startTestServer,
} from './helpers.ts';
import type { TestServer } from './helpers.ts';

interface ApiEnvelope<T> {
  data: T;
}

interface ApiErrorBody {
  error?: { code?: string; message?: string; details?: unknown };
}

interface LoginData {
  token: string;
  user: { id: number; email: string; name: string; role: string };
  expiresInSeconds: number;
}

const ADMIN_EMAIL = 'admin@test.cl';
const ADMIN_PASSWORD = 'TestAdmin-123';

let server: TestServer;
let adminId: number;
let authToken: string;

async function loginRequest(email: string, password: string) {
  return request(server.baseUrl, '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

before(async () => {
  resetDatabase();
  const admin = await seedAdmin({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
  adminId = admin.id;
  server = await startTestServer();
});

after(async () => {
  await server.close();
  await closeTestDatabase();
  removeTestDatabase();
});

describe('POST /api/auth/login', () => {
  test('credenciales válidas devuelven token y usuario', async () => {
    const { status, body } = await loginRequest(ADMIN_EMAIL, ADMIN_PASSWORD);
    assert.equal(status, 200);
    const data = (body as ApiEnvelope<LoginData>).data;
    authToken = data.token;

    assert.equal(typeof authToken, 'string');
    assert.equal(authToken.split('.').length, 3);
    assert.equal(data.user.email, ADMIN_EMAIL);
    assert.equal(data.user.role, 'ADMIN');
    assert.equal(typeof data.expiresInSeconds, 'number');
    assert.ok(data.expiresInSeconds > 0);
  });

  test('contraseña incorrecta devuelve 401', async () => {
    const { status, body } = await loginRequest(ADMIN_EMAIL, 'Contrasena-Erronea');
    assert.equal(status, 401);
    assert.equal((body as ApiErrorBody).error?.code, 'INVALID_CREDENTIALS');
  });

  test('usuario inexistente devuelve 401 (sin revelar existencia)', async () => {
    const { status, body } = await loginRequest('nadie@test.cl', ADMIN_PASSWORD);
    assert.equal(status, 401);
    assert.equal((body as ApiErrorBody).error?.code, 'INVALID_CREDENTIALS');
  });

  test('cuerpo inválido devuelve 400 con detalles', async () => {
    const { status, body } = await loginRequest('email-invalido', 'corta');
    assert.equal(status, 400);
    const error = (body as ApiErrorBody).error;
    assert.equal(error?.code, 'VALIDATION_ERROR');
    assert.ok(Array.isArray(error?.details));
  });
});

describe('GET /api/auth/me (sesión)', () => {
  test('sin token devuelve 401', async () => {
    const { status, body } = await request(server.baseUrl, '/api/auth/me');
    assert.equal(status, 401);
    assert.equal((body as ApiErrorBody).error?.code, 'UNAUTHORIZED');
  });

  test('token inválido devuelve 401', async () => {
    const { status, body } = await request(server.baseUrl, '/api/auth/me', {
      headers: { Authorization: 'Bearer abc.def.ghi' },
    });
    assert.equal(status, 401);
    assert.equal((body as ApiErrorBody).error?.code, 'UNAUTHORIZED');
  });

  test('token válido devuelve el usuario autenticado', async () => {
    const { status, body } = await request(server.baseUrl, '/api/auth/me', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.equal(status, 200);
    const user = (body as ApiEnvelope<{ id: number; email: string; role: string }>).data;
    assert.equal(user.id, adminId);
    assert.equal(user.email, ADMIN_EMAIL);
    assert.equal(user.role, 'ADMIN');
  });
});

describe('Almacenamiento de credenciales', () => {
  test('la contraseña se guarda hasheada (scrypt)', () => {
    const db = new Database(DB_PATH);
    const row = db
      .prepare('SELECT "passwordHash" FROM "User" WHERE "email" = ?')
      .get(ADMIN_EMAIL) as { passwordHash: string };
    db.close();

    assert.ok(row.passwordHash.startsWith('scrypt:'));
    assert.ok(row.passwordHash.length > 0);
    assert.equal(row.passwordHash.includes(ADMIN_PASSWORD), false);
  });
});

describe('Rate limit de autenticación', () => {
  test('se bloquea con 429 tras superar el límite de intentos', async () => {
    // Los tests previos ya consumieron ~4 intentos de login. El límite es 10;
    // tras superarlo, los intentos siguientes devuelven 429.
    let got429 = false;
    for (let i = 0; i < 15; i += 1) {
      const { status } = await loginRequest(ADMIN_EMAIL, 'Contrasena-Erronea');
      if (status === 429) {
        got429 = true;
        break;
      }
    }
    assert.equal(got429, true);
  });
});