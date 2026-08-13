import path from 'node:path';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client.js';
import { env } from '../config/env.js';

function resolveSqliteFile(url: string): string {
  const file = url.replace(/^file:/, '');
  if (path.isAbsolute(file)) return file;
  return path.resolve(process.cwd(), file);
}

const adapter = new PrismaBetterSqlite3({
  url: `file:${resolveSqliteFile(env.databaseUrl)}`,
});

export const prisma = new PrismaClient({ adapter });

export type Prisma = typeof prisma;