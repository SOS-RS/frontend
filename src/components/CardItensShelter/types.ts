import { IUseShelterData } from '@/hooks/useShelter/types';
import { SupplyPriority } from '@/Services/supply/types';

export interface ICardItensShelter {
  shelter: IUseShelterData;
  priority: SupplyPriority;
}
