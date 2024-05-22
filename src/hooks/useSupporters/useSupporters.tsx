import { useFetch } from '../useFetch';
import { ISupporter } from './types';

const useSupporters = () => {
  return useFetch<ISupporter[]>('/supporters', {
    initialValue: [],
    cache: true,
  });
};

export { useSupporters };
