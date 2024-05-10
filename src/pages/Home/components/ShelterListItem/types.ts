import { IUseSheltersData } from '@/hooks/useShelters/types';

export interface IShelterAvailabilityProps {
  availability: string;
  className: string;
}

export type ShelterTagType =
  | 'NeedVolunteers'
  | 'NeedDonations'
  | 'RemainingSupplies';

export type ShelterTagInfo<T = any> = {
  [key in ShelterTagType]: T;
};

export interface IShelterListItemProps {
  data: IUseSheltersData;
  onClick?: () => void;
}
