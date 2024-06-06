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
  carts: Record<string, IDonationCartItem[]>;
  opened: boolean;
  toggleOpened: () => void;
  addItem: (shelterId: string, item: IDonationCartItem) => void;
  removeItem: (shelterId: string, supplyId: string) => void;
  updateItem: (
    shelterId: string,
    supplyId: string,
    payload: Partial<Omit<IDonationCartItem, 'id'>>
  ) => void;
  clearCart: (shelterId: string) => void;
  updateCart: (shelterId: string, items: IDonationCartItem[]) => void;
}
