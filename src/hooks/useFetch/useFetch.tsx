import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { IServerResponse } from '@/types';

function useFetch<T = any>(path: string, initialValue?: T) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>(initialValue || ({} as T));

  const refresh = useCallback(
    (config?: AxiosRequestConfig<any>) => {
      setLoading(true);
      api
        .get<IServerResponse<T>>(path, config)
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

export { useFetch };
