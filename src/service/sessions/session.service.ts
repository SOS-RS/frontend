import { IServerResponse } from '../../types';
import { api } from '@/api';
import { IAuthRequest, IAuthResponse, ISession } from './types';

const SessionServices = {
  auth: async (payload: IAuthRequest): Promise<IAuthResponse> => {
    const { data } = await api.post<IServerResponse<IAuthResponse>>(
      '/sessions',
      payload
    );
    return data.data;
  },
  show: async (): Promise<ISession> => {
    const { data } = await api.get<IServerResponse<ISession>>('/sessions');
    return data.data;
  },
  delete: async (): Promise<ISession> => {
    const { data } = await api.delete<IServerResponse<ISession>>('/sessions');
    return data.data;
  },
};

export { SessionServices };
