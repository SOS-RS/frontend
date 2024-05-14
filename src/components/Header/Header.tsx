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
    <header
      ref={ref}
      className={cn(
        'bg-red-600 transition-all w-full flex items-center justify-between p-2 h-auto max-[300px]:flex-col max-[300px]:gap-2',
        className
      )}
      {...rest}
    >
      <div className="flex gap-1 items-center">
        {startAdornment}
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <div className="flex w-auto items-center justify-between">
        <div className="cursor-pointer">{endAdornment}</div>
      </div>
    </header>
  );
});

export { Header };
