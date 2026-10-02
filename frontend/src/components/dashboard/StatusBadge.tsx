type AppointmentStatus = 'CONFIRMED' | 'PENDING' | 'IN_PROGRESS' | 'CANCELLED';

interface StatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
}

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  CONFIRMED: {
    label: 'Confirmada',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  PENDING: {
    label: 'Pendiente',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  IN_PROGRESS: {
    label: 'En atención',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  CANCELLED: {
    label: 'Cancelada',
    className: 'bg-red-50 text-red-700 border-red-200',
  },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        config.className
      } ${className}`}
    >
      {config.label}
    </span>
  );
}