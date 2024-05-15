import { SupplyPriority } from '@/service/supply/types';

export interface ITagItem {
  label: string;
  value: string;
<<<<<<< HEAD
<<<<<<< HEAD
  quantity? : number | null;
=======
>>>>>>> 3d3f437 (merge: develop -> master (#91))
=======
  quantity?: number | null;
>>>>>>> 0d9053f (Release/0.0.3 (#187))
}

export interface IShelterCategoryItemsProps {
  priority?: SupplyPriority;
  tags: ITagItem[];
  selectedTags?: ITagItem[];
  onSelectTag?: (v: ITagItem) => void;
}
