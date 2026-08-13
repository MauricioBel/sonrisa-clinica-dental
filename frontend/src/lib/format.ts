const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const DAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
] as const;

const DAY_NAMES_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'] as const;

const MONTH_NAMES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;

export function formatCLP(value: number): string {
  return priceFormatter.format(value);
}

export function dayName(dayOfWeek: number): string {
  return DAY_NAMES[dayOfWeek] ?? 'Desconocido';
}

export function dayNameShort(dayOfWeek: number): string {
  return DAY_NAMES_SHORT[dayOfWeek] ?? '';
}

/** Recibe YYYY-MM-DD y devuelve "12 de agosto de 2026". */
export function formatDateLong(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return date;
  return `${d} de ${MONTH_NAMES[m - 1] ?? ''} de ${y}`;
}

/** Recibe YYYY-MM-DD y devuelve "mié 12 ago 2026". */
export function formatDateShort(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return date;
  const weekday = new Date(y, m - 1, d).getDay();
  return `${DAY_NAMES_SHORT[weekday] ?? ''} ${d} ${MONTH_NAMES[m - 1] ?? ''} ${y}`;
}

/** Convierte HH:mm a "12:30 hrs". */
export function formatTime(time: string): string {
  return `${time} hrs`;
}

/** Fecha local actual en YYYY-MM-DD. */
export function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Suma días a una fecha YYYY-MM-DD y devuelve YYYY-MM-DD. */
export function addDaysISO(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number);
  const dt = new Date(y ?? 0, (m ?? 1) - 1, (d ?? 1) + days);
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${dt.getFullYear()}-${mm}-${dd}`;
}

/** Lista de próximos N días (incluye hoy) en formato YYYY-MM-DD. */
export function nextDays(count: number): string[] {
  const today = todayISO();
  return Array.from({ length: count }, (_, i) => addDaysISO(today, i));
}

/** true si la fecha corresponde a un día futuro (estrictamente posterior a hoy). */
export function isFutureDate(date: string): boolean {
  return date > todayISO();
}

/** Devuelve el dayOfWeek (0=Domingo) de una fecha YYYY-MM-DD. */
export function dayOfWeekFromISO(date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y ?? 0, (m ?? 1) - 1, d ?? 1).getDay();
}