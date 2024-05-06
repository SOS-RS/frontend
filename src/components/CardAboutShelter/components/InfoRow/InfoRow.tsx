import React, { Fragment } from 'react';

import { IInfoRowProps } from './types';
import { cn } from '@/lib/utils';

const InfoRow = React.forwardRef<HTMLDivElement, IInfoRowProps>(
  (props, ref) => {
    const { icon, label, value, className = '', ...rest } = props;
    const isLink = value?.startsWith('http');
    const ValueComp = !value ? (
      <Fragment />
    ) : isLink ? (
      <a
        className="text-blue-500 break-all cursor-pointer hover:underline"
        onClick={() => window.open(value, '_blank')}
      >
        {value}
      </a>
    ) : (
      <h1 className="font-semibold">{value}</h1>
    );

    return (
      <div
        ref={ref}
        className={cn('flex items-start gap-2 font-medium w-full', className)}
        {...rest}
      >
        {React.cloneElement(icon as any, {
          className: 'min-w-5 min-h-5 w-5 h-5',
        })}
        <h1 className={cn('font-normal', value ? 'text-nowrap' : '')}>
          {label}
        </h1>
        {ValueComp}
      </div>
    );
  }
);

export { InfoRow };
