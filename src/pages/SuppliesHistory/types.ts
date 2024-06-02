import { IUseSuppliesHistoryDataResults } from "@/hooks/useSuppliesHistory/types";


export type PriorityLabel =
| 'Precisa urgentemente'
| 'Precisa'
| 'Disponível para doação'
| 'Não preciso';

export interface GroupedHistory {
    added: IUseSuppliesHistoryDataResults[];
    edited: IUseSuppliesHistoryDataResults[];
    excluded: IUseSuppliesHistoryDataResults[];
    className: string;
  }