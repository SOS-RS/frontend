import { ShelterTagType } from '@/pages/Home/components/ShelterListItem/types';

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
  createdAt: string;
  updatedAt?: string | null;
  shelterSupplies: IUseSheltersDataSupplyData[];
}

export interface IUseSheltersDataSupplyData {
  supply: {
    name: string;
    supplyCategory: { name: string };
  };
  priority: number;
  tags: ShelterTagType[];
<<<<<<< HEAD
  quantity?: number | null;
=======
>>>>>>> 3d3f437 (merge: develop -> master (#91))
}

export interface IUseShelterOptions {
  cache?: boolean;
}
