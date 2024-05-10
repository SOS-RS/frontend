import React from 'react';

import { Separator } from '@/components/ui/separator';
import { IShelterSupplyCategoryRowProps } from './types';
import { Chip } from '@/components';
import { cn } from '@/lib/utils';

const ShelterSupplyCategoryRow = React.forwardRef<
  HTMLDivElement,
  IShelterSupplyCategoryRowProps
>((props, ref) => {
  const { description, tags, title, className = '', ...rest } = props;

  return (
    <div className={cn('flex flex-col gap-3', className)} ref={ref} {...rest}>
      <Separator className="mt-2" />
      <p className="text-muted-foreground text-sm md:text-lg font-medium">
        {title}
      </p>
      {description && <p>{description}</p>}
      <div className="flex gap-2 flex-wrap">
        {tags.map((s, idx) => (
          <Chip key={idx} {...s} />
        ))}
      </div>
    </div>
  );
});

export { ShelterSupplyCategoryRow };
