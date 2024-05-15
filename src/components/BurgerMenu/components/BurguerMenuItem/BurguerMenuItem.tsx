import React from 'react';

import { IBurguerMenuItemProps } from './types';
import { cn } from '@/lib/utils';

const BurguerMenuItem = React.forwardRef<
  HTMLAnchorElement,
  IBurguerMenuItemProps
>((props, ref) => {
  const { icon, label, onClick, link, className = '', ...rest } = props;

  return (
    <a
      ref={ref}
      href={link}
      target="_blank"
      className={cn(
        'hover:font-semibold flex gap-2 items-center text-zinc-600 [&_svg]:stroke-zinc-500',
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {icon}
      {label}
    </a>
  );
});

export { BurguerMenuItem };
