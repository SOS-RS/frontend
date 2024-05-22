export interface IUseDashboardOptions {
  cache?: boolean;
}

export interface ISupplieShelter {
  id: string;
  name: string;
}
export interface ISuppliesCategories {
  id: string;
  name: string;
  sheltersWithSupplies: ISupplieShelter[];
  sheltersRequesting: ISupplieShelter[];
}

export interface IUseDashboardData {
  allShelters?: number;
  allPeopleSheltered?: number;
  shelterAvailable?: number;
  shelterFull?: number;
  shelterWithoutInformation?: number;
  categories?: ISuppliesCategories[];
}
