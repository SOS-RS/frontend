import { useFetch } from '../useFetch';
import { IPartner } from './types';

const usePartners = () => {
  return useFetch<IPartner[]>('/partners', {
    initialValue: [],
    cache: true,
  });
};

export { usePartners };
