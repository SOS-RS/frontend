import { IUseSheltersData } from '@/hooks/useShelters/types';

export interface IShelterListViewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  count: number;
  data: IUseSheltersData[];
  loading?: boolean;
  searchValue?: string;
  hasMoreItems?: boolean;
  onSearchValueChange?: (v: string) => void;
  onFetchMoreData?: () => void;
  onSelectShelter?: (shelter: IUseSheltersData) => void;
}
