import { IUseSuppliesHistoryDataResults } from '@/hooks/useSuppliesHistory/types';

export interface ISuppliesHistoryGroupProps {
  title: string;
  items: IUseSuppliesHistoryDataResults[];
  className: string;
}
