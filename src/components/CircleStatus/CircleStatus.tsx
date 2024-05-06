import React from 'react';

import { ICircleStatus } from './types';
import { cn } from '@/lib/utils';

const CircleStatus = React.forwardRef<HTMLDivElement, ICircleStatus>(
  (props, ref) => {
    const { size = 4, className, ...rest } = props;

    return (
      <div
        ref={ref}
        className={cn(
          `w-${size} h-${size} bg-orange-500 rounded-md`,
          className
        )}
        {...rest}
      >
        <span></span>
      </div>
    );
  }
);

export { CircleStatus };
