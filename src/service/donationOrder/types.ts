import { SupplyMeasure } from '@/hooks/useShelter/types';

export interface IDonateItem {
  id: string;
  quantity: number;
}

export interface ICreateDonationOrderProps {
  shelterId: string;
  supplies: IDonateItem[];
}

export interface ICreateDonateResponse {
  id: string;
  userId: string;
  shelterId: string;
  status: string;
  createdAt: string;
  updatedAt?: string | null;
}

export enum DonateOrderStatus {
  Pending = 'Pending',
  Canceled = 'Canceled',
  Complete = 'Complete',
}

export interface IDonateOrderItem {
  id: string;
  status: DonateOrderStatus;
  userId: string;
  shelter: IDonateOrderShelter;
  donationOrderSupplies: IDonateOrderItemSupply[];
  createdAt: string;
  updatedAt?: string | null;
}

export interface IDonateOrderItemSupply {
  quantity: number;
  supply: IDonateOrderSupply;
}

export interface IDonateOrderShelter {
  id: string;
  name: string;
}

export interface IDonateOrderSupply {
  name: string;
  measure: SupplyMeasure;
}
