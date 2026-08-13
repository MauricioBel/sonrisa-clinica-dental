import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.port, () => {
  console.log(`⚕️  Sonrisa Dental API escuchando en http://localhost:${env.port}`);
  console.log(`   Entorno: ${env.nodeEnv}`);
  console.log(`   Health:  http://localhost:${env.port}/api/health`);
});