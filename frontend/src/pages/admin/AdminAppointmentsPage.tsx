import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { FormField, inputStyles } from '../../components/ui/FormField.tsx';
import { EmptyState, ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { StatusBadge } from '../../components/admin/StatusBadge.tsx';
import { AppointmentActions } from '../../components/admin/AppointmentActions.tsx';
import { useAdminAppointments } from '../../hooks/admin/useAdminAppointments.ts';
import { useAdminDentists } from '../../hooks/admin/useAdminDentists.ts';
import type {
  AdminAppointment,
  AdminAppointmentParams,
  AppointmentStatus,
} from '../../types/index.ts';
import { formatDateShort, formatTime, todayISO } from '../../lib/format.ts';
import { Seo } from '../../components/Seo.tsx';

const STATUS_OPTIONS: { value: AppointmentStatus | ''; label: string }[] = [
  { value: '', label: 'Todos los estados' },
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'CONFIRMED', label: 'Confirmada' },
  { value: 'COMPLETED', label: 'Completada' },
  { value: 'CANCELLED', label: 'Cancelada' },
];

interface Filters {
  status: AppointmentStatus | '';
  dentistId: string;
  from: string;
  to: string;
}

const DEFAULT_FILTERS: Filters = {
  status: '',
  dentistId: '',
  from: todayISO(),
  to: '',
};

export function AdminAppointmentsPage() {
  const [draft, setDraft] = useState<Filters>(DEFAULT_FILTERS);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const params = useMemo<AdminAppointmentParams>(() => {
    const result: AdminAppointmentParams = {};
    if (filters.status) result.status = filters.status;
    if (filters.dentistId) result.dentistId = Number(filters.dentistId);
    if (filters.from) result.from = filters.from;
    if (filters.to) result.to = filters.to;
    return result;
  }, [filters]);

  const dentists = useAdminDentists();
  const { data, loading, error, reload } = useAdminAppointments(params);

  const applyFilters = (e: FormEvent) => {
    e.preventDefault();
    setFilters(draft);
    setFeedbackError(null);
  };

  const resetFilters = () => {
    setDraft(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setFeedbackError(null);
  };

  const total = data?.length ?? 0;

  return (
    <>
      <Seo
        title="Gestión de citas"
        description="Gestión de citas del panel administrativo de Sonrisa Clínica Dental."
        path="/admin/citas"
        noIndex
      />
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-950">Citas</h1>
        <p className="mt-1 text-sm text-slate-600">
          Confirma, completa, cancela o reagenda las citas de tus pacientes.
        </p>
      </div>

      <Card className="mb-6 p-4">
        <form onSubmit={applyFilters} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <FormField id="filter-status" label="Estado" className="lg:col-span-1">
            <select
              id="filter-status"
              className={inputStyles}
              value={draft.status}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  status: e.target.value as AppointmentStatus | '',
                }))
              }
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="filter-dentist" label="Profesional" className="lg:col-span-1">
            <select
              id="filter-dentist"
              className={inputStyles}
              value={draft.dentistId}
              onChange={(e) => setDraft((d) => ({ ...d, dentistId: e.target.value }))}
            >
              <option value="">Todos los profesionales</option>
              {dentists.data?.map((dentist) => (
                <option key={dentist.id} value={dentist.id}>
                  {dentist.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="filter-from" label="Desde" className="lg:col-span-1">
            <input
              id="filter-from"
              type="date"
              className={inputStyles}
              value={draft.from}
              onChange={(e) => setDraft((d) => ({ ...d, from: e.target.value }))}
            />
          </FormField>
          <FormField id="filter-to" label="Hasta" className="lg:col-span-1">
            <input
              id="filter-to"
              type="date"
              className={inputStyles}
              value={draft.to}
              onChange={(e) => setDraft((d) => ({ ...d, to: e.target.value }))}
            />
          </FormField>
          <div className="flex items-end gap-2 lg:col-span-1">
            <Button type="submit" className="flex-1">
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filtrar
            </Button>
            <Button
              type="button"
              variant="ghost"
              aria-label="Limpiar filtros"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      </Card>

      {feedbackError && (
        <div className="mb-4">
          <ErrorMessage message={feedbackError} />
        </div>
      )}

      {loading && <Spinner label="Cargando citas..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && data && (
        <>
          <p className="mb-3 text-sm text-slate-600">
            {total === 1 ? '1 cita' : `${total} citas`} encontradas.
          </p>

          {data.length === 0 ? (
            <Card>
              <EmptyState message="No hay citas que coincidan con los filtros." />
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Paciente
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Fecha y hora
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Tratamiento
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Profesional
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Estado
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.map((appointment) => (
                      <AppointmentRow
                        key={appointment.id}
                        appointment={appointment}
                        onChanged={reload}
                        onError={setFeedbackError}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </>
  );
}

function AppointmentRow({
  appointment,
  onChanged,
  onError,
}: {
  appointment: AdminAppointment;
  onChanged: () => void;
  onError: (message: string) => void;
}) {
  return (
    <tr className="transition-colors hover:bg-slate-50/70">
      <td className="px-5 py-3.5">
        <p className="font-semibold text-brand-950">
          {appointment.patientName} {appointment.patientLastName}
        </p>
        <p className="text-xs text-slate-500">{appointment.patientEmail}</p>
      </td>
      <td className="whitespace-nowrap px-5 py-3.5 text-slate-700">
        {formatDateShort(appointment.date)}
        <span className="block text-xs text-slate-500">
          {formatTime(appointment.time)}
        </span>
      </td>
      <td className="px-5 py-3.5 text-slate-700">{appointment.treatment.name}</td>
      <td className="px-5 py-3.5 text-slate-700">{appointment.dentist.name}</td>
      <td className="px-5 py-3.5">
        <StatusBadge status={appointment.status} />
      </td>
      <td className="px-5 py-3.5">
        <AppointmentActions
          appointment={appointment}
          onChanged={onChanged}
          onError={onError}
        />
      </td>
    </tr>
  );
}