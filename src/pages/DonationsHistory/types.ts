import { IDonationsData } from '@/hooks/useDonations/types';

export type IDonations = IDonationsData[];
// export type IDonations = IDonationProps[];
// export interface IDonationProps {
//   // shelterName?: string;
//   donationId: string;
//   shelterId: string;
//   shelterName: string;
//   donatorName: string;
//   donatorId: string;
//   status: 'Pendente' | 'Entregue' | 'Cancelado';
//   createdAt: string;
//   updatedAt?: string | null;
//   items: string[]; //Check how it was structured in cart
// }

export interface IDonationsPerDay {
  [date: string]: IDonations;
}

export interface IDonationsInGivenDay {
  donations: IDonations;
}

// export type ViewOption = 'donated' | 'received';
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
