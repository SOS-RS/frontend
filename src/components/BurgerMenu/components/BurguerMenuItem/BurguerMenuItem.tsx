import React from 'react';
import { ExternalLink } from 'lucide-react';

import { IBurguerMenuItemProps } from './types';
import { cn } from '@/lib/utils';

const BurguerMenuItem = React.forwardRef<
  HTMLAnchorElement,
  IBurguerMenuItemProps
>((props, ref) => {
  const {
    icon,
    label,
    onClick,
    link,
    className = '',
    openExternal,
    ...rest
  } = props;

  return (
    <a
      ref={ref}
      href={link}
      className={cn(
        'hover:font-semibold flex gap-2 items-center text-zinc-600 [&_svg]:stroke-zinc-500',
        className
      )}
      onClick={onClick}
      {...rest}
      target={openExternal ? '_blank' : undefined}
    >
      {icon}
      {label}
      {openExternal && <ExternalLink className="w-3 h-3" />}
    </a>
  );
});

export { BurguerMenuItem };
