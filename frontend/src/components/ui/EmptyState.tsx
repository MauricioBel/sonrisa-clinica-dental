import { Calendar, FilterX } from 'lucide-react';
import { Button } from '../ui/Button.tsx';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-secondary mb-4">
        {icon || <Calendar className="h-8 w-8" aria-hidden="true" />}
      </div>
      <h3 className="font-display text-lg font-bold text-primary mb-1">{title}</h3>
      <p className="text-secondary max-w-sm mx-auto mb-6">{description}</p>
      {action && (
        <Button variant={action.variant || 'primary'} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function EmptyAppointmentsState({ onCreate, hasFilters = false }: { onCreate?: () => void; hasFilters?: boolean }) {
  return (
    <EmptyState
      icon={<FilterX className="h-8 w-8" aria-hidden="true" />}
      title={hasFilters ? 'No hay citas con estos filtros' : 'No hay citas registradas'}
      description={hasFilters
        ? 'Intenta ajustar los filtros de búsqueda o limpiarlos para ver todas las citas.'
        : 'Comienza agendando la primera cita para tu clínica.'}
      action={onCreate ? {
        label: 'Agendar primera cita',
        onClick: onCreate,
        variant: 'primary'
      } : undefined}
    />
  );
}