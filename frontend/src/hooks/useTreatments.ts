import { useCallback, useEffect, useState } from 'react';
import type { Treatment } from '../types/index.ts';
import { api, ApiError } from '../lib/api.ts';
import { FALLBACK_TREATMENTS } from '../lib/fallbackData.ts';

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
      .catch((e: unknown) => {
        console.warn('API treatments failed, using fallback:', e);
        setState({
          data: FALLBACK_TREATMENTS,
          loading: false,
          error: null,
        });
      });
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
        if (!cancelled) {
          const fallback = FALLBACK_TREATMENTS.find(t => t.slug === slug);
          setState({
            data: fallback ?? null,
            loading: false,
            error: fallback ? null : (e instanceof ApiError ? e.message : 'No fue posible cargar el tratamiento.'),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}