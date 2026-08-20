import { Badge } from '../ui/Badge.tsx';
import type { AppointmentStatus } from '../../types/index.ts';

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  CANCELLED: 'Cancelada',
  COMPLETED: 'Completada',
};

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  CONFIRMED: 'bg-[#e0f2e9] text-[#1f7a5c]',
  CANCELLED: 'bg-red-100 text-red-700',
  COMPLETED: 'bg-slate-100 text-slate-700',
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return <Badge className={STATUS_STYLES[status]}>{STATUS_LABELS[status]}</Badge>;
}

export function ActiveBadge({ active }: { active: boolean }) {
  return (
    <Badge className={active ? 'bg-[#e0f2e9] text-[#1f7a5c]' : 'bg-slate-200 text-slate-700'}>
      {active ? 'Activo' : 'Inactivo'}
    </Badge>
  );
}