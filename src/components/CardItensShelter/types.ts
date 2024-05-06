import { IUseShelterData } from '@/hooks/useShelter/types';
import { SupplyPriority } from '@/service/supply/types';

export interface ICardItensShelter {
  shelter: IUseShelterData;
  priority: SupplyPriority;
}
