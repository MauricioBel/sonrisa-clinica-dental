import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';
import type {
  AdminAppointment,
  ChangeAppointmentStatusPayload,
} from '../../types/index.ts';
import { api, ApiError } from '../../lib/api.ts';
import { Button } from '../ui/Button.tsx';
import { CancelDialog } from './CancelDialog.tsx';
import { formatDateShort } from '../../lib/format.ts';

interface AppointmentActionsProps {
  appointment: AdminAppointment;
  onChanged: () => void;
  onError: (message: string) => void;
}

type BusyAction = 'confirm' | 'complete' | 'cancel';

/**
 * Acciones validas para una cita segun su estado (mismas reglas del backend):
 * PENDING puede confirmarse o completarse; CONFIRMED puede completarse; ambas
 * pueden cancelarse (con motivo) y reagendarse.
 */
export function AppointmentActions({
  appointment,
  onChanged,
  onError,
}: AppointmentActionsProps) {
  const [busy, setBusy] = useState<BusyAction | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  const actionable =
    appointment.status === 'PENDING' || appointment.status === 'CONFIRMED';

  const run = async (
    action: BusyAction,
    fn: () => Promise<unknown>,
  ) => {
    if (busy) return;
    setBusy(action);
    try {
      await fn();
      onChanged();
    } catch (e) {
      onError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible completar la operación. Inténtalo de nuevo.',
      );
    } finally {
      setBusy(null);
    }
  };

  const changeStatus = (status: ChangeAppointmentStatusPayload['status']) =>
    api.adminChangeAppointmentStatus(appointment.id, { status });

  return (
    <div className="flex flex-wrap items-center gap-1">
      <Link
        to={`/admin/citas/${appointment.id}`}
        className="rounded-lg px-2 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50"
      >
        Detalle
      </Link>

      {appointment.status === 'PENDING' && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={busy !== null}
          loading={busy === 'confirm'}
          onClick={() => void run('confirm', () => changeStatus('CONFIRMED'))}
        >
          Confirmar
        </Button>
      )}

      {actionable && (
        <>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={busy !== null}
            loading={busy === 'complete'}
            onClick={() => void run('complete', () => changeStatus('COMPLETED'))}
          >
            Completar
          </Button>
          <Button
            to={`/admin/citas/${appointment.id}`}
            size="sm"
            variant="ghost"
          >
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            Reagendar
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-red-700 hover:bg-red-50"
            disabled={busy !== null}
            onClick={() => setCancelOpen(true)}
          >
            Cancelar
          </Button>
        </>
      )}

      {cancelOpen && (
        <CancelDialog
          subject={`${appointment.patientName} ${appointment.patientLastName} · ${formatDateShort(appointment.date)} a las ${appointment.time} hrs (${appointment.treatment.name})`}
          onCancel={(reason) =>
            api.adminCancelAppointment(appointment.id, { reason })
          }
          onClose={() => setCancelOpen(false)}
        />
      )}
    </div>
  );
}