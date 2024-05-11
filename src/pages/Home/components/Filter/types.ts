import { SupplyPriority } from '@/service/supply/types';

export type ShelterAvailabilityStatus = 'available' | 'unavailable' | 'waiting';

export interface ISelectField<T = string> {
  label: string;
  value: T;
}

export interface IFilterFormProps {
  search: string;
  priority: SupplyPriority | null;
  supplyCategoryIds: string[];
  supplyIds: string[];
  shelterStatus: ShelterAvailabilityStatus[];
}

export interface IFilterFormikProps {
  search: string;
  priority: ISelectField<SupplyPriority> | null;
  supplyCategories: ISelectField[];
  supplies: ISelectField[];
  shelterStatus: ISelectField<ShelterAvailabilityStatus>[];
}

export interface IFilterProps {
  onSubmit: (values: IFilterFormProps) => void;
  data: IFilterFormProps;
  open: true;
  onClose: () => void;
}
