import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseSuppliesHistoryData } from './types';

const useSuppliesHistory = (shelterId: string) => {
  return useFetch<IUseSuppliesHistoryData>(
    `${PaginatedQueryPath.Supplies}/history/${shelterId}`
  );
};

export { useSuppliesHistory };
