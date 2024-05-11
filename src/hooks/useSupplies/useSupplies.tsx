import { ISupply } from '@/service/supply/types';
import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';

const useSupplies = () => {
  return useFetch<ISupply[]>(PaginatedQueryPath.Supplies, {
    initialValue: [],
    cache: true,
  });
};

export { useSupplies };
