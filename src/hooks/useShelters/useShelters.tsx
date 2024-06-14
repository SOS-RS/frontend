import { useState, useCallback, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { IServerResponse } from '@/types';
import { IPaginatedResponse } from '../usePaginatedQuery/types';
import { IUseShelterOptions, IUseSheltersData } from './types';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';

const useShelters = (options: IUseShelterOptions = {}) => {
  const { cache } = options;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPaginatedResponse<IUseSheltersData>>({
    count: 0,
    page: 1,
    perPage: 20,
    results: [],
  });

  const refresh = useCallback(
    (config: AxiosRequestConfig<any> = {}, append: boolean = false) => {
      const { search, ...rest } = (config ?? {}).params ?? {};
      const headers = config.headers ?? {};
      if (cache && import.meta.env.VITE_REQUEST_CACHE !== 'false')
        headers['x-app-cache'] = 'true';
      if (!append) setLoading(true);
      api
        .get<IServerResponse<any>>(PaginatedQueryPath.Shelters, {
          ...config,
          headers,
          params: {
            orderBy: 'updatedAt',
            order: 'desc',
            search:
              search ?? new URLSearchParams(window.location.search).toString(),
            ...rest,
          },
        })
        .then(({ data }) => {
          setData((prev) => ({
            ...prev,
            ...data.data,
            results: [...data.data.results],
          }));
        })
        .finally(() => {
          setLoading(!append);
        });
    },
    [cache]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
};

export { useShelters };
