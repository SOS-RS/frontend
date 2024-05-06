import { IUseShelterData } from '@/hooks/useShelters/types';

export interface IShelterAvailabilityProps {
  availability: string;
  className: string;
}

export interface IShelterListItemProps {
  data: IUseShelterData;
}
