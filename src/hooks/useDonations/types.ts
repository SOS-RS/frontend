import { IDonations } from '@/pages/DonationsHistory/types';
import { exitCode } from 'process';

// export interface IUseDonationsData {
//   shelterId: string;
//   shelterName: string;
//   donated: IDonations;
//   received: IDonations;
// }

// const IUseDonationsData = {
//   id: string;
//   userId: string;
//   shelterId: string;
//   status: enum([
//     DonationOrderStatus.Canceled,
//     DonationOrderStatus.Complete,
//     DonationOrderStatus.Pending,
//   ]),
//   supplies:
//   createdAt: string;
//   updatedAt: string || null;
// }

export interface IUseDonationsData {
  page: number;
  perPage: number;
  count: number;
  results: IDonationsData[];
}

export interface IDonationsData {
  id: string;
  userId: string;
  status: string;
  shelter: {
    id: string;
    name: string;
  };
  donationOrderSupplies: {
    quantity: number;
    supply: {
      measure: string;
      name: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

// interface IDonationOrderSupplies {}
// const CreateDonationOrderScheme = {
//   id: true,
//   status: true,
//   createdAt: true,
//   updatedAt: true,
// }).extend({
//   supplies: array(
//     object({
//       id: string;
//       quantity: number().min(1),
//     }),
//   ),
// });
