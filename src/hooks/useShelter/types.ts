export enum ShelterCategory {
  Shelter = 'Shelter',
  DistributionCenter = 'DistributionCenter',
}

export enum SupplyMeasure {
  Unit = 'Unit',
  Kg = 'Kg',
  Litters = 'Litters',
  Box = 'Box',
  Piece = 'Piece',
}

export interface IUseShelterData {
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
  shelterSupplies: IUseShelterDataSupply[];
  category: ShelterCategory;
  actived: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface IUseShelterDataSupply {
  priority: number;
  quantity?: number | null;
  supply: IUseShelterDataSupplyData;
}

export interface IUseShelterDataSupplyData {
  id: string;
  name: string;
  measure: SupplyMeasure;
  supplyCategory: IUseShelterDataSupplyCategory;
  createdAt: string;
  updatedAt?: string | null;
}

export interface IUseShelterDataSupplyCategory {
  id: string;
  name: string;
}
