import { ISupply } from '@/service/supply/types';

export interface SuppliesApiSearchProps
  extends React.ComponentPropsWithoutRef<'input'> {
  containerClassName?: string;
  labelClassName?: string;
  label: string;
  error?: boolean;
  setSelectedSupply: (supply: ISupply) => void;
  helperText?: string;
  throttle: number;
}
