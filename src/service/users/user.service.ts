import { api } from '../../api';

import { IServerResponse } from '@/types';
import { ICreateUser, IFindUserResponse, IUpdateUser, IUser } from './types';

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
  find: async (
    field: keyof IUser,
    value: string
  ): Promise<IServerResponse<IFindUserResponse>> => {
    const { data } = await api.get<IServerResponse<IFindUserResponse>>(
      `/users/find/${field}/${value}`
    );
    return data;
  },
};

export { UserServices };
