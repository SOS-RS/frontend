export interface ISelectComponentProps
  extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  value: string;
  onSelectChange?: (v: string) => void;
  options: { label: string; value: string }[];
}
