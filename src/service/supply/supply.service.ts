import { api } from '@/api';
import { ICreateSupply, IUpdateSupply } from './types';
import { IServerResponse } from '@/types';

const SupplyServices = {
  update: async (
    id: string,
    payload: IUpdateSupply
  ): Promise<IServerResponse> => {
    const { data } = await api.put(`/supplies/${id}`, payload);
    return data;
  },
  create: async (payload: ICreateSupply): Promise<IServerResponse> => {
    const { data } = await api.post('/supplies', payload);
    return data;
  },
};

export { SupplyServices };
