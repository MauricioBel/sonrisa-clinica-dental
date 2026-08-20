import express from 'express';
import type { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { apiLimiter } from './middleware/rateLimit.js';
import {
  errorHandler,
  notFoundHandler,
  prismaErrorHandler,
} from './middleware/errors.js';
import { healthRouter } from './routes/health.routes.js';
import { treatmentsRouter } from './routes/treatments.routes.js';
import { dentistsRouter } from './routes/dentists.routes.js';
import { availabilityRouter } from './routes/availability.routes.js';
import { appointmentsRouter } from './routes/appointments.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { adminAppointmentsRouter } from './routes/admin/appointments.routes.js';
import { adminDentistsRouter } from './routes/admin/dentists.routes.js';
import { adminTimeBlocksRouter } from './routes/admin/timeblocks.routes.js';
import { adminTreatmentsRouter } from './routes/admin/treatments.routes.js';

export function createApp(): Express {
  const app = express();

  app.disable('x-powered-by');

  // La API solo devuelve JSON, por eso una CSP mínima es segura y cubre
  // navegación directa al endpoint. HSTS y navegación segura por defecto.
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
          frameAncestors: ["'none'"],
        },
      },
      hsts: env.nodeEnv === 'production',
      referrerPolicy: { policy: 'no-referrer' },
      crossOriginEmbedderPolicy: false,
    }),
  );

  // Tras un proxy reverso el rate-limit y el CORS dependen de X-Forwarded-For.
  app.set('trust proxy', env.trustProxy);

  app.use(
    cors({
      origin: env.corsOrigin,
      // PATCH/DELETE y el header Authorization se agregan para el panel admin.
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400,
    }),
  );
  app.use(express.json({ limit: '50kb' }));

  app.use('/api', apiLimiter);

  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/treatments', treatmentsRouter);
  app.use('/api/dentists', dentistsRouter);
  app.use('/api/availability', availabilityRouter);
  app.use('/api/appointments', appointmentsRouter);
  app.use('/api/admin/appointments', adminAppointmentsRouter);
  app.use('/api/admin/dentists', adminDentistsRouter);
  app.use('/api/admin/treatments', adminTreatmentsRouter);
  app.use('/api/admin/timeblocks', adminTimeBlocksRouter);

  app.use(notFoundHandler);
  app.use(prismaErrorHandler);
  app.use(errorHandler);

  return app;
}