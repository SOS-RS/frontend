import { SupplyMeasure } from '@/hooks/useShelter/types';
import { SupplyPriority } from '@/service/supply/types';

export interface ShelterCategoryListItemProps {
  id: string;
  name: string;
  quantity?: number | null;
  priority: SupplyPriority;
  measure: SupplyMeasure;
}

export interface ShelterCategoryListProps {
  name: string;
  onDonate: (item: ShelterCategoryListItemProps) => void;
  items: ShelterCategoryListItemProps[];
}
