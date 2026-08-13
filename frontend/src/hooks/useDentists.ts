import { useEffect, useState } from 'react';
import type { Dentist } from '../types/index.ts';
import { api, ApiError } from '../lib/api.ts';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useDentists() {
  const [state, setState] = useState<AsyncState<Dentist[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    api
      .getDentists()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setState({
          data: null,
          loading: false,
          error: e instanceof ApiError ? e.message : 'No fue posible cargar el equipo médico.',
        }),
      );
  }, []);

  return state;
}