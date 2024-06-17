import React, { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { IInfoRowProps } from './types';

const InfoRow = React.forwardRef<HTMLDivElement, IInfoRowProps>(
  (props, ref) => {
    const {
      icon,
      label,
      value,
      clipboardButton = false,
      className = '',
      ...rest
    } = props;
    const isLink = value?.startsWith('http');
    const ValueComp = !value ? (
      <Fragment />
    ) : isLink ? (
      <a
        href={value}
        className="cursor-pointer break-all text-blue-500 hover:underline"
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
          'flex w-full items-start gap-2 font-medium',
          'md:flex',
          className,
        )}
        {...rest}
      >
        {React.cloneElement(icon as any, {
          className: 'min-w-5 min-h-5 w-5 h-5 stroke-muted-foreground',
        })}
        <div className={cn('flex flex-col items-start gap-2', 'sm:flex-row')}>
          <span className={cn('font-normal', value ? 'text-nowrap' : '')}>
            {label}
          </span>
          <span className="md:flex">
            {ValueComp}
            {clipboardButton && value && (
              <div
                className="mx-2 text-blue-600 hover:cursor-pointer active:text-blue-800"
                onClick={() => navigator.clipboard.writeText(value)}
              >
                copiar
              </div>
            )}
          </span>
        </div>
      </div>
    );
  },
);

export { InfoRow };
