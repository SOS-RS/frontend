import { IGeolocation } from '@/hooks/useGeolocation/types';
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
  geolocation?: IGeolocation;
  cities: string[];
}

export interface IFilterFormikProps {
  search: string;
  priority: ISelectField<SupplyPriority> | null;
  supplyCategories: ISelectField[];
  supplies: ISelectField[];
  shelterStatus: ISelectField<ShelterAvailabilityStatus>[];
  geolocation?: IGeolocation;
  cities: string[];
}

export interface IFilterProps {
  onSubmit: (values: IFilterFormProps) => void;
  data: IFilterFormProps;
  open: boolean;
  onClose: () => void;
}
