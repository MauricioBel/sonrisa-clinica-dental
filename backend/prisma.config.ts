import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Usamos DIRECT_URL para que la CLI (db push, migrate) use el puerto 5432
    url: process.env['DIRECT_URL'] || process.env['DATABASE_URL'],
    directUrl: process.env['DIRECT_URL'],
  },
});
