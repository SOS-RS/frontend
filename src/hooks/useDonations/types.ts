import { DonateOrderStatus } from '@/service/donationOrder/types';

export interface IUseDonationsData {
  page: number;
  perPage: number;
  count: number;
  results: IDonationsData[];
}

export interface IDonationOrderSupplies {
  quantity: number;
  supply: {
    measure: string;
    name: string;
  };
}

export interface IDonationsData {
  id: string;
  userId: string;
  status: DonateOrderStatus;
  shelter: {
    id: string;
    name: string;
  };
  donationOrderSupplies: IDonationOrderSupplies[];
  createdAt: string;
  updatedAt: string;
}
