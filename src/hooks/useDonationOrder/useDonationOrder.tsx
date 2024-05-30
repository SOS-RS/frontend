import { IDonateOrderItem } from '@/service/donationOrder/types';
import { useFetch } from '../useFetch';

const useDonationOrder = (donationOrderId: string) => {
  return useFetch<IDonateOrderItem>(`/donation/order/${donationOrderId}`);
};

export { useDonationOrder };
