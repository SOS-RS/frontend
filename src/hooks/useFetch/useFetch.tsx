import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { IServerResponse } from '@/types';
import { IUseFetchOptions } from './types';

function useFetch<T = any>(path: string, options: IUseFetchOptions<T> = {}) {
  const { cache, initialValue } = options;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>(initialValue || ({} as T));

  const refresh = useCallback(
    (config?: AxiosRequestConfig<any>) => {
      const headers = config?.headers ?? {};
      if (cache) headers['x-app-cache'] = 'true';
      setLoading(true);
      api
        .get<IServerResponse<T>>(path, { ...config, headers })
        .then(({ data }) => setData(data.data))
        .finally(() => setLoading(false));
    },
    [cache, path]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}

export { useFetch };
