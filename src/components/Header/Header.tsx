import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleBackHome = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      navigate('/');
    },
    [navigate]
  );

  return (
    <div
      ref={ref}
      className={cn(
        'bg-red-600 flex h-[56px] justify-between items-center text-white p-3 gap-2 w-full z-[60]',
        className
      )}
      {...rest}
    >
      <div className="flex gap-1 items-center">
        {startAdornment}
        <a className="font-medium text-white" href="/" onClick={handleBackHome}>
          {title}
        </a>
      </div>
      <div className="flex items-center">
        <div className="cursor-pointer ">{endAdornment}</div>
      </div>
    </div>
  );
});

export { Header };
