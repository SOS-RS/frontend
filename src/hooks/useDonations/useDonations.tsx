import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseDonationsData } from './types';

const useDonations = (shelterId: string) => {
  return useFetch<IUseDonationsData>(`${PaginatedQueryPath.DonationOrder}`);
};

export { useDonations };
