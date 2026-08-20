import { useCallback, useEffect, useState } from 'react';
import type {
  AdminAppointment,
  AdminAppointmentParams,
} from '../../types/index.ts';
import { api, ApiError } from '../../lib/api.ts';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Listado de citas del panel admin con filtros y recarga manual. */
export function useAdminAppointments(params: AdminAppointmentParams = {}) {
  const [state, setState] = useState<AsyncState<AdminAppointment[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    api
      .adminAppointments(params)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setState({
          data: null,
          loading: false,
          error: e instanceof ApiError ? e.message : 'No fue posible cargar las citas.',
        }),
      );
  }, [params]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}