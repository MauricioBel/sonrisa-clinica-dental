import { useCallback, useEffect, useState } from 'react';
import type { Dentist } from '../../types/index.ts';
import { api, ApiError } from '../../lib/api.ts';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Listado completo de dentistas del panel (incluye inactivos). */
export function useAdminDentists() {
  const [state, setState] = useState<AsyncState<Dentist[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    api
      .adminDentists()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setState({
          data: null,
          loading: false,
          error: e instanceof ApiError ? e.message : 'No fue posible cargar los dentistas.',
        }),
      );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}