export type ChipVariant = 'info' | 'success' | 'warn' | 'danger' | 'moreInfo';

export interface IChipProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  variant?: ChipVariant;
  quantity?: number;
}
