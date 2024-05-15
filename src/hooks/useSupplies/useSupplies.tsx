import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseSuppliesData } from './types';

const useSupplies = () => {
  return useFetch<IUseSuppliesData[]>(PaginatedQueryPath.Supplies, {
    initialValue: [],
    cache: true,
  });
};

export { useSupplies };
