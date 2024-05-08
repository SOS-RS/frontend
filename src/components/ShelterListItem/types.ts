import { IUseShelterData } from '@/hooks/useShelter/types';

export interface IShelterAvailabilityProps {
  availability: string;
  className: string;
}

export interface IShelterListItemProps {
  data: IUseShelterData;
  onClick?: () => void;
}
