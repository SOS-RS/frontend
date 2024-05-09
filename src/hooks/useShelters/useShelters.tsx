import { useState, useCallback, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/api';
import { IServerResponse } from '@/types';
import { IPaginatedResponse } from '../usePaginatedQuery/types';
import { IUseSheltersData } from './types';

const useShelters = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPaginatedResponse<IUseSheltersData>>({
    count: 0,
    page: 1,
    perPage: 20,
    results: [],
    filters: {
      search: '',
      priority: undefined,
      supplies: [],
      supplyCategories: [],
      filterAvailableShelter: false,
      filterUnavailableShelter: false,
      waitingShelterAvailability: false
    }
  });

  const resetSearch = () => {
    const params = {
      search: '',
      priority: undefined,
      supplies: [],
      supplyCategories: [],
      filterAvailableShelter: false,
      filterUnavailableShelter: false,
      waitingShelterAvailability: false,
      page: 1,
      perPage: 20,      
    }
    search({          
      params: params,
    });
  }

  const search = useCallback(
    (config: AxiosRequestConfig<any> = {}, append: boolean = false) => {
      if (!append) setLoading(true);
      api
        .get<IServerResponse<any>>(
          '/shelters/search',
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
              filters: {
                search: '',
                priority: config.params.priority,
                supplies: config.params.supplies ?? [],
                supplyCategories: config.params.supplyCategories ?? [],
                filterAvailableShelter: config.params.filterAvailableShelter ?? false,
                filterUnavailableShelter: config.params.filterUnavailableShelter ?? false,
                waitingShelterAvailability: config.params.waitingShelterAvailability ?? false,
              }
            }));
          } else {
            setData((prev) => ({
              ...prev,
              ...data.data,
              results: [...data.data.results],
              filters: {
                search: config.params.search,
                priority: config.params.priority,
                supplies: config.params.supplies ?? [],
                supplyCategories: config.params.supplyCategories ?? [],
                filterAvailableShelter: config.params.filterAvailableShelter ?? false,
                filterUnavailableShelter: config.params.filterUnavailableShelter ?? false,
                waitingShelterAvailability: config.params.waitingShelterAvailability ?? false,
              }
            }));          
          }
        })
        .finally(() => {
          if(!append) setLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    resetSearch();
  }, []);

  return { data, loading, search, resetSearch };
};

export { useShelters };
