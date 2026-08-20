import { useCallback, useEffect, useState } from 'react';
import type { AdminTreatment } from '../../types/index.ts';
import { api, ApiError } from '../../lib/api.ts';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Listado completo de tratamientos del panel (incluye inactivos). */
export function useAdminTreatments() {
  const [state, setState] = useState<AsyncState<AdminTreatment[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    api
      .adminTreatments()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setState({
          data: null,
          loading: false,
          error: e instanceof ApiError ? e.message : 'No fue posible cargar los tratamientos.',
        }),
      );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}