import { api } from '@/api';
import { IServerResponse } from '@/types';
import { ICreateShelterSupply, IUpdateShelterSupply } from './types';

const ShelterSupplyServices = {
  update: async (
    shelterId: string,
    supplyId: string,
    payload: IUpdateShelterSupply
  ): Promise<IServerResponse> => {
    const { data } = await api.put(
      `/shelter/supplies/${shelterId}/${supplyId}`,
      payload
    );
    return data;
  },
  updateMany: async (
    shelterId: string,
    supplyIds: string[]
  ): Promise<IServerResponse> => {
    const { data } = await api.put(
      `/shelter/supplies/${shelterId}/supplies/many`,
      {
        ids: supplyIds,
      }
    );
    return data;
  },
  create: async (payload: ICreateShelterSupply): Promise<IServerResponse> => {
    const { data } = await api.post('/shelter/supplies', payload);
    return data;
  },
};

export { ShelterSupplyServices };
