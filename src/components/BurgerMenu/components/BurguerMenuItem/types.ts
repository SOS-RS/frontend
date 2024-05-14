export interface IBurguerMenuItemProps
  extends React.ComponentPropsWithoutRef<'a'> {
  label: string;
  icon?: string;
  link?: string;
  onClick?: () => void;
}
