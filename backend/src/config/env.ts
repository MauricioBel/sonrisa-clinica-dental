import 'dotenv/config';

function readString(name: string, fallback: string): string {
  const value = process.env[name];
  return value === undefined || value === '' ? fallback : value;
}

function readNumber(name: string, fallback: number): number {
  const value = Number.parseInt(process.env[name] ?? '', 10);
  return Number.isFinite(value) ? value : fallback;
}

function readOriginList(name: string, fallback: string[]): string[] {
  const value = process.env[name];
  if (!value) return fallback;
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const env = {
  nodeEnv: readString('NODE_ENV', 'development'),
  port: readNumber('PORT', 4000),
  corsOrigin: readOriginList('CORS_ORIGIN', ['http://localhost:5173']),
  databaseUrl: readString(
    'DATABASE_URL',
    'file:./dev.db',
  ),
  // Nº de saltos de proxy de confianza para rate-limit/CORS. En desarrollo
  // (Vite proxya) es 0; tras un proxy reverso de producción suele ser 1.
  trustProxy: readNumber('TRUST_PROXY', 0),
} as const;