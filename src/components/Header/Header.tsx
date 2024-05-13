import React from 'react';

import { IHeader } from './types';
import { cn } from '@/lib/utils';

const Header = React.forwardRef<HTMLDivElement, IHeader>((props, ref) => {
  const {
    endAdornment,
    startAdornment,
    title,
    className = '',
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cn(
        'shadow-sm bg-white flex h-[56px] justify-between items-center text-black p-3 gap-2 w-full fixed z-10',
        className
      )}
      {...rest}
    >
      <div className="flex gap-1 items-center pl-2">
        {startAdornment}
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="flex items-center">
        <div className="cursor-pointer ">{endAdornment}</div>
      </div>
    </div>
  );
});

export { Header };
