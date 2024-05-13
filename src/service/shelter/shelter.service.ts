import { api } from '../../api';

import { IServerResponse } from '@/types';
import { ICreateShelter, IShelter, IUpdateShelter } from './types';

const ShelterServices = {
  create: async (payload: ICreateShelter): Promise<IServerResponse> => {
    const { data } = await api.post<IServerResponse>('/shelters', payload);
    return data;
  },
  getAll: async (): Promise<IShelter[]> => {
    const { data } = await api.get<IServerResponse<IShelter[]>>('/shelters');
    return data.data;
  },
  getOne: async (id: string): Promise<IShelter> => {
    const { data } = await api.get<IServerResponse<IShelter>>(
      `/shelters/${id}`
    );
    return data.data;
  },
  update: async (
    id: string,
    payload: IUpdateShelter
  ): Promise<IServerResponse> => {
    const { data } = await api.put<IServerResponse>(`/shelters/${id}`, payload);
    return data;
  },
  adminUpdate: async (
    id: string,
    payload: IUpdateShelter
  ): Promise<IServerResponse> => {
    const { data } = await api.put<IServerResponse>(
      `/shelters/${id}/admin`,
      payload
    );
    return data;
  },
};

export { ShelterServices };
