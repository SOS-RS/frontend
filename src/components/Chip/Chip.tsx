import React from 'react';
import { IChipProps } from './types';
import { cva } from 'class-variance-authority';

const Chip = React.forwardRef<HTMLDivElement, IChipProps>((props, ref) => {
  const { label, className, variant = 'info', ...rest } = props;

  const variants = cva('md:text-md rounded-2xl px-4 py-1.5 text-sm font-medium', {
    variants: {
      variant: {
        warn: 'bg-light-yellow',
        success: 'bg-light-green',
        danger: 'bg-light-red',
        alert: 'bg-light-orange',
        info: 'bg-light-blue',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  });

  return (
    <span tabIndex={0} ref={ref} {...rest} className={variants({ className, variant })}>
      {label}
    </span>
  );
});

export { Chip };
