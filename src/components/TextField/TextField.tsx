import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { TextFieldProps } from './types';

const TextField = forwardRef<React.ElementRef<'input'>, TextFieldProps>(
  (props, ref) => {
    const {
      label,
      name,
      containerClassName,
      labelClassName,
      className,
      error,
      helperText,
      value = '',
      ...rest
    } = props;

    return (
      <div className={cn('flex flex-col gap-2 w-full', containerClassName)}>
        <label
          htmlFor={name}
          className={cn('text-muted-foreground', labelClassName)}
        >
          {label}
        </label>
        <Input
          ref={ref}
          name={name}
          className={cn(error ? 'border-[1px] border-red-600' : '', className)}
          value={value}
          {...rest}
        />
        {helperText && (
          <p className={cn(error ? 'text-red-600 text-sm' : '', className)}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export { TextField };
