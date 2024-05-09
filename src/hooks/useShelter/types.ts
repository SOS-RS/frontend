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
  verified: boolean;
  latitude?: string | null;
  longitude?: string | null;
  shelterSupplies: IUseShelterDataSupply[];
  createdAt: string;
  updatedAt?: string | null;
}

export interface IUseShelterDataSupply {
  priority: number;
  supply: IUseShelterDataSupplyData;
}

export interface IUseShelterDataSupplyData {
  id: string;
  name: string;
  supplyCategory: IUseShelterDataSupplyCategory;
  createdAt: string;
  updatedAt?: string | null;
}

export interface IUseShelterDataSupplyCategory {
  id: string;
  name: string;
}
