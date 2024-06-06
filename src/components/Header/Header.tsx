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
        'bg-red-600 fixed transition-all w-full flex items-center justify-between p-2 h-auto max-[300px]:flex-col max-[300px]:gap-2',
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
