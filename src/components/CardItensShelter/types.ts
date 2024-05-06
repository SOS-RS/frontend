import { IUseShelterData } from '@/hooks/useShelter/types';
import { SupplyPriority } from '@/services/supply/types';

export interface ICardItensShelter {
  shelter: IUseShelterData;
  priority: SupplyPriority;
}
