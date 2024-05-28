import { SupplyMeasure } from '@/hooks/useShelter/types';
import { SupplyPriority } from '@/service/supply/types';

export interface IDonationCartItem {
  id: string;
  name: string;
  quantity: number;
  priority: SupplyPriority;
  measure: SupplyMeasure;
}

export interface IDonationCartContext {
  items: IDonationCartItem[];
  addItem: (item: IDonationCartItem) => void;
  removeItem: (supplyId: string) => void;
  updateItem: (
    supplyId: string,
    payload: Partial<Omit<IDonationCartItem, 'id'>>
  ) => void;
  opened: boolean;
  toggleOpened: () => void;
}
