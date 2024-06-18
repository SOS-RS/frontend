import { useState, useCallback, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { IServerResponse } from '@/types';

import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseDashboardData, IUseDashboardOptions } from './types';

const useDashboard = (options: IUseDashboardOptions = {}) => {
  const { cache } = options;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IUseDashboardData>({
    allShelters: 0,
    allPeopleSheltered: 0,
    shelterAvailable: 0,
    shelterFull: 0,
    shelterWithoutInformation: 0,
  });

  const refresh = useCallback(
    (config: AxiosRequestConfig<any> = {}, append: boolean = false) => {
      const headers = config.headers ?? {};
      if (cache) headers['x-app-cache'] = 'true';
      if (!append) setLoading(true);
      api
        .get<IServerResponse<any>>(PaginatedQueryPath.Dashboard, {
          ...config,
          headers,
        })
        .then(({ data }) => {
          if (append) {
            setData((prev) => ({
              ...prev,
              ...data.data,
            }));
          } else {
            setData((prev) => ({
              ...prev,
              ...data.data,
            }));
          }
        })
        .finally(() => {
          if (!append) setLoading(false);
        });
    },
    [cache]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
};

export { useDashboard };
