import { useCallback, useEffect, useState } from 'react';
import type { Availability } from '../types/index.ts';
import { api, ApiError } from '../lib/api.ts';

interface AvailabilityState {
  data: Availability | null;
  loading: boolean;
  error: string | null;
}

interface AvailabilityParams {
  date: string;
  treatmentId: number;
  dentistId: number;
}

export function useAvailability({
  date,
  treatmentId,
  dentistId,
}: AvailabilityParams) {
  const [state, setState] = useState<AvailabilityState>({
    data: null,
    loading: false,
    error: null,
  });

  const load = useCallback(() => {
    if (!treatmentId || !dentistId || !date) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState({ data: null, loading: true, error: null });
    api
      .getAvailability({ date, treatmentId, dentistId })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setState({
          data: null,
          loading: false,
          error: e instanceof ApiError ? e.message : 'No fue posible consultar los horarios.',
        }),
      );
  }, [date, treatmentId, dentistId]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}