export type ChipVariant = 'info' | 'success' | 'warn' | 'danger';

export interface IChipProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  variant?: ChipVariant;
}
