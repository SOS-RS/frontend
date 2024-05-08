import { api } from '@/api';
import { ICreateSupply, ISupply } from './types';
import { IServerResponse } from '@/types';

const SupplyServices = {
  create: async (payload: ICreateSupply): Promise<IServerResponse<ISupply>> => {
    const { data } = await api.post('/supplies', payload);
    return data;
  },
};

export { SupplyServices };
