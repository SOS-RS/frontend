import React from 'react';

import { IHeader } from './types';
import { cn } from '@/lib/utils';

const Header = React.forwardRef<HTMLDivElement, IHeader>((props, ref) => {
  const {
    endAdornment,
    startAdornment,
    title,
    showButtonRegisterShelter = true,
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
      <div className="flex items-center gap-x-3">
        {showButtonRegisterShelter && (
          <a
            href="/abrigo/cadastrar"
            className="bg-white hover:bg-rose-50 text-red-600 font-medium text-xs md:text-base py-2 px-1 md:py-2 md:px-4 rounded-full"
          >
            Cadastrar abrigo
          </a>
        )}
        <div className="flex items-center">
          <div className="cursor-pointer">{endAdornment}</div>
        </div>
    </div>
  );
});

export { Header };
