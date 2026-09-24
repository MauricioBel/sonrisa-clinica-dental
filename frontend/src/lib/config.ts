export interface ClinicaConfig {
  theme: 'boutique' | 'classic' | 'modern';
  clinica_id: string;
  clinica: {
    nombre: string;
    slogan: string;
    telefono: string;
    email: string;
    direccion: string;
    horario: Array<{ dias: string; horas: string }>;
    whatsapp: {
      numero: string;
      display: string;
      mensajeDefault: string;
    };
  };
  identidadVisual: {
    colorPrincipal: string;
    colorSecundario: string;
    logoUrl: string;
  };
  servicios: Array<{ nombre: string; descripcionCorta: string }>;
  especialistas: Array<{ nombre: string; especialidad: string }>;
}

let configCache: ClinicaConfig | null = null;

export async function loadConfig(): Promise<ClinicaConfig> {
  if (configCache) return configCache;

  try {
    const response = await fetch('/config.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo cargar config.json');
    const config = await response.json();
    configCache = config;
    applyTheme(config.identidadVisual);
    applyThemeClass(config.theme);
    return config;
  } catch (error) {
    console.error('Error cargando configuración:', error);
    throw error;
  }
}

function applyTheme(identidad: ClinicaConfig['identidadVisual']) {
  const root = document.documentElement;
  const primary = identidad.colorPrincipal;
  const secondary = identidad.colorSecundario;

  root.style.setProperty('--color-brand-700', primary);
  root.style.setProperty('--color-brand-600', shadeColor(primary, -10));
  root.style.setProperty('--color-brand-800', shadeColor(primary, 10));
  root.style.setProperty('--color-brand-500', secondary);
  root.style.setProperty('--color-brand-400', shadeColor(secondary, -15));
  root.style.setProperty('--color-brand-300', shadeColor(secondary, -30));
  root.style.setProperty('--color-brand-200', shadeColor(secondary, -50));
  root.style.setProperty('--color-brand-100', shadeColor(secondary, -70));
  root.style.setProperty('--color-brand-50', shadeColor(secondary, -85));
  root.style.setProperty('--color-brand-900', shadeColor(primary, 25));
  root.style.setProperty('--color-brand-950', shadeColor(primary, 40));

  root.style.setProperty('--color-primary', primary);
  root.style.setProperty('--color-primary-hover', shadeColor(primary, 10));
  root.style.setProperty('--color-primary-light', shadeColor(secondary, -85));
  root.style.setProperty('--color-secondary', secondary);
  root.style.setProperty('--color-secondary-hover', shadeColor(secondary, 10));
}

function shadeColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(2.55 * percent)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(2.55 * percent)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(2.55 * percent)));
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function getConfig(): ClinicaConfig | null {
  return configCache;
}

export function getClinicaId(): string {
  return configCache?.clinica_id ?? '';
}

export function getClinicaNombre(): string {
  return configCache?.clinica.nombre ?? '';
}

function applyThemeClass(theme: ClinicaConfig['theme']) {
  const html = document.documentElement;
  html.classList.remove('theme-boutique', 'theme-classic', 'theme-modern');
  html.classList.add(`theme-${theme}`);
}

export function getTheme(): ClinicaConfig['theme'] {
  return configCache?.theme ?? 'modern';
}