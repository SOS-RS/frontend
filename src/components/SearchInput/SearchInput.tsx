import React from 'react';
import { Search } from 'lucide-react';

import { Input } from '../ui/input';
import { ISearchInputProps } from './types';
import { cn } from '@/lib/utils';

const SearchInput = React.forwardRef<HTMLDivElement, ISearchInputProps>(
  (props, ref) => {
<<<<<<< HEAD
    const {
      value,
      onChange,
      className,
      placeholder = 'Buscar por abrigo ou endereço',
      ...rest
    } = props;
=======
    const { value, onChange, className, ...rest } = props;
>>>>>>> 3d3f437 (merge: develop -> master (#91))

    return (
      <div ref={ref} className={cn(className, 'relative')} {...rest}>
        <Input
          value={value}
<<<<<<< HEAD
          placeholder={placeholder}
=======
          placeholder="Buscar por abrigo ou endereço"
>>>>>>> 3d3f437 (merge: develop -> master (#91))
          className="h-12 text-md font-medium text-zinc-600 pl-10 pr-4"
          onChange={onChange}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search name="search" size="20" className="stroke-zinc-300" />
        </div>
      </div>
    );
  }
);

export { SearchInput };
