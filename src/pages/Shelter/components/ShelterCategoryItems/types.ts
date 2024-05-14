import { SupplyPriority } from '@/service/supply/types';

export interface ITagItem {
  label: string;
  value: string;
  quantity? : number | null;
}

export interface IShelterCategoryItemsProps {
  priority?: SupplyPriority;
  tags: ITagItem[];
  selectedTags?: ITagItem[];
  onSelectTag?: (v: ITagItem) => void;
}
