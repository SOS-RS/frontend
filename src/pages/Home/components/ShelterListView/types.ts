import { IUseSheltersData } from '@/hooks/useShelters/types';
<<<<<<< HEAD
import { IFilterFormProps } from '../Filter/types';
=======
>>>>>>> 3d3f437 (merge: develop -> master (#91))

export interface IShelterListViewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  count: number;
  data: IUseSheltersData[];
  loading?: boolean;
  searchValue?: string;
  hasMoreItems?: boolean;
  onOpenModal?: () => void;
  onClearSearch?: () => void;
  onSearchValueChange?: (v: string) => void;
<<<<<<< HEAD
  onCitiesChange?: (v: string[]) => void;
  onFetchMoreData?: () => void;
  onSelectShelter?: (shelter: IUseSheltersData) => void;
  filterData: IFilterFormProps;
=======
  onFetchMoreData?: () => void;
  onSelectShelter?: (shelter: IUseSheltersData) => void;
>>>>>>> 3d3f437 (merge: develop -> master (#91))
}
