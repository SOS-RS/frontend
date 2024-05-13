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
    <header
      ref={ref}
      className={cn(
        'bg-red-600 overflow-hidden flex min-h-[56px] justify-between items-center text-white p-3 gap-2 w-full',
        className
      )}
      {...rest}
    >
      <div className="flex w-full max-w-42 h-full">
        {startAdornment}
        <h3 className="font-medium
        w-auto
        h-full
        max-sm:truncate
        max-sm:text-wrap
      text-white flex
        items-center
        justify-start
        text-nowrap
        max-sm:text-sm
        ">{title}</h3>
      </div>
      {statusHamburguer ? <div className='transition-all ease-linear flex justify-between items-center w-auto
      max-sm:w-full
      max-sm:max-w-72
      max-sm:absolute
      max-sm:top-0 
      max-sm:right-0
      h-full
      rounded-tl-lg
    max-sm:bg-red-500
      max-sm:z-10
      '>

        <div className="flex 
        items-center 
        h-full
        w-full
        max-sm:grid
        max-sm:place-items-center
        max-sm:pt-5
        max-sm:pl-5
        ">
          <div className="cursor-pointer">{endAdornment}</div>
        </div>
      </div> :

        <div className="flex 
        items-center 
        h-full
        justify-end
        w-full
        max-sm:hidden
        max-sm:place-items-center
        max-sm:pt-5
        max-sm:pl-5
        ">
          <div className="cursor-pointer">{endAdornment}</div>
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
