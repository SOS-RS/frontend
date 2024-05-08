import { IUseShelterData } from '@/hooks/useShelter/types';

export interface IShelterListViewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  count: number;
  data: IUseShelterData[];
  loading?: boolean;
  searchValue?: string;
  hasMoreItems?: boolean;
  onSearchValueChange?: (v: string) => void;
  onFetchMoreData?: () => void;
  onSelectShelter?: (shelter: IUseShelterData) => void;
}
