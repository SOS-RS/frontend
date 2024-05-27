export interface IUseDashboardOptions {
  cache?: boolean;
}

export interface ISupplieShelter {
  id: string;
  name: string;
}
export interface ISuppliesCategories {
  categoryId: string;
  categoryName: string;
  priority100: number;
  priority10: number;
  priority1: number;
}

export interface IUseDashboardData {
  allShelters?: number;
  allPeopleSheltered?: number;
  shelterAvailable?: number;
  shelterFull?: number;
  shelterWithoutInformation?: number;
  categoriesWithPriorities?: ISuppliesCategories[];
}
