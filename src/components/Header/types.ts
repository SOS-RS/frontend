export interface IHeader extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  showButtonRegisterShelter?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}
