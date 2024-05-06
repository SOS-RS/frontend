export interface IShelter {
  id: string;
  name: string;
  pix?: string | null;
  address: string;
  petFriendly?: boolean | null;
  shelteredPeople?: number | null;
  capacity?: number | null;
  prioritySum: number;
  contact?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ICreateShelter
  extends Omit<IShelter, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateShelter
  extends Pick<IShelter, 'shelteredPeople' | 'capacity' | 'petFriendly'> {}

export interface IFullUpdateShelter
  extends Omit<IShelter, 'id' | 'createdAt' | 'updatedAt'> {}
