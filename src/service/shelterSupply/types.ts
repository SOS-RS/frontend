import { SupplyPriority } from '../supply/types';

export interface IShelterSupply {
  id: string;
  shelterId: string;
  supplyId: string;
  priority: SupplyPriority;
  createdAt: string;
  updatedAt?: string | null;
}

export type IUpdateShelterSupply = Partial<
  Pick<IShelterSupply, 'priority' | 'shelterId' | 'supplyId'>
>;

export type ICreateShelterSupply = Pick<
  IShelterSupply,
  'priority' | 'shelterId' | 'supplyId'
>;
