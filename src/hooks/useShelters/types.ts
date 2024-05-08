export interface IShelterData {
  id: string;
  name: string;
  pix: null;
  address: string;
  capacity: null;
  contact: string;
  petFriendly: null;
  shelteredPeople: null;
  prioritySum: number;
  latitude: null;
  longitude: null;
  createdAt: Date;
  updatedAt: Date;
  shelterSupplies: IShelterDataSupply[];
}

export interface IShelterDataSupply {
  supply: IShelterDataSupplyData;
}

export interface IShelterDataSupplyData {
  name: string;
  priority: number;
}
