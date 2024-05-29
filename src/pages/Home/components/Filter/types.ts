export type ShelterAvailabilityStatus = 'available' | 'unavailable' | 'waiting';

export interface ISelectField<T = string> {
  label: string;
  value: T;
}

export interface IFilterFormProps {
  search: string;
  priorities: string[];
  supplyCategoryIds: string[];
  supplyIds: string[];
  shelterStatus: ShelterAvailabilityStatus[];
  cities: string[];
}

export interface IFilterFormikProps {
  search: string;
  priorities: ISelectField[];
  supplyCategories: ISelectField[];
  supplies: ISelectField[];
  shelterStatus: ISelectField<ShelterAvailabilityStatus>[];
  cities: string[];
}

export interface IFilterProps {
  onSubmit: (values: IFilterFormProps) => void;
  data: IFilterFormProps;
  open: boolean;
  onClose: () => void;
}
