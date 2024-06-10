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
