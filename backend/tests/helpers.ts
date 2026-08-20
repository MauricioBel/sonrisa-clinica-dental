import { TEST_DB_ABS } from './test-env.js';
import Database from 'better-sqlite3';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { hashPassword } from '../src/lib/hash.js';
import { prisma } from '../src/lib/prisma.js';
import { createApp } from '../src/app.js';

export const DB_PATH = TEST_DB_ABS;

const MIGRATIONS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'prisma',
  'migrations',
);

/**
 * Recrea la BD de pruebas desde cero aplicando las migraciones de Prisma
 * en orden (equivalente a `prisma migrate deploy`, sin tocar dev.db).
 */
export function resetDatabase(): void {
  if (existsSync(DB_PATH)) rmSync(DB_PATH, { force: true });
  const db = new Database(DB_PATH);
  db.exec('PRAGMA foreign_keys = ON;');
  const migrations = readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  for (const name of migrations) {
    const sqlFile = path.join(MIGRATIONS_DIR, name, 'migration.sql');
    if (existsSync(sqlFile)) {
      db.exec(readFileSync(sqlFile, 'utf8'));
    }
  }
  db.close();
}

/** Libera las conexiones de Prisma para poder eliminar test.db en Windows. */
export async function closeTestDatabase(): Promise<void> {
  await prisma.$disconnect();
}

export interface SeedAdminOptions {
  email?: string;
  password?: string;
  name?: string;
}

/** Crea (o devuelve) un usuario administrador con contraseña hasheada. */
export async function seedAdmin(
  options: SeedAdminOptions = {},
): Promise<{ id: number; email: string }> {
  const email = options.email ?? 'admin@test.cl';
  const passwordHash = await hashPassword(options.password ?? 'TestAdmin-123');
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: options.name ?? 'Admin Test',
      passwordHash,
      role: 'ADMIN',
    },
  });
  return { id: user.id, email: user.email };
}

/** Elimina el archivo de BD aislado del proceso (best-effort en Windows). */
export function removeTestDatabase(): void {
  try {
    if (existsSync(DB_PATH)) rmSync(DB_PATH, { force: true });
  } catch {
    /* Windows puede mantener el archivo abierto; se ignora (archivo en .gitignore). */
  }
}

export interface TestServer {
  baseUrl: string;
  close: () => Promise<void>;
}

/** Levanta la API real en un puerto efímero (127.0.0.1). */
export async function startTestServer(): Promise<TestServer> {
  const server = createApp().listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address() as AddressInfo;
  return {
    baseUrl: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise<void>((resolve, reject) =>
        server.close((err) => (err ? reject(err) : resolve())),
      ),
  };
}

export interface ClinicFixture {
  dentistId: number;
  treatmentId: number;
}

/**
 * Siembra el mínimo de datos de referencia: un dentista activo con horario
 * L-S 09:00-18:00 y un tratamiento de 30 min. Inserta SQL directamente para
 * no depender del cliente generado dentro de los tests.
 */
export function seedClinic(): ClinicFixture {
  const db = new Database(DB_PATH);
  const now = new Date().toISOString();

  const dentist = db.prepare(
    `INSERT INTO "Dentist"
      ("name", "role", "specialty", "description", "experienceYears", "imageUrl", "isActive", "createdAt", "updatedAt")
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const dentistInfo = dentist.run(
    'Dra. Prueba Test',
    'Odontóloga General',
    'Odontología General',
    'Dentista de referencia para la suite de regresión.',
    8,
    '/images/dentists/prueba-test.svg',
    1,
    now,
    now,
  );
  const dentistId = Number(dentistInfo.lastInsertRowid);

  const businessHours = db.prepare(
    `INSERT INTO "BusinessHours" ("dentistId", "dayOfWeek", "openTime", "closeTime")
     VALUES (?, ?, ?, ?)`,
  );
  for (let dayOfWeek = 1; dayOfWeek <= 6; dayOfWeek += 1) {
    businessHours.run(dentistId, dayOfWeek, '09:00', '18:00');
  }

  const treatment = db.prepare(
    `INSERT INTO "Treatment"
      ("name", "slug", "shortDescription", "description", "benefits", "durationMinutes", "price", "imageUrl", "isFeatured", "sortOrder", "createdAt", "updatedAt")
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const treatmentInfo = treatment.run(
    'Limpieza Test',
    'limpieza-test',
    'Tratamiento de referencia para la suite de regresión.',
    'Tratamiento creado por la suite de regresión.',
    JSON.stringify(['Beneficio de prueba']),
    30,
    35000,
    '/images/treatments/limpieza-test.svg',
    0,
    1,
    now,
    now,
  );
  const treatmentId = Number(treatmentInfo.lastInsertRowid);

  db.close();
  return { dentistId, treatmentId };
}

/** Crea un dentista adicional con horario L-S 09:00-18:00. Devuelve su id. */
export function seedAdditionalDentist(): number {
  const db = new Database(DB_PATH);
  const now = new Date().toISOString();
  const dentist = db.prepare(
    `INSERT INTO "Dentist"
      ("name", "role", "specialty", "description", "experienceYears", "imageUrl", "isActive", "createdAt", "updatedAt")
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const info = dentist.run(
    'Dr. Secundario Test',
    'Odontólogo General',
    'Odontología General',
    'Segundo dentista para pruebas de aislamiento de bloqueos.',
    6,
    '/images/dentists/secundario-test.svg',
    1,
    now,
    now,
  );
  const dentistId = Number(info.lastInsertRowid);

  const businessHours = db.prepare(
    `INSERT INTO "BusinessHours" ("dentistId", "dayOfWeek", "openTime", "closeTime")
     VALUES (?, ?, ?, ?)`,
  );
  for (let dayOfWeek = 1; dayOfWeek <= 6; dayOfWeek += 1) {
    businessHours.run(dentistId, dayOfWeek, '09:00', '18:00');
  }
  db.close();
  return dentistId;
}

/** Fecha YYYY-MM-DD local. */
export function isoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Próximo día de la semana (0=Domingo..6=Sábado) estrictamente futuro. */
export function nextWeekday(target: number, from = new Date()): string {
  const d = new Date(from);
  let diff = (target - d.getDay() + 7) % 7;
  if (diff === 0) diff = 7;
  d.setDate(d.getDate() + diff);
  return isoDate(d);
}

export interface RawResponse {
  status: number;
  body: unknown;
}

/** GET/POST contra la API de pruebas con el envoltorio { data } | { error }. */
export async function request(
  baseUrl: string,
  pathname: string,
  init?: RequestInit,
): Promise<RawResponse> {
  const res = await fetch(`${baseUrl}${pathname}`, init);
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* respuesta sin cuerpo JSON */
  }
  return { status: res.status, body };
}