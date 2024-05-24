export interface IUseSuppliesHistoryData {
  results: IUseSuppliesHistoryDataResults[];
}

export interface IUseSuppliesHistoryDataResults {
  id: string;
  supply: IUseSuppliesHistoryDataSupplyData;
  priority: number;
  quantity: number;
  predecessor: IUseSupplierHistoryDataProdecessor;
  createdAt: string;
}

export interface IUseSuppliesHistoryDataSupplyData {
  name: string;
}

export interface IUseSupplierHistoryDataProdecessor {
  priority: number;
  quantity?: number | null;
}
