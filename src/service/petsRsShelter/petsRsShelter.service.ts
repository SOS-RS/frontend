import axios from 'axios';

import { IPetsRsShelter } from './types';

const PetsRsShelterServices = {
  getByName: async (name: string): Promise<IPetsRsShelter> => {
    const { data } = await axios.get(`https://cms.petsrs.com.br/api/abrigos?filters[Nome][$containsi]=${name}`);
    return data?.data[0];
  },
}

export { PetsRsShelterServices };
