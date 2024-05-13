import React from 'react';

import { IHeader } from './types';
import { cn } from '@/lib/utils';

const Header = React.forwardRef<HTMLDivElement, IHeader>((props, ref) => {
  const {
    endAdornment,
    startAdornment,
    title,
    handleStatusHamburguer,
    statusHamburguer,
    className = '',
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cn(
        'bg-red-600 flex h-[56px] justify-between items-center text-white p-3 gap-2 w-full',
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

      }

      <div className='
            absolute top-2 right-4
            w-full max-w-10
            h-full max-h-10
            hidden
            max-sm:grid
            place-items-center
            p-1
            cursor-pointer
            z-0
            max-sm:z-20
            ' onClick={handleStatusHamburguer}>
        {statusHamburguer ? <span className='w-full h-1 rounded transition-all bg-neutral-100 rotate-45 translate-y-2 scale-x-105'></span> : <span className='w-full h-1 rounded bg-neutral-100 transition-all'></span>}
        {statusHamburguer ? <span className='hidden transition-all'></span> : <span className='w-full h-1 rounded bg-neutral-100 scale-90 transition-all'></span>}
        {statusHamburguer ? <span className='w-full h-1 rounded transition-all bg-neutral-100 -rotate-45 -translate-y-2 scale-110'></span> : <span className='w-full h-1 rounded bg-neutral-100 transition-all'></span>}
    </div>
    </header>
  );
});

export { Header };
