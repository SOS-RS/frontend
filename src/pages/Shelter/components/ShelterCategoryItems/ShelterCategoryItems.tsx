import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { IShelterCategoryItemsProps } from './types';
import { cn, getSupplyPriorityProps } from '@/lib/utils';
import { CircleStatus, Chip } from '@/components';
import { Button } from '@/components/ui/button';
import { SupplyPriority } from '@/service/supply/types';

const ShelterCategoryItems = (props: IShelterCategoryItemsProps) => {
  const { priority = SupplyPriority.NotNeeded, supplies } = props;
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

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <CircleStatus className={circleClassName} />
        <h3>
          {label} ({supplies.length})
        </h3>
      </div>
      <div className="flex gap-2 flex-wrap">
        {visibleSupplies.map((supply, idx) => (
          <div key={idx} className={cn('flex gap-x-1 relative', { 'mr-3': supply.quantity })}>
            <Chip className={cn(circleClassName, { 'pr-5': supply.quantity })} label={supply.name} />
            {supply.quantity && (
              <div className="absolute z-10 right-4 top-0 -translate-y-2 translate-x-full text-xs font-bold bg-gray-700 text-white rounded-full ring-black flex items-center justify-center w-7 h-6">
                {supply.quantity > 99 ? '99+' : supply.quantity}
              </div>
            )}
          </div>
        ))}
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
