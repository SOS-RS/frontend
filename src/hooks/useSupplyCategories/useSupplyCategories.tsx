import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { ISupplyCategory } from './types';

const useSupplyCategories = () => {
  return useFetch<ISupplyCategory[]>(PaginatedQueryPath.SupplyCategories, []);
};

export { useSupplyCategories };
