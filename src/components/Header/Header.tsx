import React from 'react';
import { Link } from 'react-router-dom';

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
        'bg-red-600 flex h-[56px] justify-between items-center text-white p-3 gap-2 w-full z-[100]',
        className
      )}
      {...rest}
    >
      <div className="flex gap-1 items-center">
        {startAdornment}
        <Link className="font-medium text-white" to="/">
          {title}
        </Link>
      </div>
      <div className="flex items-center gap-1">{endAdornment}</div>
    </header>
  );
});

export { Header };
