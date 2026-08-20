import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/**
 * Ruta absoluta de la BD de pruebas. Debe importarse ANTES que la app.
 * Cada proceso del test runner usa su propio archivo (por pid) para que los
 * archivos de test puedan ejecutarse en paralelo sin pisarse.
 */
export const TEST_DB_ABS = path
  .resolve(here, `../test-${process.pid}.db`)
  .replace(/\\/g, '/');

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = `file:${TEST_DB_ABS}`;