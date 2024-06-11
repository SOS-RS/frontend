import React from 'react';
import { IChipProps } from './types';
import { cva } from 'class-variance-authority';

const Chip = React.forwardRef<HTMLDivElement, IChipProps>((props, ref) => {
  const { label, className, variant = 'info', ...rest } = props;

  const variants = cva(
    'px-4 py-1.5 font-medium text-sm md:text-md rounded-2xl dark:text-black',
    {
      variants: {
        variant: {
          warn: 'bg-light-yellow',
          success: 'bg-light-green',
          danger: 'bg-light-red',
          alert: 'bg-light-orange',
          info: 'bg-light-blue',
          moreInfo: 'bg-gray-200 text-black-600',
        },
      },
      defaultVariants: {
        variant: 'info',
      },
    }
  );

	return (
		<span
      tabIndex={0}
      ref={ref}
      {...rest}
      className={variants({ className, variant })}
    >
			{label}
		</span>
	);
});

export { Chip };
