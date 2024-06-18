import { IDonationsData } from '../useDonations/types';
import { useFetch } from '../useFetch';

const useDonationOrder = (donationOrderId: string) => {
  return useFetch<IDonationsData>(`/donation/order/${donationOrderId}`);
};

export { useDonationOrder };
