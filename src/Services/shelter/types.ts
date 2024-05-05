export interface IShelter {
  id: string;
  pix: string;
  address: string;
  petFriendly?: boolean;
  shelteredPeople?: number;
  capacity?: number;
  contact: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ICreateShelter
  extends Omit<IShelter, "id" | "createdAt" | "updatedAt"> {}

export interface IUpdateShelter
  extends Pick<IShelter, "shelteredPeople" | "capacity" | "petFriendly"> {}

export interface IFullUpdateShelter
  extends Omit<IShelter, "id" | "createdAt" | "updatedAt"> {}
