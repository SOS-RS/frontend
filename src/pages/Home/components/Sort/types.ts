export enum SortBy {
  Name = 'name',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Priority = 'prioritySum',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface ISelectField<T = string> {
  label: string;
  value: T;
}

export interface ISortFormProps {
  orderBy: SortBy | null;
  order: SortOrder | null;
}

export interface ISortFormikProps {
  sortBy: ISelectField<SortBy> | null;
  sortOrder: ISelectField<SortOrder> | null;
}

export interface ISortProps {
  onSubmit: (value: ISortFormProps) => void;
  data: ISortFormProps;
  open: true;
  onClose: () => void;
}
