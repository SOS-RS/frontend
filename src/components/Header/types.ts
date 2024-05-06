export interface IHeader extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}
