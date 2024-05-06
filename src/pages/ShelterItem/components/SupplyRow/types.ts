import { SupplyPriority } from '@/services/supply/types';

export interface ISupplyRowProps {
  name: string;
  items: { name: string; priority: SupplyPriority }[];
}
