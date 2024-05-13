import { useContext, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cva } from 'class-variance-authority';

import { IShelterCategoryItemsProps } from './types';
import { cn, getSupplyPriorityProps } from '@/lib/utils';
import { CircleStatus, Chip } from '@/components';
import { Button } from '@/components/ui/button';
import { SupplyPriority } from '@/service/supply/types';
import { SessionContext } from '@/contexts';

const ShelterCategoryItems = (props: IShelterCategoryItemsProps) => {
  const {
    priority = SupplyPriority.NotNeeded,
    tags,
    onSelectTag,
    selectedTags = [],
    supplies,
  } = props;
  const { session } = useContext(SessionContext);
  const [opened, setOpened] = useState<boolean>(false);
  const maxVisibleSupplies: number = 10;
  const visibleSupplies = useMemo(
    () => (opened ? supplies : supplies.slice(0, maxVisibleSupplies)),
    [opened, supplies]
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
          {label} ({supplies.length})
        </h3>
      </div>
      <div className="flex gap-2 flex-wrap">
        {visibleSupplies.map((supply, idx) => {
          const tagProps =
            session &&
            ['DistributionCenter', 'Admin'].includes(session.accessLevel)
              ? {
                  onClick: () => (onSelectTag ? onSelectTag(supply) : undefined),
                  className: variants({
                    className: circleClassName,
                    variant: selectedTags.includes(supply)
                      ? 'selected'
                      : 'default',
                  }),
                }
              : {
                  className: circleClassName,
                };
          return <Chip key={idx} label={supply.name} quantity={supply.quantity} {...tagProps} />;
        })}
      </div>
      {supplies.length > maxVisibleSupplies && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center"
            onClick={() => setOpened((v) => !v)}
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
