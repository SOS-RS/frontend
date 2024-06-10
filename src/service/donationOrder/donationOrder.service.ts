import { api } from '@/api';
import {
  DonateOrderStatus,
  ICreateDonateResponse,
  ICreateDonationOrderProps,
} from './types';
import { IServerResponse } from '@/types';
import { IPaginatedResponse } from '@/hooks/usePaginatedQuery/types';
import { IDonationsData } from '@/hooks/useDonations/types';

const DonationOrderServices = {
  store: async (payload: ICreateDonationOrderProps) => {
    const { data } = await api.post<IServerResponse<ICreateDonateResponse>>(
      '/donation/order',
      payload
    );
    return data;
  },
  getAll: async (shelterId?: string) => {
    const { data } = await api.get<
      IServerResponse<IPaginatedResponse<IDonationsData>>
    >('/donation/order', {
      params: { shelterId },
    });
    return data;
  },
  find: async (id: string) => {
    const { data } = await api.get<IServerResponse<IDonationsData>>(
      `/donation/order/${id}`
    );
    return data;
  },
  update: async (id: string, payload: { status: DonateOrderStatus }) => {
    const { data } = await api.put<IServerResponse>(
      `/donation/order/${id}`,
      payload
    );
    return data;
  },
};

export { DonationOrderServices };
