import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseShelterData } from './types';

const useShelter = (shelterId: string) => {
  return useFetch<IUseShelterData>(
    `${PaginatedQueryPath.Shelters}/${shelterId}`
  );
};

export { useShelter };
