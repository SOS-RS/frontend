import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IShelterCitiesData } from './types';

export const useShelterCities = () => {
  return useFetch<IShelterCitiesData[]>(PaginatedQueryPath.ShelterCities, {
    cache: true,
  });
};
