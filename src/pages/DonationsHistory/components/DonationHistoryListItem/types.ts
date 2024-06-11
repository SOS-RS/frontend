import { IDonationsData } from '@/hooks/useDonations/types';
import React from 'react';

export interface IDonationHistoryListItem
  extends React.ComponentPropsWithoutRef<'div'> {
  data: IDonationsData;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}
