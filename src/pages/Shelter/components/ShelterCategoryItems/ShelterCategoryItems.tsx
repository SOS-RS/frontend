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
      <div className="flex gap-2 items-center">
        <CircleStatus className={circleClassName} />
        <h3>
          {label} ({tags.length})
        </h3>
      </div>
      <div className="flex gap-2 flex-wrap">
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
                    className="absolute z-10 right-4 top-0 -translate-y-2 translate-x-full text-xs flex items-center justify-center w-7 h-6"
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
            className="flex gap-2 items-center"
            onClick={() => setOpened((v) => !v)}
            aria-expanded={opened}
          >
            <span className="text-lg font-normal text-blue-500">
              {btnLabel}
            </span>
            <Icon className="h-5 w-5 stroke-blue-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export { ShelterCategoryItems };
