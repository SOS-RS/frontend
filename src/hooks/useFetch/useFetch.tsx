import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { IServerResponse } from '@/types';
import { IUseFetchOptions } from './types';

<<<<<<< HEAD
function useFetch<T = any>(path?: string, options: IUseFetchOptions<T> = {}) {
=======
function useFetch<T = any>(path: string, options: IUseFetchOptions<T> = {}) {
>>>>>>> 3d3f437 (merge: develop -> master (#91))
  const { cache, initialValue } = options;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>(initialValue || ({} as T));

  const refresh = useCallback(
    (config?: AxiosRequestConfig<any>) => {
      const headers = config?.headers ?? {};
      if (cache) headers['x-app-cache'] = 'true';
      setLoading(true);
<<<<<<< HEAD

      if (path) {
        api
          .get<IServerResponse<T>>(path, { ...config, headers })
          .then(({ data }) => setData(data.data ?? (data as T)))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
=======
      api
        .get<IServerResponse<T>>(path, { ...config, headers })
        .then(({ data }) => setData(data.data))
        .finally(() => setLoading(false));
>>>>>>> 3d3f437 (merge: develop -> master (#91))
    },
    [cache, path]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}

export { useFetch };
