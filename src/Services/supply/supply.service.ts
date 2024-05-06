import { api } from '@/api';
import { ISupply } from './types';
import { IServerResponse } from '@/types';

const SupplyServices = {
  update: async (
    id: string,
    payload: Partial<Pick<ISupply, 'name' | 'supplyCategoryId' | 'priority'>>
  ): Promise<IServerResponse> => {
    const { data } = await api.put(`/supplies/${id}`, payload);
    return data;
  },
};

export { SupplyServices };
