export interface IBurguerMenuItemProps
  extends React.ComponentPropsWithoutRef<'a'> {
  label: string;
  targetLink: string;
  icon?: React.ReactNode;
  link?: string;
  onClick?: () => void;
}
