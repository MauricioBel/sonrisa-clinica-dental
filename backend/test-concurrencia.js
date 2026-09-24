#!/usr/bin/env node

import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveDbFile() {
  const raw = process.env.DATABASE_URL ?? 'file:./dev.db';
  const file = raw.replace(/^file:/, '');
  if (path.isAbsolute(file)) return file;
  return path.resolve(process.cwd(), file);
}

const adapter = new PrismaBetterSqlite3({ url: `file:${resolveDbFile()}` });
const prisma = new PrismaClient({ adapter });

const TEST_DENTIST_ID = 1;
const TEST_DATE = '2026-12-01';
const TEST_TIME = '10:00';
const TEST_CLINICA_ID = 'sonrisa-clinica-dental-001';
const NUM_REQUESTS = 10;

const basePayload = {
  patientName: 'Test',
  patientLastName: 'User',
  patientEmail: 'test@example.com',
  patientPhone: '+56912345678',
  treatmentId: 1,
  dentistId: TEST_DENTIST_ID,
  date: TEST_DATE,
  time: TEST_TIME,
  clinicaId: TEST_CLINICA_ID,
};

async function makeRequest(index) {
  const payload = {
    ...basePayload,
    patientName: `Test${index}`,
    patientEmail: `test${index}@example.com`,
  };

  try {
    const response = await fetch('http://localhost:4000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { index, status: response.status, success: response.ok, data };
  } catch (error) {
    return { index, status: 0, success: false, error: error.message };
  }
}

async function runConcurrencyTest() {
  console.log('=== Test de Concurrencia - Sistema de Reservas ===\n');
  console.log(`Configuración:`);
  console.log(`  - Dentista ID: ${TEST_DENTIST_ID}`);
  console.log(`  - Fecha: ${TEST_DATE}`);
  console.log(`  - Hora: ${TEST_TIME}`);
  console.log(`  - Clínica ID: ${TEST_CLINICA_ID}`);
  console.log(`  - Peticiones simultáneas: ${NUM_REQUESTS}\n`);

  console.log('Enviando peticiones concurrentes...\n');

  const promises = Array.from({ length: NUM_REQUESTS }, (_, i) => makeRequest(i + 1));
  const results = await Promise.all(promises);

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log('--- Resultados ---');
  console.log(`Peticiones exitosas (201): ${successful.length}`);
  console.log(`Peticiones rechazadas: ${failed.length}\n`);

  console.log('Detalle:');
  results.forEach(r => {
    if (r.success) {
      console.log(`  [${r.index}] ✓ ÉXITO - Appointment ID: ${r.data.data?.id || r.data.id}`);
    } else {
      const msg = r.data?.error?.message || r.error || 'Error desconocido';
      console.log(`  [${r.index}] ✗ FALLO (${r.status}) - ${msg}`);
    }
  });

  console.log('\n--- Verificación en Base de Datos ---');
  const appointments = await prisma.appointment.findMany({
    where: {
      dentistId: TEST_DENTIST_ID,
      date: TEST_DATE,
      time: TEST_TIME,
      clinicaId: TEST_CLINICA_ID,
    },
  });
  console.log(`Citas en BD para ese slot: ${appointments.length}`);
  appointments.forEach(a => {
    console.log(`  - ID: ${a.id}, Paciente: ${a.patientName} ${a.patientLastName}, Email: ${a.patientEmail}`);
  });

  console.log('\n=== Resumen ===');
  if (successful.length === 1 && failed.length === NUM_REQUESTS - 1) {
    console.log('✅ TEST PASADO: Solo 1 reserva exitosa, 9 rechazadas por conflicto.');
  } else {
    console.log('❌ TEST FALLADO: El sistema no previene correctamente la doble reserva.');
  }

  await prisma.$disconnect();
  process.exit(successful.length === 1 && failed.length === NUM_REQUESTS - 1 ? 0 : 1);
}

runConcurrencyTest().catch(async (err) => {
  console.error('Error fatal:', err);
  await prisma.$disconnect();
  process.exit(1);
});