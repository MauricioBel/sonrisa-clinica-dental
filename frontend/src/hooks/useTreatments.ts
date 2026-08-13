import { useCallback, useEffect, useState } from 'react';
import type { Treatment } from '../types/index.ts';
import { api, ApiError } from '../lib/api.ts';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useTreatments() {
  const [state, setState] = useState<AsyncState<Treatment[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    api
      .getTreatments()
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

export function useTreatment(slug: string) {
  const [state, setState] = useState<AsyncState<Treatment>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    api
      .getTreatmentBySlug(slug)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setState({
            data: null,
            loading: false,
            error: e instanceof ApiError ? e.message : 'No fue posible cargar el tratamiento.',
          });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}