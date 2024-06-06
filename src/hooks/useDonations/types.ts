import { DonateOrderStatus } from '@/service/donationOrder/types';
import { SupplyMeasure } from '../useShelter/types';

export interface IUseDonationsData {
  page: number;
  perPage: number;
  count: number;
  results: IDonationsData[];
}

export interface IDonationsData {
  id: string;
  userId: string;
  status: DonateOrderStatus;
  shelter: {
    id: string;
    name: string;
  };
  donationOrderSupplies: {
    quantity: number;
    supply: {
      measure: SupplyMeasure;
      name: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
}
