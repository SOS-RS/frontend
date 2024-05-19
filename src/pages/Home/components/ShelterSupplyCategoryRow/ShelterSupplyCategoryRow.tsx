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

  return (
    <div className={cn('flex flex-col gap-3', className)} ref={ref} {...rest}>
      <Separator className="mt-2" />
      <p className="text-sm font-medium text-muted-foreground md:text-lg">
        {title}
      </p>
      {description && <p>{description}</p>}
      <div className="flex flex-wrap gap-2">
        {tags.map((s, idx) => (
          <Chip key={idx} {...s} />
        ))}
      </div>
    </div>
  );
});

export { ShelterSupplyCategoryRow };
