import React from 'react';

import { IServicedFrontInfoProps } from './types';
import { cn } from '@/lib/utils';

const ServicedFrontInfo = React.forwardRef<
  HTMLDivElement,
  IServicedFrontInfoProps
>((props, ref) => {
  const { description, icon, title, className = '', ...rest } = props;

  return (
    <div ref={ref} {...rest} className={cn(className, 'flex gap-2')}>
      <div className="w-12 h-12 rounded-full bg-[#F6F8FC] flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col flex-1">
        <b>{title}</b>
        <p>{description}</p>
      </div>
    </div>
  );
});

export { ServicedFrontInfo };
