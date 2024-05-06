import { IShelter } from '@/service/shelter/types';
import { ISupply } from '@/service/supply/types';

export type IUseSheltersData = IShelter & { supplies: ISupply[] };
