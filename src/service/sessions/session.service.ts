import { ISession } from '../../contexts/SessionContext/types';
import { IServerResponse } from '../../types';
import { api } from '@/api';
import { IAuthRequest } from './types';

const SessionServices = {
  auth: async (payload: IAuthRequest): Promise<ISession> => {
    const { data } = await api.post<IServerResponse<ISession>>(
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
