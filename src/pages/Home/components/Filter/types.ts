import { SupplyPriority } from '@/service/supply/types';

export type ShelterAvailabilityStatus = 'available' | 'unavailable' | 'waiting';

export interface IFilterFormProps {
  search: string;
  priority: SupplyPriority | null;
  supplyCategoryIds: string[];
  supplyIds: string[];
  shelterStatus: ShelterAvailabilityStatus[];
}

export interface IFilterProps {
  onSubmit: (values: IFilterFormProps) => void;
  data: IFilterFormProps;
  open: true;
  onClose: () => void;
}
