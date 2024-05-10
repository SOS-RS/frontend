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
  const { data: supplies, loading } = useSupplies();

  return (
    <ApiSearch<ISupply>
      data={supplies}
      loading={loading}
      setSelectedItem={(item) => {
        if (item.id) {
          const supply = supplies.find((s) => s.id === item.id);

          return props.setSelectedSupply(supply as ISupply);
        }

        return props.setSelectedSupply(item as ISupply);
      }}
      ref={ref}
      {...props}
    />
  );
});

export { SuppliesApiSearch };
