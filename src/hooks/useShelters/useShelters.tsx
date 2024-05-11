import { useState, useCallback, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { IServerResponse } from '@/types';
import { IPaginatedResponse } from '../usePaginatedQuery/types';
import { IUseShelterOptions, IUseSheltersData } from './types';

const useShelters = (options: IUseShelterOptions = {}) => {
  const { cache, getAllShelters } = options;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPaginatedResponse<IUseSheltersData>>({
    count: 0,
    page: 1,
    perPage: 20,
    results: [],
  });
  const [allSheltersData, setAllSheltersData] = useState<IUseSheltersData[]>([]);

  const fetchAllShelters = useCallback(async () => {
    try {
      setLoading(true);
      const resultsPerPage = 100;
      let page = 1;
      let allShelters: IUseSheltersData[] = [];
      let totalPages = 0;

      while (true) {
        const response = await api.get<IServerResponse<any>>('/shelters', {
          params: {
            orderBy: 'prioritySum',
            order: 'desc',
            perPage: resultsPerPage,
            page,
          },
        });

        const { results, count } = response.data.data;
        
        allShelters = [...allShelters, ...results];

        if (page === 1) totalPages = Math.ceil(count / resultsPerPage);

        if (page === totalPages) {
          break;
        }


        page++;
      }
      setAllSheltersData(allShelters);

    } catch (error) {
      console.error('Error getting all shelters:', error);
    } finally {
      setLoading(false);
    }
  }, []);



  
  const refresh = useCallback(
    (config: AxiosRequestConfig<any> = {}, append: boolean = false) => {
      const { search, ...rest } = (config ?? {}).params ?? {};
      const headers = config.headers ?? {};
      if (cache) headers['x-app-cache'] = 'true';
      if (!append) setLoading(true);
      api
        .get<IServerResponse<any>>('/shelters', {
          ...config,
          headers,
          params: {
            orderBy: 'prioritySum',
            order: 'desc',
            search:
              search ?? new URLSearchParams(window.location.search).toString(),
            ...rest,
          },
        })
        .then(({ data }) => {
          if (append) {
            setData((prev) => ({
              ...prev,
              ...data.data,
              results: [...prev.results, ...data.data.results],
            }));
          } else {
            setData((prev) => ({
              ...prev,
              ...data.data,
              results: [...data.data.results],
            }));
          }
        })
        .finally(() => {
          if (!append) setLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    
    if (getAllShelters) {
      fetchAllShelters()
    } else {
      refresh();
    }
  }, [fetchAllShelters, getAllShelters, refresh]);

  return { data, loading, refresh, allSheltersData };
};

export { useShelters };
