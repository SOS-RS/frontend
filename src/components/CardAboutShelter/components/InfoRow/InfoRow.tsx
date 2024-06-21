import React, { Fragment, useEffect, useState } from 'react';
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
        className="text-blue-500 break-all cursor-pointer hover:underline"
      >
        {value}
      </a>
    ) : (
      <h1 className="font-semibold">{value}</h1>
    );
    const [copied, setCopied] = useState(false);
    const copy = () => {
      try {
        navigator.clipboard.writeText(value as string);
        toast({ title: 'Chave copiada com sucesso!' });
        setCopied(true);
      } catch (error) {
        console.error(error);

        toast({
          variant: 'destructive',
          title:
            'Ocorreu um erro ao enviar os dados para a sua área de transferência. Por gentileza, copie manualmente.',
        });
      }
    };
    useEffect(() => {
      let timeout: NodeJS.Timeout;
      if (copied) {
        timeout = setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
      return () => {
        clearTimeout(timeout);
      };
    }, [copied]);
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
