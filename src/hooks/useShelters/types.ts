import { ShelterTagType } from '@/pages/Home/components/ShelterListItem/types';
import { ShelterCategory, SupplyMeasure } from '../useShelter/types';

export interface IUseSheltersData {
  id: string;
  name: string;
  street?: string;
  neighbourhood?: string;
  city?: string;
  streetNumber?: string | null;
  zipCode?: string;
  address: string;
  pix?: string | null;
  shelteredPeople?: number | null;
  capacity?: number | null;
  contact?: string | null;
  petFriendly?: boolean | null;
  prioritySum: number;
  verified: boolean;
  latitude?: string | null;
  longitude?: string | null;
  category: ShelterCategory;
  actived: boolean;
  createdAt: string;
  updatedAt?: string | null;
  shelterSupplies: IUseSheltersDataSupplyData[];
}

export interface IUseSheltersDataSupplyData {
  supply: {
    name: string;
    measure: SupplyMeasure;
    supplyCategory: { name: string };
  };
  priority: number;
  tags: ShelterTagType[];
  quantity?: number | null;
}

export interface IUseShelterOptions {
  cache?: boolean;
}
