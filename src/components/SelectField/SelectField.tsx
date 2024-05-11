import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ISelectComponentProps } from './types';
import { cn } from '@/lib/utils';

const SelectField = React.forwardRef<HTMLDivElement, ISelectComponentProps>(
  (props, ref) => {
    const {
      onSelectChange,
      options,
      value,
      label,
      className = '',
      ...rest
    } = props;

    return (
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        <label className="text-muted-foreground">{label}</label>
        <Select
          value={value}
          onValueChange={(v) =>
            onSelectChange ? onSelectChange(v) : undefined
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue className="text-muted-foreground" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, idx) => (
              <SelectItem key={idx} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

export { SelectField };
