import { IUseSheltersData } from '@/hooks/useShelters/types';

export interface IShelterListViewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  count: number;
  data: IUseSheltersData[];
  loading?: boolean;
  searchValue?: string;
  hasMoreItems?: boolean;
  onOpenFilterModal?: () => void;
  onOpenSortModal?: () => void;
  onClearSearch?: () => void;
  onSearchValueChange?: (v: string) => void;
  onFetchMoreData?: () => void;
  onSelectShelter?: (shelter: IUseSheltersData) => void;
}
