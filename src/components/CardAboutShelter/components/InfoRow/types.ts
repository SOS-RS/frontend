export interface IInfoRowProps extends React.ComponentPropsWithoutRef<'div'> {
  label: React.ReactNode;
  value?: string;
  icon: React.ReactNode;
  iconTwo: React.ReactNode;
  clipboardButton?: boolean;
}
