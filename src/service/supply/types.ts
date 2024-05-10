export enum SupplyPriority {
  NotNeeded = 0,
  Remaining = 1,
  Needing = 10,
  Urgent = 100,
}

export interface ISupply {
  id: string;
  supplyCategoryId: string;
  name: string;
  createdAt: string;
  updatedAt?: string | null;
  supplyCategory?: {
    name: string;
  };
}

export type ICreateSupply = Pick<ISupply, 'name' | 'supplyCategoryId'>;
