import { api } from '@/api';
import { IServerResponse } from '@/types';
import { AxiosRequestConfig } from 'axios';

import { useState, useCallback, useEffect } from 'react';

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

  const refresh = useCallback((config: AxiosRequestConfig<any> = {}) => {
    setLoading(true);
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
      .then(({ data }) => setData(data.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
};

export { useShelters };
