export interface IShelter {
  id: string;
  name: string;
  pix?: string | null;
  street?: string;
  neighbourhood?: string;
  city?: string;
  streetNumber?: string | null;
  zipCode?: string;
  address?: string;
  petFriendly?: boolean | null;
  verified: boolean;
  shelteredPeople?: number | null;
  capacity?: number | null;
  contact?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ICreateShelter
  extends Omit<IShelter, 'id' | 'createdAt' | 'updatedAt'> {}

export type IUpdateShelter = Partial<ICreateShelter>;

export interface IFullUpdateShelter
  extends Omit<IShelter, 'id' | 'createdAt' | 'updatedAt'> {}
