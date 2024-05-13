import { SupplyPriority } from '@/service/supply/types';

export interface ISupplyItem {
  label: string;
  value: string;
  quantity? : number | null;
}

export interface IShelterCategoryItemsProps {
  priority?: SupplyPriority;
  tags: ISupplyItem[];
  selectedTags?: ISupplyItem[];
  onSelectTag?: (v: ISupplyItem) => void;
}
