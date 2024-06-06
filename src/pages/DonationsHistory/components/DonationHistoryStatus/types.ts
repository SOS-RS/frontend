import { DonateOrderStatus } from '@/service/donationOrder/types';
import React from 'react';

export interface IDonationHistoryStatus
  extends React.ComponentPropsWithoutRef<'div'> {
  status: DonateOrderStatus;
  chipProps?: React.ComponentPropsWithoutRef<'div'>;
}
