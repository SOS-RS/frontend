import { IShelter } from '@/services/shelter/types';
import { ISupply } from '@/services/supply/types';

export type IUseSheltersData = IShelter & { supplies: ISupply[] };
