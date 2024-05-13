import { useFetch } from '../useFetch';
import { SupplyRank } from './types';

const useSupplyRank = () => {
  return useFetch<SupplyRank>(`/supply/top10`);
};

export { useSupplyRank };
