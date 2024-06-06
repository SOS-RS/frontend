import { useFetch } from '../useFetch';
import { PaginatedQueryPath } from '../usePaginatedQuery/paths';
import { IUseDonationsData } from './types';

const useDonations = () => {
  return useFetch<IUseDonationsData>(`${PaginatedQueryPath.DonationOrder}`, {
    initialValue: {
      count: 0,
      page: 1,
      perPage: 20,
      results: [],
    },
  });
};

export { useDonations };
