import { usePaginatedQuery } from '../usePaginatedQuery';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseSheltersData } from './types';

const useShelters = () => {
  return usePaginatedQuery<IUseSheltersData>(PaginatedQueryPath.Shelters);
};

export { useShelters };
