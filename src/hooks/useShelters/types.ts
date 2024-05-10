export interface IUseSheltersData {
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
  createdAt: string;
  updatedAt?: string | null;
  shelterSupplies: IUseSheltersDataSupplyData[];
}

export interface IUseSheltersDataSupplyData {
  supply: { name: string, supplyCategory: { name: string}};
  priority: number;
  quantity?: number | null;
}

export interface IUseShelterSearchParams {
  priority: number | undefined;
  supplies: string[] | undefined;
  supplyCategories: number[] | undefined;
  search: string | undefined;
  filterAvailableShelter: boolean;
  filterUnavailableShelter: boolean;
  waitingShelterAvailability: boolean;
}