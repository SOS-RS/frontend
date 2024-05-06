import { useState, useCallback, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { IServerResponse } from '@/types';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IPaginatedResponse } from '../usePaginatedQuery/types';
import { IUseSheltersData } from './types';

const useShelters = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPaginatedResponse<IUseSheltersData>>({
    count: 0,
    page: 1,
    perPage: 20,
    results: [],
  });

  const refresh = useCallback(
    (config: AxiosRequestConfig<any> = {}, append: boolean = false) => {
      if (!append) setLoading(true);
      api
        .get<IServerResponse<IPaginatedResponse<IUseSheltersData>>>(
          PaginatedQueryPath.Shelters,
          {
            ...config,
            params: {
              orderBy: 'prioritySum',
              order: 'desc',
              ...(config.params ?? {}),
            },
          }
        )
        .then(({ data }) => {
          if (append) {
            setData((prev) => ({
              ...prev,
              ...data.data,
              results: [...prev.results, ...data.data.results],
            }));
          } else {
            setData(data.data);
          }
        })
        .finally(() => {
          if (!append) setLoading(false);
        });
    },
    []
  );

  console.log(data.results.length);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
};

export { useShelters };
