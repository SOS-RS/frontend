import { SupplyPriority } from '@/service/supply/types';

export interface IShelterCategoryItemsProps {
  priority?: SupplyPriority;
  supplies: {
    name: string;
    quantity?: number | null;
  }[];
}
