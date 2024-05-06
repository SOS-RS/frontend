export interface TextFieldProps
  extends React.ComponentPropsWithoutRef<'input'> {
  containerClassName?: string;
  labelClassName?: string;
  label: string;
  error?: boolean;
  helperText?: string;
}
