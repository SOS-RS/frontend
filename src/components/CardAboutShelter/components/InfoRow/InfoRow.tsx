import React, { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { IInfoRowProps } from './types';

const InfoRow = React.forwardRef<HTMLDivElement, IInfoRowProps>(
  (props, ref) => {
    const { icon, label, value, className = '', children, ...rest } = props;
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
        className={cn(
          'flex items-start gap-2 font-medium w-full',
          'md:flex',
          className
        )}
        {...rest}
      >
        {React.cloneElement(icon as any, {
          className: 'min-w-5 min-h-5 w-5 h-5 stroke-muted-foreground',
        })}
        <div className={cn('flex flex-col gap-2 items-start', 'sm:flex-row')}>
          <span className={cn('font-normal', value ? 'text-nowrap' : '')}>
            {label}
          </span>
          <span className="md:flex">{ValueComp}</span>
          {children}
        </div>
      </div>
    );
  }
);

export { InfoRow };
