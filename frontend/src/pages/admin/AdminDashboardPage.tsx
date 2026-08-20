import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  CalendarOff,
  Clock,
  HeartPulse,
  Plus,
  Stethoscope,
} from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { StatusBadge } from '../../components/admin/StatusBadge.tsx';
import { useAdminAppointments } from '../../hooks/admin/useAdminAppointments.ts';
import { useAdminDentists } from '../../hooks/admin/useAdminDentists.ts';
import { useAdminTreatments } from '../../hooks/admin/useAdminTreatments.ts';
import { useAdminTimeBlocks } from '../../hooks/admin/useAdminTimeBlocks.ts';
import { addDaysISO, formatDateShort, todayISO } from '../../lib/format.ts';
import { Seo } from '../../components/Seo.tsx';

interface StatCardProps {
  label: string;
  value: number;
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  to?: string;
}

function StatCard({ label, value, hint, icon: Icon, to }: StatCardProps) {
  const content = (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 font-display text-3xl font-bold text-brand-950">{value}</p>
        {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      </div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  );

  return (
    <Card className={to ? 'transition hover:-translate-y-0.5 hover:shadow-md' : ''}>
      {to ? (
        <Link to={to} className="block h-full p-5">
          {content}
        </Link>
      ) : (
        <div className="p-5">{content}</div>
      )}
    </Card>
  );
}

export function AdminDashboardPage() {
  const today = todayISO();
  const horizon = addDaysISO(today, 7);

  const appointmentsParams = useMemo(
    () => ({ from: today, to: horizon }),
    [today, horizon],
  );
  const timeBlocksParams = useMemo(() => ({ date: today }), [today]);
  const appointments = useAdminAppointments(appointmentsParams);
  const dentists = useAdminDentists();
  const treatments = useAdminTreatments();
  const blocks = useAdminTimeBlocks(timeBlocksParams);

  const loading =
    appointments.loading ||
    dentists.loading ||
    treatments.loading ||
    blocks.loading;
  const error =
    appointments.error ?? dentists.error ?? blocks.error ?? treatments.error;

  const activeAppointments =
    appointments.data?.filter(
      (a) => a.status === 'PENDING' || a.status === 'CONFIRMED',
    ) ?? [];
  const todayCount =
    appointments.data?.filter((a) => a.date === today).length ?? 0;
  const activeDentists =
    dentists.data?.filter((d) => d.isActive).length ?? 0;
  const activeTreatments =
    treatments.data?.filter((t) => t.isActive).length ?? 0;
  const blocksCount = blocks.data?.length ?? 0;

  return (
    <>
      <Seo
        title="Resumen administrativo"
        description="Resumen del panel administrativo de Sonrisa Clínica Dental."
        path="/admin"
        noIndex
      />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-950">Resumen</h1>
          <p className="mt-1 text-sm text-slate-600">
            Panorama general de la clínica para los próximos 7 días.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button to="/admin/dentistas/nuevo" variant="outline" size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Dentista
          </Button>
          <Button to="/admin/tratamientos/nuevo" variant="outline" size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Tratamiento
          </Button>
          <Button to="/admin/bloqueos" variant="outline" size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Bloqueo
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {loading && !error && <Spinner label="Cargando resumen..." />}

      {!loading && !error && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard
              label="Citas activas (7 días)"
              value={activeAppointments.length}
              hint="Pendientes y confirmadas"
              icon={CalendarDays}
              to="/admin/citas"
            />
            <StatCard
              label="Citas de hoy"
              value={todayCount}
              hint={formatDateShort(today)}
              icon={Clock}
              to="/admin/citas"
            />
            <StatCard
              label="Dentistas activos"
              value={activeDentists}
              icon={Stethoscope}
              to="/admin/dentistas"
            />
            <StatCard
              label="Tratamientos activos"
              value={activeTreatments}
              icon={HeartPulse}
              to="/admin/tratamientos"
            />
            <StatCard
              label="Bloqueos de hoy"
              value={blocksCount}
              hint="Franjas no disponibles"
              icon={CalendarOff}
              to="/admin/bloqueos"
            />
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="font-display text-lg font-bold text-brand-950">
                Próximas citas
              </h2>
              <Button to="/admin/citas" variant="ghost" size="sm">
                Ver todas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {activeAppointments.length === 0 ? (
              <Card className="p-6 text-center text-sm text-slate-500">
                No hay citas pendientes ni confirmadas en los próximos 7 días.
              </Card>
            ) : (
              <Card className="divide-y divide-slate-100">
                {activeAppointments.slice(0, 8).map((a) => (
                  <Link
                    key={`${a.id}-${a.status}`}
                    to={`/admin/citas/${a.id}`}
                    className="flex flex-wrap items-center gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-800">
                        {`${a.patientName.charAt(0)}${a.patientLastName.charAt(0)}`}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-brand-950">
                          {a.patientName} {a.patientLastName}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {a.dentist.name} · {a.treatment.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-600">
                        {formatDateShort(a.date)} · {a.time} hrs
                      </span>
                      <StatusBadge status={a.status} />
                    </div>
                  </Link>
                ))}
              </Card>
            )}
          </div>
        </>
      )}
    </>
  );
}