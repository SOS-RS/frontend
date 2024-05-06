import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { PaginatedQueryPath } from './paths';
import { IPaginatedResponse } from './types';
import { IServerResponse } from '@/types';

function usePaginatedQuery<T = any>(path: string | PaginatedQueryPath) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPaginatedResponse<T>>({
    count: 0,
    page: 1,
    perPage: 20,
    results: [],
  });

  const refresh = useCallback(
    (config?: AxiosRequestConfig<any>) => {
      setLoading(true);
      api
        .get<IServerResponse<IPaginatedResponse<T>>>(path, config)
        .then(({ data }) => setData(data.data))
        .finally(() => setLoading(false));
    },
    [path]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}

export { usePaginatedQuery };
