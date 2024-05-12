import { IChipProps } from '@/components/Chip/types';

export interface IShelterSupplyCategoryRowProps
  extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  description?: string;
  tags: IChipProps[];
}
