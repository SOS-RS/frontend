import { useFetch } from '..';
import { IViaCepData } from './types';

export const useViaCep = (cep: string | undefined) => {
  const createdPath =
    !cep || cep.length < 8
      ? undefined
      : `https://viacep.com.br/ws/${cep}/json/`;
  return useFetch<IViaCepData>(createdPath);
};
