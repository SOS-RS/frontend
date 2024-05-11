import { SupplyPriority } from '@/service/supply/types';

export interface ITagItem {
  label: string;
  value: string;
<<<<<<< HEAD
  quantity? : number | null;
=======
>>>>>>> 3d3f437 (merge: develop -> master (#91))
}

export interface IShelterCategoryItemsProps {
  priority?: SupplyPriority;
  tags: ITagItem[];
  selectedTags?: ITagItem[];
  onSelectTag?: (v: ITagItem) => void;
}
