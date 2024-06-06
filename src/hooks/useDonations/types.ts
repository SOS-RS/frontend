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
  user: {
    id: string;
    name: string;
    lastName: string;
    phone: string;
  };
  status: DonateOrderStatus;
  shelter: {
    id: string;
    name: string;
    address: string;
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
