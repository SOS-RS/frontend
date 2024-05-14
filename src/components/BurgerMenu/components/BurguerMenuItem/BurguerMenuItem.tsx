import React, { Fragment } from 'react';
import * as LucideIcons from 'lucide-react';

import { IBurguerMenuItemProps } from './types';
import { cn } from '@/lib/utils';

const LucideIcon = (props: { iconName?: string }) => {
  const { iconName } = props;
  if (iconName) {
    const Icon = (LucideIcons as any)[iconName];
    return <Icon className="w-4 h-4" />;
  } else return <Fragment />;
};

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
      <LucideIcon iconName={icon} />
      {label}
    </a>
  );
});

export { BurguerMenuItem };
