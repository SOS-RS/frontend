export interface IUseSuppliesData {
  id: string;
  name: string;
  supplyCategory: IUseSuppliesDataCategory;
  createdAt: Date;
  updatedAt: null;
}

export interface IUseSuppliesDataCategory {
  id: string;
  name: string;
}
