import React, { Fragment, useState } from 'react';
import { cn } from '@/lib/utils';
import { IInfoRowProps } from './types';
import clsx from 'clsx';
import { toast } from '@/components/ui/use-toast';

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
        target="_blank"
        className="text-blue-500 break-all cursor-pointer hover:underline"
      >
        {value}
      </a>
    ) : (
      <h1 className="font-semibold">{value}</h1>
    );
    const [copied, setCopied] = useState(false);
    const copy = () => {
      if (value) navigator.clipboard.writeText(value);
      setCopied(true);
      toast({
        title: 'Chave copiada com sucesso!',
      });
    };
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
          <span className="md:flex">
            {ValueComp}
            {clipboardButton && value && (
              <div
                className={clsx(
                  'text-blue-600 mx-2 hover:cursor-pointer active:text-blue-800',
                  copied && 'text-green-600 active:text-green-800'
                )}
                onClick={copy}
              >
                {copied ? 'copiado' : 'copiar'}
              </div>
            )}
          </span>
        </div>
      </div>
    );
  }
);

export { InfoRow };
