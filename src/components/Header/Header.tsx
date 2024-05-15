import React from 'react';

import { IHeader } from './types';
import { cn } from '@/lib/utils';

const Header = React.forwardRef<HTMLDivElement, IHeader>((props, ref) => {
  const {
    endAdornment,
    startAdornment,
    title,
    className,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cn([
        'bg-red-600 text-white',
        'flex justify-between items-center gap-2',
        'fixed top-0 z-[100]',
        'p-3 h-[56px] w-full'
      ],
        className
      )}
      {...rest}
    >
      <div className="flex gap-1 items-center">
        {startAdornment}
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <div className="flex items-center">
        <div className="cursor-pointer ">{endAdornment}</div>
      </div>
    </div>
  );
});

export { Header };
