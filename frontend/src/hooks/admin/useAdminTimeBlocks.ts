import { useCallback, useEffect, useState } from 'react';
import type { TimeBlock, TimeBlockParams } from '../../types/index.ts';
import { api, ApiError } from '../../lib/api.ts';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Listado de bloqueos de agenda del panel con filtros y recarga manual. */
export function useAdminTimeBlocks(params: TimeBlockParams = {}) {
  const [state, setState] = useState<AsyncState<TimeBlock[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    api
      .adminTimeBlocks(params)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setState({
          data: null,
          loading: false,
          error: e instanceof ApiError ? e.message : 'No fue posible cargar los bloqueos.',
        }),
      );
  }, [params]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}