import React, { Fragment } from 'react';

import { Separator } from '@/components/ui/separator';
import { IShelterSupplyCategoryRowProps } from './types';
import { Chip } from '@/components';
import { cn } from '@/lib/utils';

const ShelterSupplyCategoryRow = React.forwardRef<
  HTMLDivElement,
  IShelterSupplyCategoryRowProps
>((props, ref) => {
  const { description, tags, title, className = '', ...rest } = props;

  if (tags.length === 0) return <Fragment />;

  const moreInfoLabel = () => {
    return `+${tags.length - 10} ${tags.length > 11 ? 'itens' : 'item'}`;
  };

  return (
    <div className={cn('flex flex-col gap-3', className)} ref={ref} {...rest}>
      <Separator className="mt-2" />
      <p className="text-muted-foreground text-sm md:text-lg font-medium">
        {title}
      </p>
      {description && <p>{description}</p>}
      <div className="flex gap-2 flex-wrap">
        {tags.slice(0, 10).map((s, idx) => (
          <Chip key={idx} {...s} />
        ))}

        {tags.length > 10 && (
          <Chip label={moreInfoLabel()} variant="moreInfo" />
        )}
      </div>
    </div>
  );
});

export { ShelterSupplyCategoryRow };
