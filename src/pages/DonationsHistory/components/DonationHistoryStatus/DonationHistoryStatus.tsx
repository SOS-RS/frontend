import React from 'react';
import { cva } from 'class-variance-authority';

import { IDonationHistoryStatus } from './types';
import { DonationStatusMap, cn } from '@/lib/utils';
import { DonateOrderStatus } from '@/service/donationOrder/types';

const DonationHistoryStatus = React.forwardRef<
  HTMLDivElement,
  IDonationHistoryStatus
>((props, ref) => {
  const { status, className = '', children, chipProps = {}, ...rest } = props;
  const { className: chipClassName, ...restChipProps } = chipProps;

  const variants = cva('px-2 py-1 font-medium text-xs rounded-2xl', {
    variants: {
      variant: {
        [DonateOrderStatus.Pending]: 'bg-light-yellow',
        [DonateOrderStatus.Canceled]: 'bg-gray-300',
        [DonateOrderStatus.Complete]: 'bg-light-green',
      },
    },
    defaultVariants: {
      variant: status,
    },
  });

  return (
    <div ref={ref} className={cn(className)} {...rest}>
      <div
        className={variants({ variant: status, className: chipClassName })}
        {...restChipProps}
      >
        {DonationStatusMap[status]}
      </div>
      {children}
    </div>
  );
});

export { DonationHistoryStatus };
