export interface ISearchInputProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value: string;
  onChange?: (value: string) => void;
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'value' | 'onChange'
  >;
}
