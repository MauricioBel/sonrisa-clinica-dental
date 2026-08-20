import { useState } from 'react';
import { Button } from '../ui/Button.tsx';

interface ConfirmActionProps {
  confirmLabel: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  pending?: boolean;
  pendingLabel?: string;
  danger?: boolean;
}

/**
 * Acción destructiva con confirmación inline: el botón inicial arma el
 * estado de confirmación ("¿estás seguro?") antes de ejecutar la llamada.
 */
export function ConfirmAction({
  confirmLabel,
  message,
  onConfirm,
  pending = false,
  pendingLabel = 'Procesando...',
  danger = true,
}: ConfirmActionProps) {
  const [armed, setArmed] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setArmed(false);
  };

  if (!armed) {
    return (
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className={danger ? 'text-red-700 hover:bg-red-50' : ''}
        onClick={() => setArmed(true)}
      >
        {confirmLabel}
      </Button>
    );
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="text-xs text-slate-500">{message}</span>
      <Button
        type="button"
        size="sm"
        variant="danger"
        loading={pending}
        disabled={pending}
        onClick={() => void handleConfirm()}
      >
        {pending ? pendingLabel : confirmLabel}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        disabled={pending}
        onClick={() => setArmed(false)}
      >
        Cancelar
      </Button>
    </span>
  );
}