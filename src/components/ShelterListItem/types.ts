import { IShelterData } from '@/hooks/useShelters/types';

export interface IShelterAvailabilityProps {
  availability: string;
  className: string;
}

export interface IShelterListItemProps {
  data: IShelterData;
  onClick?: () => void;
}
