import { useCallback, useEffect, useState } from 'react';
import type { Appointment } from '../types/index.ts';
import { api, ApiError } from '../lib/api.ts';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAppointment(id: number | null) {
  const [state, setState] = useState<AsyncState<Appointment>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    if (!id) {
      setState({ data: null, loading: false, error: 'Reserva no encontrada.' });
      return;
    }
    setState({ data: null, loading: true, error: null });
    api
      .getAppointment(id)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setState({
          data: null,
          loading: false,
          error: e instanceof ApiError ? e.message : 'No fue posible cargar la reserva.',
        }),
      );
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
