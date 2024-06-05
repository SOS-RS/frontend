import { IDonationsData } from '@/hooks/useDonations/types';

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
  donations: IDonations;
  viewOption: ViewOptions;
}

export interface IDonationProps {
  viewOption: ViewOptions;
  donation: IDonationProps;
}
