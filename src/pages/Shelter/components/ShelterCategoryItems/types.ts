import { SupplyPriority } from '@/service/supply/types';

export interface IShelterCategoryItemsProps {
  priority: SupplyPriority;
  tags: string[];
}
