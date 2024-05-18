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
      <p className="text-muted-foreground text-sm md:text-lg font-medium">
        {title}
      </p>
      {description && <p>{description}</p>}
      <div className="flex gap-2 flex-wrap">
        {tags.slice(0, 10).map((s, idx) => (
          <Chip key={idx} {...s} />
        ))}

        {tags.length > 10 && (
          <Chip
            label={`+${tags.length - 10} items`}
            className="bg-gray-300 txt-black-600"
          />
        )}
      </div>
    </div>
  );
});

export { ShelterSupplyCategoryRow };
