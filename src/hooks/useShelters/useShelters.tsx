import { usePaginatedQuery } from '../usePaginatedQuery';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseShelterData } from './types';

const useShelters = () => {
  return usePaginatedQuery<IUseShelterData>(PaginatedQueryPath.Shelters);
};

export { useShelters };
