import { api } from '../../api';

import { IServerResponse } from '@/types';
import { ICreateUser, IUpdateUser } from './types';

const UserServices = {
  create: async (payload: ICreateUser): Promise<IServerResponse> => {
    const { data } = await api.post<IServerResponse>('/users', payload);
    return data;
  },
  update: async (
    userId: string,
    payload: IUpdateUser
  ): Promise<IServerResponse> => {
    const { data } = await api.put<IServerResponse>(
      `/users/${userId}`,
      payload
    );
    return data;
  },
};

export { UserServices };
