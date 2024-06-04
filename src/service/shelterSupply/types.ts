import { SupplyMeasure } from '@/hooks/useShelter/types';
import { SupplyPriority } from '../supply/types';

export interface IShelterSupply {
  id: string;
  shelterId: string;
  supplyId: string;
  quantity?: number | null;
  priority: SupplyPriority;
  createdAt: string;
  updatedAt?: string | null;
}

export type IUpdateShelterSupply = Partial<
  Pick<IShelterSupply, 'priority' | 'shelterId' | 'supplyId' | 'quantity'>
>;

export type ICreateShelterSupply = Pick<
  IShelterSupply,
  'priority' | 'shelterId' | 'supplyId' | 'quantity'
>;

export interface IShelterSupplyData {
  priority: number;
  quantity: number;
  supply: IShelterSupplyDataSupply;
  createdAt: string;
  updatedAt?: string | null;
}

export interface IShelterSupplyDataSupply {
  id: string;
  name: string;
  measure: SupplyMeasure;
  supplyCategory: IShelterSupplyDataSupplyCategory;
  createdAt: string;
  updatedAt?: string | null;
}

export interface IShelterSupplyDataSupplyCategory {
  id: string;
  name: string;
}
