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
        'z-[100] flex h-[56px] w-full items-center justify-between gap-2 bg-red-600 p-3 text-white',
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-1">
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
