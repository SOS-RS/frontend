import { forwardRef } from 'react';

import { SuppliesApiSearchProps } from './types';
import React from 'react';
import { useSupplies } from '@/hooks';
import { ApiSearch } from '../ApiSearch';
import { ISupply } from '@/service/supply/types';

const SuppliesApiSearch = forwardRef<
  React.ElementRef<'input'>,
  SuppliesApiSearchProps
>((props, ref) => {
  const { data: supplies } = useSupplies();
  const { setSelectedSupply, ...rest } = props;

  return (
    <ApiSearch<ISupply>
      data={supplies}
      setSelectedItem={(item) => {
        if (item.id) {
          const supply = supplies.find((s) => s.id === item.id);

          return setSelectedSupply(supply as ISupply);
        }

        setSelectedSupply({
          name: item.name,
        } as ISupply);
      }}
      ref={ref}
      {...rest}
    />
  );
});

export { SuppliesApiSearch };
