import { useEffect, useState } from 'react';
import type { Dentist } from '../types/index.ts';
import { api } from '../lib/api.ts';
import { FALLBACK_DENTISTS } from '../lib/fallbackData.ts';

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
      .catch((e: unknown) => {
        console.warn('API dentists failed, using fallback:', e);
        setState({
          data: FALLBACK_DENTISTS,
          loading: false,
          error: null,
        });
      });
  }, []);

  return state;
}