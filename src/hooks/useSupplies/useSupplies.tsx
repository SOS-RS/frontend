import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseSuppliesData } from './types';

const useSupplies = () => {
<<<<<<< HEAD
  return useFetch<IUseSuppliesData[]>(PaginatedQueryPath.Supplies, {
=======
  return useFetch<ISupply[]>(PaginatedQueryPath.Supplies, {
>>>>>>> 3d3f437 (merge: develop -> master (#91))
    initialValue: [],
    cache: true,
  });
};

export { useSupplies };
