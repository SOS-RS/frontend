import React from 'react';

import { IAboutCardInfoProps } from './types';
import { cn } from '@/lib/utils';

const AboutCardInfo = React.forwardRef<HTMLDivElement, IAboutCardInfoProps>(
  (props, ref) => {
    const {
      bottomLabel,
      centerLabel,
      icon,
      topLabel,
      className = '',
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-4 p-4 bg-[#E8F0F8] border-border rounded-xl',
          className
        )}
        {...rest}
      >
        <div className="pt-1">
          {React.cloneElement(icon as any, {
            stroke: '#677183',
            className: 'w-4 h-4 md:w-6 md:h-6',
          })}
        </div>
        <div className="flex-1 flex justify-evenly flex-col gap-1 md:[&_*]:text-md">
          <span className="font-normal md:font-medium">{topLabel}</span>
          <b className="text-2xl md:text-4xl">{centerLabel}</b>
          <span className="font-normal md:font-medium">{bottomLabel}</span>
        </div>
      </div>
    );
  }
);

export { AboutCardInfo };
