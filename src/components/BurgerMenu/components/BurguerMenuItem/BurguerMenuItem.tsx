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
        'flex items-center gap-2 text-zinc-600 hover:font-semibold [&_svg]:stroke-zinc-500',
        className,
      )}
      onClick={onClick}
      {...rest}
      target={openExternal ? '_blank' : undefined}
    >
      {icon}
      {label}
      {openExternal && <ExternalLink className="h-3 w-3" />}
    </a>
  );
});

export { BurguerMenuItem };
