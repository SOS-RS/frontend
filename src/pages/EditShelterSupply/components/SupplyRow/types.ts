import { SupplyPriority } from '@/service/supply/types';

export interface ISupplyRowItemProps {
  id: string;
  name: string;
  quantity?: number | null;
  priority?: SupplyPriority;
}

export interface ISupplyRowProps {
  name: string;
  onClick?: (item: ISupplyRowItemProps) => void;
  items: ISupplyRowItemProps[];
}
