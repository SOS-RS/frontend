import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { ISupplyCategory } from './types';

const useSupplyCategories = () => {
  const supplyCategories = useFetch<ISupplyCategory[]>(PaginatedQueryPath.SupplyCategories, {
    initialValue: [],
    cache: true,
  });
  supplyCategories.data.sort((a, b) => a.name.localeCompare(b.name));
  return supplyCategories;
};

export { useSupplyCategories };
