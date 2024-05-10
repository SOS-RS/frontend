export interface ApiSearchProps<T>
  extends React.ComponentPropsWithoutRef<'input'> {
  containerClassName?: string;
  labelClassName?: string;
  label: string;
  error?: boolean;
  setSelectedItem: (name: ISearchableObject) => void;
  helperText?: string;
  data: T[];
  throttle: number;
}

export interface ISearchableObject {
  name: string;
  id?: string;
}
