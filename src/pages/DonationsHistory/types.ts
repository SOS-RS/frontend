import {
  IDonationOrderSupplies,
  IDonationsData,
} from '@/hooks/useDonations/types';
import { DonateOrderStatus } from '@/service/donationOrder/types';

export type IDonations = IDonationsData[];

export interface IDonationsPerDay {
  [date: string]: IDonations;
}

export interface IDonationsInGivenDay {
  donations: IDonations;
}

export enum ViewOptions {
  Donated = 'donated',
  Received = 'received',
}
export interface IDonationsPerDayProps {
  donations?: IDonations;
  viewOption: ViewOptions;
}

export interface IDonation {
  donationId: string;
  donatorName: string;
  donatorId: string;
  shelterId: string;
  shelterName: string;
  status: DonateOrderStatus;
  createdAt: string;
  updatedAt: string;
  items: IDonationOrderSupplies[];
}

export interface IDonationProps {
  viewOption: ViewOptions;
  donation: IDonation;
}
