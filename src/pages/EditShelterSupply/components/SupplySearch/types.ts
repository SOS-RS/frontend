import { IUseSuppliesData } from "@/hooks/useSupplies/types";

export interface ISupplySearchProps {
  supplyItems: IUseSuppliesData[];
  limit?: number;
  onSearch: (value: string) => void;
  onSelectItem: (item: IUseSuppliesData) => void;
  onAddNewItem: () => void;
}