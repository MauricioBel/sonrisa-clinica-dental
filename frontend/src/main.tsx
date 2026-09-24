import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/dynamic.css';
import { loadConfig } from './lib/config.ts';
import App from './App.tsx';

async function bootstrap() {
  await loadConfig();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('No se encontró el elemento #root');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();