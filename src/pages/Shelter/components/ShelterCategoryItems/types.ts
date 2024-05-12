import { SupplyPriority } from '@/service/supply/types';

export interface ITagItem {
  label: string;
  value: string;
}

export interface IShelterCategoryItemsProps {
  priority?: SupplyPriority;
  tags: ITagItem[];
  selectedTags?: ITagItem[];
  onSelectTag?: (v: ITagItem) => void;
}
