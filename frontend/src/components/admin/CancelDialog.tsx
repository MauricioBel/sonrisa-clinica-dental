import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button.tsx';
import { FormField, inputStyles } from '../ui/FormField.tsx';
import { ApiError } from '../../lib/api.ts';

interface CancelDialogProps {
  title?: string;
  subject?: string;
  onCancel: (reason: string) => Promise<unknown>;
  onClose: () => void;
}

/** Diálogo reutilizable para cancelar una cita con motivo obligatorio. */
export function CancelDialog({
  title = 'Cancelar cita',
  subject,
  onCancel,
  onClose,
}: CancelDialogProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const trimmed = reason.trim();
    if (trimmed.length < 3) {
      setError('El motivo debe tener al menos 3 caracteres');
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await onCancel(trimmed);
    } catch (e) {
      setError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible cancelar la cita. Inténtalo de nuevo.',
      );
      setBusy(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-brand-950">{title}</h2>
            {subject && <p className="mt-0.5 text-sm text-slate-600">{subject}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar diálogo"
            disabled={busy}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4">
          <FormField id="cancel-reason" label="Motivo de la cancelación" error={error ?? undefined}>
            <textarea
              id="cancel-reason"
              rows={3}
              autoFocus
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`${inputStyles} resize-y`}
              placeholder="Ej: el paciente solicitó reagendar"
            />
          </FormField>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose} disabled={busy}>
            Volver
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => void submit()}
            loading={busy}
          >
            {busy ? 'Cancelando...' : 'Cancelar cita'}
          </Button>
        </div>
      </div>
    </div>
  );
}