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
      <div className="flex size-12 items-center justify-center rounded-full bg-[#F6F8FC]">
        {icon}
      </div>
      <div className="flex flex-1 flex-col">
        <b>{title}</b>
        <p>{description}</p>
      </div>
    </div>
  );
});

export { ServicedFrontInfo };
