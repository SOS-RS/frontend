import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { IBurguerMenuItemProps } from './types';
import { cn } from '@/lib/utils';

const BurguerMenuItem = React.forwardRef<
  HTMLAnchorElement,
  IBurguerMenuItemProps
>((props, ref) => {
  const { icon, label, link, className = '', ...rest } = props;
  const isInternalLink =
    (link && !link?.includes('http')) || (link && !link?.includes('https'));
  const location = useLocation();

  if (isInternalLink) {
    return (
      <Link
        ref={ref}
        to={link}
        state={{ from: location }}
        className={cn(
          'text-base',
          'text-zinc-500',
          'flex gap-2 items-center',
          'hover: text-zinc-600 [&_svg]:stroke-zinc-500',
          className,
          { 'font-bold': location.pathname === link }
        )}
      >
        {icon}
        {label}
      </Link>
    );
  } else {
    return (
      <a
        ref={ref}
        href={link}
        target="_blank"
        className={cn(
          'text-base',
          'text-zinc-500',
          'flex gap-2 items-center',
          'hover: text-zinc-600 [&_svg]:stroke-zinc-500',
          className
        )}
        {...rest}
      >
        {icon}
        {label}
        <ExternalLink className="w-4 h-4" />
      </a>
    );
  }
});

export { BurguerMenuItem };
