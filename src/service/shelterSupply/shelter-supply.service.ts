import { api } from '@/api';
import { IServerResponse } from '@/types';
import {
  ICreateShelterSupply,
  IShelterSupplyData,
  IUpdateShelterSupply,
} from './types';

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
  create: async (payload: ICreateShelterSupply): Promise<IServerResponse> => {
    const { data } = await api.post('/shelter/supplies', payload);
    return data;
  },
  getAll: async (
    shelterId: string
  ): Promise<IServerResponse<IShelterSupplyData[]>> => {
    const { data } = await api.get<IServerResponse<IShelterSupplyData[]>>(
      `/shelter/supplies/${shelterId}`
    );
    return data;
  },
};

export { ShelterSupplyServices };
