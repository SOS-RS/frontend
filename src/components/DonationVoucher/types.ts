import { IDonationsData } from '@/hooks/useDonations/types';

export interface IDonationVoucher
  extends React.ComponentPropsWithoutRef<'div'> {
  data: IDonationsData;
}
