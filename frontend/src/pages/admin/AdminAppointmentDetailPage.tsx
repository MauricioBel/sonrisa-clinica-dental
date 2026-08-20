import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarClock, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { FormField, inputStyles } from '../../components/ui/FormField.tsx';
import { ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { StatusBadge } from '../../components/admin/StatusBadge.tsx';
import { AppointmentActions } from '../../components/admin/AppointmentActions.tsx';
import { useAvailability } from '../../hooks/useAvailability.ts';
import { useAdminDentists } from '../../hooks/admin/useAdminDentists.ts';
import { api, ApiError } from '../../lib/api.ts';
import type {
  AdminAppointmentDetail,
  RescheduleAppointmentPayload,
} from '../../types/index.ts';
import {
  formatDateLong,
  formatDateShort,
  formatTime,
  todayISO,
} from '../../lib/format.ts';
import { Seo } from '../../components/Seo.tsx';

interface DetailState {
  data: AdminAppointmentDetail | null;
  loading: boolean;
  error: string | null;
}

export function AdminAppointmentDetailPage() {
  const { id } = useParams();
  const appointmentId = Number(id);
  const navigate = useNavigate();

  const [state, setState] = useState<DetailState>({
    data: null,
    loading: true,
    error: null,
  });
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const [rescheduleDate, setRescheduleDate] = useState(todayISO());
  const [rescheduleDentistId, setRescheduleDentistId] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [rescheduling, setRescheduling] = useState(false);
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  const dentists = useAdminDentists();

  const load = useCallback(() => {
    if (!Number.isInteger(appointmentId) || appointmentId <= 0) {
      setState({
        data: null,
        loading: false,
        error: 'Identificador de cita inválido.',
      });
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null }));
    api
      .getAdminAppointment(appointmentId)
      .then((data) => {
        setState({ data, loading: false, error: null });
        setRescheduleDentistId(data.dentistId);
      })
      .catch((e: unknown) =>
        setState({
          data: null,
          loading: false,
          error:
            e instanceof ApiError
              ? e.message
              : 'No fue posible cargar la cita.',
        }),
      );
  }, [appointmentId]);

  useEffect(() => {
    load();
  }, [load]);

  const appointment = state.data;
  const availability = useAvailability({
    date: rescheduleDate,
    treatmentId: appointment?.treatmentId ?? 0,
    dentistId: rescheduleDentistId,
  });

  const activeDentists = dentists.data?.filter((d) => d.isActive) ?? [];

  const submitReschedule = async () => {
    if (!appointment || !selectedSlot) return;
    if (rescheduling) return;
    setRescheduling(true);
    setRescheduleError(null);
    try {
      const payload: RescheduleAppointmentPayload = {
        date: rescheduleDate,
        startTime: selectedSlot,
      };
      if (rescheduleDentistId !== appointment.dentistId) {
        payload.dentistId = rescheduleDentistId;
      }
      const created = await api.adminRescheduleAppointment(
        appointment.id,
        payload,
      );
      navigate(`/admin/citas/${created.id}`, { replace: true });
    } catch (e) {
      setRescheduleError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible reagendar la cita. Inténtalo de nuevo.',
      );
    } finally {
      setRescheduling(false);
    }
  };

  if (state.loading) return <Spinner label="Cargando cita..." />;
  if (state.error) return <ErrorMessage message={state.error} />;
  if (!appointment) return <ErrorMessage message="No se encontró la cita." />;

  const reschedulable =
    appointment.status === 'PENDING' || appointment.status === 'CONFIRMED';

  return (
    <>
      <Seo
        title={`Cita #${appointment.id}`}
        description="Detalle de cita del panel administrativo."
        path={`/admin/citas/${appointment.id}`}
        noIndex
      />

      <Link
        to="/admin/citas"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a citas
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-950">
            Cita #{appointment.id}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {appointment.patientName} {appointment.patientLastName}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            Origen: {appointment.source === 'ADMIN' ? 'Panel admin' : 'Sitio web'}
          </span>
          <StatusBadge status={appointment.status} />
        </div>
      </div>

      {feedbackError && (
        <div className="mb-4">
          <ErrorMessage message={feedbackError} />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <dl className="divide-y divide-slate-100">
            <DetailRow label="Tratamiento">
              {appointment.treatment.name}
            </DetailRow>
            <DetailRow label="Profesional">{appointment.dentist.name}</DetailRow>
            <DetailRow label="Fecha">
              {formatDateLong(appointment.date)}
            </DetailRow>
            <DetailRow label="Hora">{formatTime(appointment.time)}</DetailRow>
            <DetailRow label="Contacto">
              {appointment.patientEmail} · {appointment.patientPhone}
            </DetailRow>
            <DetailRow label="Comentario">
              {appointment.comment ?? 'Sin comentario'}
            </DetailRow>
            {appointment.status === 'CANCELLED' && (
              <DetailRow label="Motivo de cancelación">
                {appointment.cancelReason ?? 'Sin motivo registrado'}
              </DetailRow>
            )}
          </dl>

          {reschedulable && (
            <div className="border-t border-slate-100 px-5 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-500">Acciones:</span>
                <AppointmentActions
                  appointment={appointment}
                  onChanged={load}
                  onError={setFeedbackError}
                />
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          {appointment.rescheduledTo.length > 0 && (
            <Card className="p-5">
              <h2 className="font-display text-base font-bold text-brand-950">
                Reagendamientos
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {appointment.rescheduledTo.map((a) => (
                  <li key={a.id}>
                    <Link
                      to={`/admin/citas/${a.id}`}
                      className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-brand-800 transition-colors hover:bg-brand-100"
                    >
                      <CalendarClock className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {formatDateShort(a.date)} · {a.time} hrs
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {appointment.rescheduledFromId && appointment.rescheduledFrom && (
            <Card className="p-5">
              <h2 className="font-display text-base font-bold text-brand-950">
                Origen de esta cita
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Reagendada desde la cita{' '}
                <Link
                  to={`/admin/citas/${appointment.rescheduledFrom.id}`}
                  className="font-semibold text-brand-700 underline"
                >
                  #{appointment.rescheduledFrom.id}
                </Link>{' '}
                ({formatDateShort(appointment.rescheduledFrom.date)} a las{' '}
                {appointment.rescheduledFrom.time} hrs)
              </p>
            </Card>
          )}
        </div>
      </div>

      {reschedulable && (
        <Card className="mt-6 p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brand-950">
            <CalendarClock className="h-5 w-5 text-brand-600" aria-hidden="true" />
            Reagendar cita
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Elige un nuevo horario disponible. La cita original quedará
            cancelada automáticamente.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <FormField
              id="reschedule-date"
              label="Nueva fecha"
              hint={`Duración estimada: ${appointment.treatment.durationMinutes} min`}
            >
              <input
                id="reschedule-date"
                type="date"
                className={inputStyles}
                min={todayISO()}
                value={rescheduleDate}
                onChange={(e) => {
                  setRescheduleDate(e.target.value);
                  setSelectedSlot('');
                  setRescheduleError(null);
                }}
              />
            </FormField>
            <FormField id="reschedule-dentist" label="Profesional (opcional)">
              <select
                id="reschedule-dentist"
                className={inputStyles}
                value={rescheduleDentistId}
                onChange={(e) => {
                  setRescheduleDentistId(Number(e.target.value));
                  setSelectedSlot('');
                  setRescheduleError(null);
                }}
              >
                <option value={appointment.dentistId}>
                  {appointment.dentist.name} (actual)
                </option>
                {activeDentists
                  .filter((d) => d.id !== appointment.dentistId)
                  .map((dentist) => (
                    <option key={dentist.id} value={dentist.id}>
                      {dentist.name}
                    </option>
                  ))}
              </select>
            </FormField>
          </div>

          {rescheduleError && (
            <div className="mt-4">
              <ErrorMessage message={rescheduleError} />
            </div>
          )}

          {availability.loading && <Spinner label="Consultando horarios..." />}
          {availability.error && <ErrorMessage message={availability.error} />}

          {availability.data &&
            !availability.loading &&
            !availability.error &&
            availability.data.slots.length === 0 && (
              <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                No hay horarios disponibles para la fecha y profesional elegidos.
                Prueba con otra fecha.
              </p>
            )}

          {availability.data &&
            availability.data.isOpen &&
            availability.data.slots.length > 0 && (
              <div className="mt-4">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Horarios disponibles para {formatDateLong(rescheduleDate)}
                </span>
                <div
                  role="radiogroup"
                  aria-label="Elige el nuevo horario"
                  className="flex flex-wrap gap-2"
                >
                  {availability.data.slots.map((slot) => {
                    const selected = slot === selectedSlot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setRescheduleError(null);
                        }}
                        className={`flex min-w-20 items-center justify-center gap-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors ${
                          selected
                            ? 'border-brand-600 bg-brand-700 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          <div className="mt-5 flex justify-end">
            <Button
              type="button"
              loading={rescheduling}
              disabled={
                rescheduling || !selectedSlot || !rescheduleDate
              }
              onClick={() => void submitReschedule()}
            >
              Reagendar cita
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="shrink-0 text-sm font-semibold text-slate-500">{label}</dt>
      <dd className="text-sm font-medium text-brand-950">{children}</dd>
    </div>
  );
}