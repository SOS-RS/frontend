import { IUseSheltersData } from '@/hooks/useShelters/types';

export interface IShelterAvailabilityProps {
  availability: string;
  className: string;
}

export interface IShelterListItemProps {
  data: IUseSheltersData;
  onClick?: () => void;
}
