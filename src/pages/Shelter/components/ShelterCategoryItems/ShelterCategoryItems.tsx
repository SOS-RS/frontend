import { useContext, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cva } from 'class-variance-authority';

import { IShelterCategoryItemsProps } from './types';
import { cn, getSupplyPriorityProps } from '@/lib/utils';
import { CircleStatus, Chip } from '@/components';
import { Button } from '@/components/ui/button';
import { SupplyPriority } from '@/service/supply/types';
import { SessionContext } from '@/contexts';
import { Badge } from '@/components/ui/badge';

const ShelterCategoryItems = (props: IShelterCategoryItemsProps) => {
  const {
    priority = SupplyPriority.NotNeeded,
    tags,
    onSelectTag,
    selectedTags = [],
  } = props;
  const { session } = useContext(SessionContext);
  const [opened, setOpened] = useState<boolean>(false);
  const maxVisibleSupplies: number = 10;
  const visibleSupplies = useMemo(
    () => (opened ? tags : tags.slice(0, maxVisibleSupplies)),
    [opened, tags]
  );
  const { className: circleClassName, label } = useMemo(
    () => getSupplyPriorityProps(priority),
    [priority]
  );

  const Icon = opened ? ChevronUp : ChevronDown;
  const btnLabel = opened ? 'Ver menos' : 'Ver todos';

  const variants = cva('cursor-pointer', {
    variants: {
      variant: {
        selected: 'border-4 border-blue-300',
        default: 'border-4 border-gray-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <CircleStatus className={circleClassName} />
        <h3>
          {label} ({tags.length})
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {visibleSupplies.map((tag, idx) => {
          const tagProps =
            session &&
            ['DistributionCenter', 'Admin'].includes(session.accessLevel)
              ? {
                  onClick: () => (onSelectTag ? onSelectTag(tag) : undefined),
                  className: variants({
                    className: circleClassName,
                    variant: selectedTags.includes(tag)
                      ? 'selected'
                      : 'default',
                  }),
                }
              : {
                  className: circleClassName,
                };
          return (
            <div
              key={idx}
              className={cn('flex gap-x-1 relative', { 'mr-3': tag.quantity })}
            >
              <Chip key={idx} label={tag.label} {...tagProps} />
              {tag.quantity !== null &&
                tag.quantity !== undefined &&
                tag.quantity > 0 && (
                  <Badge
                    variant="default"
                    className="absolute right-4 top-0 z-10 flex h-6 w-7 -translate-y-2 translate-x-full items-center justify-center text-xs"
                  >
                    {tag.quantity > 99 ? '99+' : tag.quantity}
                  </Badge>
                )}
            </div>
          );
        })}
      </div>

      {tags.length > maxVisibleSupplies && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setOpened((v) => !v)}
          >
            <span className="text-lg font-normal text-blue-500">
              {btnLabel}
            </span>
            <Icon className="size-5 stroke-blue-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export { ShelterCategoryItems };
