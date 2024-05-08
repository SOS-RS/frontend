export interface IShelter {
  id: string;
  name: string;
  pix?: string | null;
  address: string;
  petFriendly?: boolean | null;
  shelteredPeople?: number | null;
  capacity?: number | null;
  contact?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ICreateShelter
  extends Omit<IShelter, 'id' | 'createdAt' | 'updatedAt'> {}

export type IUpdateShelter = Partial<
  Pick<IShelter, 'shelteredPeople' | 'petFriendly'>
>;

export interface IFullUpdateShelter
  extends Omit<IShelter, 'id' | 'createdAt' | 'updatedAt'> {}
