export interface ApiSearchProps<T>
  extends React.ComponentPropsWithoutRef<'input'> {
  containerClassName?: string;
  labelClassName?: string;
  label: string;
  error?: boolean;
  setSelectedItem: (name: ISearchableObject) => void;
  helperText?: string;
  data: T[];
  loading: boolean;
}

export interface ISearchableObject {
  name: string;
  id?: string;
}
