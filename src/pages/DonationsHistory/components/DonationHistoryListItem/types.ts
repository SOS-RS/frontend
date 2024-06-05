import { IDonationsData } from '@/hooks/useDonations/types';

export interface IDonationHistoryListItem {
  data: IDonationsData;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}
