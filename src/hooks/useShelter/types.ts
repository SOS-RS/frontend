export interface IUseShelterData {
  id: string;
  name: string;
  address: string;
  pix?: string | null;
  shelteredPeople?: number | null;
  capacity?: number | null;
  contact?: string | null;
  petFriendly?: boolean | null;
  prioritySum: number;
  supplies: IUseShelterDataSupply[];
  createdAt: string;
  updatedAt?: string | null;
}

export interface IUseShelterDataSupply {
  id: string;
  name: string;
  priority: number;
  supplyCategory: IUseShelterDataSupplyCategory;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface IUseShelterDataSupplyCategory {
  id: string;
  name: string;
}
